import { FileItem, UploadResponse } from '@/types';
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

// We'll keep a local API URL for development
const API_URL = 'http://localhost:3001'; 

export const fetchFiles = async (): Promise<FileItem[]> => {
  try {
    // Fetch files from Supabase
    const { data, error } = await supabase
      .from('files_meta')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching files:', error);
    return [];
  }
};

export const fetchFileDetails = async (fileId: string): Promise<FileItem | null> => {
  try {
    // Fetch file details from Supabase
    const { data, error } = await supabase
      .from('files_meta')
      .select('*')
      .eq('id', fileId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching file details:', error);
    return null;
  }
};

export const uploadFile = async (file: File): Promise<UploadResponse | null> => {
  try {
    const fileId = uuidv4();
    
    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('files')
      .upload(`${fileId}/${file.name}`, file);
      
    if (uploadError) throw uploadError;
    
    // Create metadata entry in the database
    const { error: metaError } = await supabase
      .from('files_meta')
      .insert({
        id: fileId,
        filename: file.name,
        mimetype: file.type,
        size: file.size,
        downloads: 0
      });
      
    if (metaError) throw metaError;
    
    // Generate the response
    return {
      uid: fileId,
      download_url: getFileDownloadUrl(fileId),
      api_url: `${API_URL}/api/${fileId}`,
      expires_in_days: 10
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

export const getFileDownloadUrl = (fileId: string): string => {
  return `${API_URL}/file/${fileId}`;
};

// Increment download count for a file
export const incrementDownloadCount = async (fileId: string): Promise<void> => {
  try {
    // Get current downloads count
    const { data } = await supabase
      .from('files_meta')
      .select('downloads')
      .eq('id', fileId)
      .single();
    
    // Increment download count
    if (data) {
      const currentDownloads = data.downloads || 0;
      await supabase
        .from('files_meta')
        .update({ downloads: currentDownloads + 1 })
        .eq('id', fileId);
    }
  } catch (error) {
    console.error('Error incrementing download count:', error);
  }
};
