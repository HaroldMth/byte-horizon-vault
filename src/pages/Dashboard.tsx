
import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import FileCard from '@/components/UI/FileCard';
import { fetchFiles } from '@/services/api';
import { FileItem } from '@/types';
import { LayoutGrid, List, Search, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Dashboard = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadFiles = async () => {
      setIsLoading(true);
      try {
        const filesData = await fetchFiles();
        setFiles(filesData);
        setFilteredFiles(filesData);
      } catch (err) {
        setError('Failed to load files. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadFiles();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFiles(files);
    } else {
      setFilteredFiles(
        files.filter((file) =>
          file.filename.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, files]);

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

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-64">
            <AlertCircle size={48} className="text-byte-red mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-gray-400">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 gradient-text">Dashboard</h1>
            <p className="text-gray-400">
              Browse and manage your uploaded files
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search files..."
                className="pl-10 bg-gray-800 border-gray-700 focus:border-byte-purple text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex border border-gray-700 rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-gray-700' : ''}
              >
                <LayoutGrid size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-gray-700' : ''}
              >
                <List size={18} />
              </Button>
            </div>
          </div>
        </div>

        {filteredFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
              <AlertCircle size={28} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No files found</h2>
            <p className="text-gray-400 mb-6">
              {searchQuery ? 'No files match your search criteria.' : 'You have not uploaded any files yet.'}
            </p>
            {!searchQuery && (
              <Button asChild className="bg-gradient-to-r from-byte-purple to-byte-pink hover:opacity-90">
                <a href="/upload">Upload Your First File</a>
              </Button>
            )}
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredFiles.map((file) => (
                  <FileCard key={file.id} file={file} />
                ))}
              </div>
            ) : (
              <div className="border border-gray-800 rounded-lg overflow-hidden">
                <div className="flex items-center font-medium text-sm text-gray-400 bg-gray-800 bg-opacity-50 p-3">
                  <div className="flex-1">Name</div>
                  <div className="w-32">Type</div>
                  <div className="w-40">Uploaded</div>
                  <div className="w-20 text-right">Downloads</div>
                </div>
                {filteredFiles.map((file) => (
                  <a
                    key={file.id}
                    href={`/file/${file.id}`}
                    className="flex items-center p-3 hover:bg-gray-800 border-t border-gray-800 text-sm"
                  >
                    <div className="flex-1 font-medium text-white truncate">
                      {file.filename}
                    </div>
                    <div className="w-32 text-gray-400">{file.mimetype.split('/')[1]}</div>
                    <div className="w-40 text-gray-400">
                      {new Date(file.created_at).toLocaleDateString()}
                    </div>
                    <div className="w-20 text-right text-gray-400">
                      {file.downloads || 0}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
