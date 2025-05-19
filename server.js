// server.js
import express from 'express';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';
import stream from 'stream';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ── Upload Endpoint ────────────────────────────────────────────────────────────
// POST /api/upload?bucket=<bucket>&path=<remote/path.ext>
// Form-field: file
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const bucket = req.query.bucket;
    const path   = req.query.path;
    if (!bucket || !path || !req.file) {
      return res.status(400).json({ error: 'bucket, path query + file required' });
    }

    const { data, error } = await supabase
      .storage
      .from(bucket)
      .upload(path, req.file.buffer, { upsert: false });

    if (error) throw error;
    return res.json({ path: data.Key, url: data.Location });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

// ── Download Endpoint ──────────────────────────────────────────────────────────
// GET /api/download/:bucket/*    (e.g. /api/download/my-bucket/folder/file.txt)
app.get('/api/download/:bucket/*', async (req, res) => {
  try {
    const bucket = req.params.bucket;
    const filePath = req.params[0];    // wildcard match after bucket
    if (!filePath) {
      return res.status(400).json({ error: 'file path missing' });
    }

    const { data, error } = await supabase
      .storage
      .from(bucket)
      .download(filePath);

    if (error) throw error;

    // stream it back to client
    res.setHeader('Content-Disposition', `attachment; filename="${filePath.split('/').pop()}"`);
    const readStream = new stream.PassThrough();
    readStream.end(Buffer.from(await data.arrayBuffer()));
    readStream.pipe(res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Listening on http://localhost:${port}`));
