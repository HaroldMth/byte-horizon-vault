// src/supabase/supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL     = import.meta.env.VITE_SUPABASE_URL!;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase: SupabaseClient =
  createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Uploads a File or Blob to a given bucket & path.
 */
export async function uploadFile(
  bucket: string,
  path: string,
  file: File | Blob
) {
  const { data, error } = await supabase
    .storage
    .from(bucket)
    .upload(path, file, { cacheControl: '3600', upsert: false });

  if (error) throw error;
  return data;
}

/**
 * Gets a public URL for a stored file.
 */
export function getPublicUrl(bucket: string, path: string) {
  return supabase
    .storage
    .from(bucket)
    .getPublicUrl(path).data;
}
