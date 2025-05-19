
export interface FileItem {
  id: string;
  filename: string;
  mimetype: string;
  created_at: string;
  downloads?: number;
  size?: number;
}

export interface UploadResponse {
  uid: string;
  download_url: string;
  api_url: string;
  expires_in_days: number;
}
