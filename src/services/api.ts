
import { FileItem, UploadResponse } from '@/types';

const API_URL = 'http://localhost:3001'; // Replace with your actual API URL

export const fetchFiles = async (): Promise<FileItem[]> => {
  try {
    const response = await fetch(`${API_URL}/dashboard-data`);
    if (!response.ok) throw new Error('Failed to fetch files');
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching files:', error);
    return [];
  }
};

export const fetchFileDetails = async (fileId: string): Promise<FileItem | null> => {
  try {
    const response = await fetch(`${API_URL}/api/${fileId}`);
    if (!response.ok) throw new Error('Failed to fetch file details');
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching file details:', error);
    return null;
  }
};

export const uploadFile = async (file: File): Promise<UploadResponse | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) throw new Error('Failed to upload file');
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

export const getFileDownloadUrl = (fileId: string): string => {
  return `${API_URL}/file/${fileId}`;
};
