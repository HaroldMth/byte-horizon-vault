
import React, { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Upload, File, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { uploadFile } from '@/services/api';
import { UploadResponse } from '@/types';

interface DragDropUploadProps {
  onUploadSuccess?: (response: UploadResponse) => void;
}

const DragDropUpload: React.FC<DragDropUploadProps> = ({ onUploadSuccess }) => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  }, []);

  const handleClearFile = useCallback(() => {
    setSelectedFile(null);
    setUploadProgress(0);
  }, []);

  const handleUpload = useCallback(async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);

    try {
      const response = await uploadFile(selectedFile);
      
      clearInterval(interval);
      setUploadProgress(100);
      
      if (response) {
        toast({
          title: "File uploaded successfully!",
          description: `Your file is now available at ${response.download_url}`,
        });
        
        if (onUploadSuccess) {
          onUploadSuccess(response);
        }
      } else {
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: "There was a problem uploading your file.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was a problem uploading your file.",
      });
    } finally {
      clearInterval(interval);
      setIsUploading(false);
    }
  }, [selectedFile, toast, onUploadSuccess]);

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-10 transition-all ${
            isDragging ? 'border-byte-purple bg-byte-purple bg-opacity-5' : 'border-gray-700'
          }`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
              <Upload size={28} className="text-byte-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              Drag & drop your file here
            </h3>
            <p className="text-gray-400 mb-6">
              or click to browse from your computer
            </p>
            <label>
              <Button variant="outline" className="border-byte-purple">
                Browse Files
              </Button>
              <input
                type="file"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
              <File size={20} className="text-byte-purple" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium truncate">{selectedFile.name}</p>
              <p className="text-xs text-gray-400">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type || "Unknown type"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearFile}
              disabled={isUploading}
            >
              <X size={18} />
            </Button>
          </div>
          
          {isUploading && (
            <div className="mb-4">
              <Progress value={uploadProgress} className="h-1 bg-gray-700" />
              <p className="text-xs text-gray-400 mt-1">
                {uploadProgress === 100 ? (
                  <span className="text-green-400 flex items-center gap-1">
                    <Check size={14} /> Upload complete
                  </span>
                ) : (
                  `Uploading ${uploadProgress}%`
                )}
              </p>
            </div>
          )}
          
          <div className="flex justify-end">
            <Button
              onClick={handleUpload}
              disabled={isUploading}
              className="bg-gradient-to-r from-byte-purple to-byte-pink hover:opacity-90"
            >
              {isUploading ? "Uploading..." : "Upload File"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DragDropUpload;
