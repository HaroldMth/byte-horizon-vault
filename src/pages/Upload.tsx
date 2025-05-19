
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import DragDropUpload from '@/components/UI/DragDropUpload';
import { Card, CardContent } from '@/components/ui/card';
import { UploadResponse } from '@/types';
import { Link } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Upload = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<UploadResponse | null>(null);

  const handleUploadSuccess = (response: UploadResponse) => {
    setUploadedFile(response);
  };

  const handleViewFile = () => {
    if (uploadedFile) {
      navigate(`/file/${uploadedFile.uid}`);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 gradient-text">Upload Files</h1>
        <p className="text-gray-400 mb-8">
          Upload your files quickly and securely. Files are stored for 10 days.
        </p>

        {!uploadedFile ? (
          <div className="max-w-3xl mx-auto">
            <DragDropUpload onUploadSuccess={handleUploadSuccess} />
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4 text-white">Upload Guidelines</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-400">
                <li>Maximum file size: 100MB</li>
                <li>All file types are supported</li>
                <li>Files are automatically deleted after 10 days</li>
                <li>Do not upload illegal or copyrighted content</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <Card className="border border-green-500/30 bg-green-500/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <Link size={28} className="text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-white">Upload Successful!</h2>
                  <p className="text-gray-300 mb-6">
                    Your file has been uploaded and is ready to be shared. It will be available for 10 days.
                  </p>
                  
                  <div className="w-full mb-6">
                    <div className="p-3 rounded bg-gray-800 flex items-center justify-between mb-2">
                      <input 
                        type="text" 
                        readOnly 
                        value={`http://localhost:3001/file/${uploadedFile.uid}`}
                        className="bg-transparent text-gray-300 text-sm w-full outline-none"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `http://localhost:3001/file/${uploadedFile.uid}`
                          );
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button onClick={handleViewFile} className="bg-gradient-to-r from-byte-purple to-byte-pink hover:opacity-90">
                      View File
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-byte-purple"
                      onClick={() => setUploadedFile(null)}
                    >
                      Upload Another File
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Upload;
