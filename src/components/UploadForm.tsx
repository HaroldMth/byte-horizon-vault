// src/components/UploadForm.tsx
import React, { useState } from 'react';
import { uploadFile, getPublicUrl } from '../supabase/supabaseClient';

export default function UploadForm() {
  const [file, setFile] = useState<File|null>(null);
  const [url, setUrl]   = useState<string|null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Select a file first.');
    try {
      const { path } = await uploadFile('my-bucket', file.name, file);
      const { publicUrl } = getPublicUrl('my-bucket', path);
      setUrl(publicUrl);
    } catch (err) {
      console.error(err);
      alert('Upload failed.');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="file" onChange={e => setFile(e.target.files?.[0] ?? null)} />
      <button type="submit" className="btn">Upload</button>
      {url && (
        <div>
          File URL: <a href={url} target="_blank">{url}</a>
        </div>
      )}
    </form>
  );
}
