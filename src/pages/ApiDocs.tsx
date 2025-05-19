
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Copy, FileText, Server } from 'lucide-react';
import { addTextFile, testApiCall } from '@/services/api';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const ApiDocs = () => {
  const [testResponse, setTestResponse] = useState<{ message: string, timestamp: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [textTitle, setTextTitle] = useState('');
  const [textContent, setTextContent] = useState('');
  const [isAddingText, setIsAddingText] = useState(false);
  const { toast } = useToast();

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The code snippet has been copied to your clipboard."
    });
  };

  const handleTestApi = async () => {
    setIsLoading(true);
    try {
      const response = await testApiCall();
      setTestResponse(response);
    } catch (error) {
      console.error('Error testing API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTextFile = async () => {
    if (!textTitle.trim() || !textContent.trim()) {
      toast({
        title: "Validation Error",
        description: "Both title and content are required.",
        variant: "destructive"
      });
      return;
    }

    setIsAddingText(true);
    try {
      const response = await addTextFile(textTitle, textContent);
      
      if (response) {
        toast({
          title: "Text file added",
          description: `File ${textTitle}.txt has been successfully added with ID: ${response.id}`
        });
        setTextTitle('');
        setTextContent('');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add text file. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAddingText(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">API Documentation</h1>
          
          <p className="text-gray-300 mb-8">
            Integrate with our file hosting service using our simple REST API. All API endpoints return JSON responses.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <Card className="bg-gray-800 border-gray-700 col-span-1 md:col-span-3">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-900 text-green-300 border-green-500">GET</Badge>
                  <CardTitle>/api/files</CardTitle>
                </div>
                <CardDescription>
                  Returns a list of all files.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="curl">
                  <TabsList className="bg-gray-900">
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                  </TabsList>
                  <div className="mt-4 relative">
                    <TabsContent value="curl" className="rounded-md bg-gray-900 p-4">
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        {`curl -X GET "https://api.bytehosting.com/api/files" \\
  -H "Content-Type: application/json"`}
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute top-2 right-2"
                        onClick={() => handleCopyToClipboard(`curl -X GET "https://api.bytehosting.com/api/files" -H "Content-Type: application/json"`)}
                      >
                        <Copy size={14} />
                      </Button>
                    </TabsContent>
                    <TabsContent value="javascript" className="rounded-md bg-gray-900 p-4">
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        {`fetch('https://api.bytehosting.com/api/files', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute top-2 right-2"
                        onClick={() => handleCopyToClipboard(`fetch('https://api.bytehosting.com/api/files', {\n  method: 'GET',\n  headers: {\n    'Content-Type': 'application/json'\n  }\n})\n.then(response => response.json())\n.then(data => console.log(data))\n.catch(error => console.error('Error:', error));`)}
                      >
                        <Copy size={14} />
                      </Button>
                    </TabsContent>
                    <TabsContent value="python" className="rounded-md bg-gray-900 p-4">
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        {`import requests

response = requests.get(
    'https://api.bytehosting.com/api/files',
    headers={'Content-Type': 'application/json'}
)
data = response.json()
print(data)`}
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute top-2 right-2"
                        onClick={() => handleCopyToClipboard(`import requests\n\nresponse = requests.get(\n    'https://api.bytehosting.com/api/files',\n    headers={'Content-Type': 'application/json'}\n)\ndata = response.json()\nprint(data)`)}
                      >
                        <Copy size={14} />
                      </Button>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <h4 className="font-semibold mb-2">Response Format</h4>
                <div className="rounded-md bg-gray-900 p-4 w-full relative">
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    {`[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "filename": "example.pdf",
    "mimetype": "application/pdf",
    "size": 1234567,
    "downloads": 42,
    "created_at": "2024-05-18T12:34:56Z"
  },
  ...
]`}
                  </pre>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute top-2 right-2"
                    onClick={() => handleCopyToClipboard(`[\n  {\n    "id": "550e8400-e29b-41d4-a716-446655440000",\n    "filename": "example.pdf",\n    "mimetype": "application/pdf",\n    "size": 1234567,\n    "downloads": 42,\n    "created_at": "2024-05-18T12:34:56Z"\n  },\n  ...\n]`)}
                  >
                    <Copy size={14} />
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">API Endpoints</CardTitle>
              </CardHeader>
              <CardContent className="px-2">
                <ul className="space-y-1">
                  <li>
                    <Button variant="ghost" className="w-full justify-start text-sm h-auto py-2">
                      <Badge variant="outline" className="mr-2 bg-green-900 text-green-300 border-green-500">GET</Badge>
                      <span>/api/files</span>
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start text-sm h-auto py-2">
                      <Badge variant="outline" className="mr-2 bg-green-900 text-green-300 border-green-500">GET</Badge>
                      <span>/api/files/:id</span>
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start text-sm h-auto py-2">
                      <Badge variant="outline" className="mr-2 bg-violet-900 text-violet-300 border-violet-500">POST</Badge>
                      <span>/api/upload</span>
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start text-sm h-auto py-2">
                      <Badge variant="outline" className="mr-2 bg-green-900 text-green-300 border-green-500">GET</Badge>
                      <span>/api/test</span>
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Test API Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Test API</h2>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-900 text-green-300 border-green-500">GET</Badge>
                  <CardTitle>/api/test</CardTitle>
                </div>
                <CardDescription>
                  Test the API with a simple request.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleTestApi} 
                  className="bg-byte-purple hover:bg-byte-purple/80"
                  disabled={isLoading}
                >
                  <Server className="mr-2" />
                  {isLoading ? "Testing..." : "Test API"}
                </Button>
                
                {testResponse && (
                  <div className="mt-4 rounded-md bg-gray-900 p-4 relative">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      {JSON.stringify(testResponse, null, 2)}
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute top-2 right-2"
                      onClick={() => handleCopyToClipboard(JSON.stringify(testResponse, null, 2))}
                    >
                      <Copy size={14} />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Add Text File Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Add Text File</h2>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-violet-900 text-violet-300 border-violet-500">POST</Badge>
                  <CardTitle>/api/text</CardTitle>
                </div>
                <CardDescription>
                  Add a new text file to the database.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="textTitle" className="block text-sm font-medium text-gray-300 mb-1">
                      Title
                    </label>
                    <Input
                      id="textTitle"
                      value={textTitle}
                      onChange={(e) => setTextTitle(e.target.value)}
                      placeholder="Enter file title"
                      className="bg-gray-900 border-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="textContent" className="block text-sm font-medium text-gray-300 mb-1">
                      Content
                    </label>
                    <Textarea
                      id="textContent"
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      placeholder="Enter file content"
                      rows={6}
                      className="bg-gray-900 border-gray-700"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleAddTextFile} 
                    className="bg-byte-pink hover:bg-byte-pink/80"
                    disabled={isAddingText || !textTitle.trim() || !textContent.trim()}
                  >
                    <FileText className="mr-2" />
                    {isAddingText ? "Adding..." : "Add Text File"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert className="mt-12 bg-gray-800 border-gray-700">
            <FileText className="h-4 w-4" />
            <AlertTitle>Base URL</AlertTitle>
            <AlertDescription>
              All API requests should be made to: <code className="bg-gray-900 px-2 py-1 rounded">https://api.bytehosting.com</code>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </MainLayout>
  );
};

export default ApiDocs;
