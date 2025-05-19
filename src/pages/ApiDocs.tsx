
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, FileJson, Download, Upload, Copy } from "lucide-react";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ApiDocs = () => {
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">API Documentation</h1>
            <p className="text-gray-400 mb-6">
              Integrate BYTE HOSTING file sharing capabilities into your applications with our simple REST API.
            </p>
          </div>

          <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg mb-8">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <FileJson className="mr-2" size={20} />
              Base URL
            </h2>
            <div className="flex items-center gap-2 bg-gray-900 p-3 rounded-md">
              <code className="flex-1 text-sm md:text-base overflow-x-auto">http://localhost:3001</code>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => copyToClipboard("http://localhost:3001", "Base URL copied to clipboard")}
              >
                <Copy size={16} />
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Replace with your production API URL when deploying to production.
            </p>
          </div>

          <Tabs defaultValue="file-upload" className="mb-8">
            <TabsList className="grid grid-cols-3 w-full mb-8">
              <TabsTrigger value="file-upload">Upload File</TabsTrigger>
              <TabsTrigger value="file-details">File Details</TabsTrigger>
              <TabsTrigger value="file-download">Download File</TabsTrigger>
            </TabsList>

            <TabsContent value="file-upload">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-600">POST</Badge>
                      <span>/upload</span>
                    </div>
                    <Upload size={20} />
                  </div>
                  <CardDescription>
                    Upload a file to BYTE HOSTING servers.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <ChevronRight className="mr-2" size={16} />
                      Request Format
                    </h3>
                    <div className="bg-gray-900 p-4 rounded-md">
                      <p className="text-sm mb-2">Content-Type: multipart/form-data</p>
                      <code className="text-sm block text-green-400">
                        FormData with 'file' field containing the file to upload
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <ChevronRight className="mr-2" size={16} />
                      Response Format
                    </h3>
                    <div className="bg-gray-900 p-4 rounded-md">
                      <p className="text-sm mb-2">Content-Type: application/json</p>
                      <div className="relative">
                        <pre className="text-sm overflow-x-auto">
{`{
  "uid": "file-id-string",
  "download_url": "http://localhost:3001/file/file-id-string",
  "api_url": "http://localhost:3001/api/file-id-string",
  "expires_in_days": 10
}`}
                        </pre>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-2 top-2"
                          onClick={() => copyToClipboard(`{
  "uid": "file-id-string",
  "download_url": "http://localhost:3001/file/file-id-string",
  "api_url": "http://localhost:3001/api/file-id-string",
  "expires_in_days": 10
}`, "Response example copied")}
                        >
                          <Copy size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <ChevronRight className="mr-2" size={16} />
                      Code Example
                    </h3>
                    <div className="bg-gray-900 p-4 rounded-md relative">
                      <pre className="text-sm overflow-x-auto">
{`// JavaScript example
const formData = new FormData();
formData.append('file', fileObject);

fetch('http://localhost:3001/upload', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-2 top-2"
                        onClick={() => copyToClipboard(`// JavaScript example
const formData = new FormData();
formData.append('file', fileObject);

fetch('http://localhost:3001/upload', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`, "Code example copied")}
                      >
                        <Copy size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="file-details">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-600">GET</Badge>
                      <span>/api/{"{fileId}"}</span>
                    </div>
                    <FileJson size={20} />
                  </div>
                  <CardDescription>
                    Retrieve file metadata by ID.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <ChevronRight className="mr-2" size={16} />
                      Parameters
                    </h3>
                    <div className="bg-gray-900 p-4 rounded-md">
                      <ul className="list-disc list-inside text-sm">
                        <li><code>fileId</code> - The unique identifier for the file</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <ChevronRight className="mr-2" size={16} />
                      Response Format
                    </h3>
                    <div className="bg-gray-900 p-4 rounded-md relative">
                      <pre className="text-sm overflow-x-auto">
{`{
  "id": "file-id-string",
  "filename": "example.pdf",
  "mimetype": "application/pdf",
  "created_at": "2025-05-19T12:34:56Z",
  "downloads": 5,
  "size": 1024000
}`}
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-2 top-2"
                        onClick={() => copyToClipboard(`{
  "id": "file-id-string",
  "filename": "example.pdf",
  "mimetype": "application/pdf",
  "created_at": "2025-05-19T12:34:56Z",
  "downloads": 5,
  "size": 1024000
}`, "Response example copied")}
                      >
                        <Copy size={16} />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <ChevronRight className="mr-2" size={16} />
                      Code Example
                    </h3>
                    <div className="bg-gray-900 p-4 rounded-md relative">
                      <pre className="text-sm overflow-x-auto">
{`// JavaScript example
fetch('http://localhost:3001/api/file-id-string')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-2 top-2"
                        onClick={() => copyToClipboard(`// JavaScript example
fetch('http://localhost:3001/api/file-id-string')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`, "Code example copied")}
                      >
                        <Copy size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="file-download">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-violet-600">GET</Badge>
                      <span>/file/{"{fileId}"}</span>
                    </div>
                    <Download size={20} />
                  </div>
                  <CardDescription>
                    Download a file by its ID.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <ChevronRight className="mr-2" size={16} />
                      Parameters
                    </h3>
                    <div className="bg-gray-900 p-4 rounded-md">
                      <ul className="list-disc list-inside text-sm">
                        <li><code>fileId</code> - The unique identifier for the file</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <ChevronRight className="mr-2" size={16} />
                      Response Format
                    </h3>
                    <div className="bg-gray-900 p-4 rounded-md">
                      <p className="text-sm">Returns the file content with the appropriate Content-Type header for the file type.</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <ChevronRight className="mr-2" size={16} />
                      Code Example
                    </h3>
                    <div className="bg-gray-900 p-4 rounded-md relative">
                      <pre className="text-sm overflow-x-auto">
{`// JavaScript example - Download file in browser
function downloadFile(fileId) {
  // Create a link and trigger download
  const link = document.createElement('a');
  link.href = \`http://localhost:3001/file/\${fileId}\`;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}`}
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-2 top-2"
                        onClick={() => copyToClipboard(`// JavaScript example - Download file in browser
function downloadFile(fileId) {
  // Create a link and trigger download
  const link = document.createElement('a');
  link.href = \`http://localhost:3001/file/\${fileId}\`;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}`, "Code example copied")}
                      >
                        <Copy size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Implementation Notes</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="bg-byte-purple text-white rounded-full w-5 h-5 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">1</span>
                <span>Files are stored securely and automatically deleted after 10 days.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-byte-purple text-white rounded-full w-5 h-5 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">2</span>
                <span>Maximum upload size is 100MB per file.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-byte-purple text-white rounded-full w-5 h-5 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">3</span>
                <span>API endpoints use standard HTTP status codes for success/error responses.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-byte-purple text-white rounded-full w-5 h-5 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">4</span>
                <span>For high-volume usage, please contact us for API rate limit increases.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ApiDocs;
