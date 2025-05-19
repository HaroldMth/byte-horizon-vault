
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { fetchFileDetails, getFileDownloadUrl } from '@/services/api';
import { FileItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Download, Clock, Calendar, File, Copy, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const FileDetails = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const [file, setFile] = useState<FileItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadFileDetails = async () => {
      if (!fileId) return;
      
      setIsLoading(true);
      try {
        const fileData = await fetchFileDetails(fileId);
        setFile(fileData);
      } catch (err) {
        setError('Failed to load file details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadFileDetails();
  }, [fileId]);

  const handleCopyLink = () => {
    if (!file) return;
    
    const url = `${window.location.origin}/file/${file.id}`;
    navigator.clipboard.writeText(url);
    
    setCopied(true);
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this link with others",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateExpirationDate = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const expirationDate = new Date(createdDate);
    expirationDate.setDate(expirationDate.getDate() + 10);
    return expirationDate;
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-t-4 border-byte-purple rounded-full animate-spin"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !file) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-64">
            <AlertCircle size={48} className="text-byte-red mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">File not found</h2>
            <p className="text-gray-400 mb-6">
              The file you are looking for may have been deleted or doesn't exist.
            </p>
            <Button asChild className="bg-gradient-to-r from-byte-purple to-byte-pink hover:opacity-90">
              <a href="/">Return to Home</a>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const expirationDate = calculateExpirationDate(file.created_at);
  const isExpired = new Date() > expirationDate;
  const downloadUrl = getFileDownloadUrl(file.id);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 gradient-text">File Details</h1>
          <p className="text-gray-400 mb-8">View and download your file</p>

          <Card className="border border-gray-800 bg-opacity-20 backdrop-blur-sm bg-gray-900 overflow-hidden">
            <div className="bg-gray-800 bg-opacity-50 p-6 flex items-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-byte-purple to-byte-pink flex items-center justify-center">
                <File size={28} className="text-white" />
              </div>
              <div className="ml-4 flex-1 truncate">
                <h2 className="text-xl font-bold text-white truncate" title={file.filename}>
                  {file.filename}
                </h2>
                <p className="text-gray-400 text-sm">
                  {file.mimetype} • {(file.size || 0) / 1024 / 1024 > 0.01 
                    ? `${((file.size || 0) / 1024 / 1024).toFixed(2)} MB` 
                    : `${((file.size || 0) / 1024).toFixed(0)} KB`}
                </p>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="mb-8">
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-400">
                      Uploaded {formatDistanceToNow(new Date(file.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-400">
                      {isExpired 
                        ? <span className="text-byte-red">Expired</span>
                        : `Expires ${formatDistanceToNow(expirationDate, { addSuffix: true })}`}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Download size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-400">
                      {file.downloads || 0} downloads
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="p-3 rounded bg-gray-800 flex items-center justify-between">
                  <input 
                    type="text" 
                    readOnly 
                    value={`${window.location.origin}/file/${file.id}`}
                    className="bg-transparent text-gray-300 text-sm w-full outline-none"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleCopyLink}
                    className="flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <CheckCircle size={16} className="text-green-400" />
                        <span className="text-green-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  asChild
                  disabled={isExpired}
                  className={`bg-gradient-to-r from-byte-purple to-byte-pink hover:opacity-90 px-8 ${isExpired ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <a href={downloadUrl} download={file.filename}>
                    <Download size={16} className="mr-2" />
                    Download File
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default FileDetails;
