
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { FileItem } from '@/types';
import { Download, FileText, Image, File, Video } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface FileCardProps {
  file: FileItem;
}

const FileCard: React.FC<FileCardProps> = ({ file }) => {
  const getIcon = () => {
    if (file.mimetype.startsWith('image/')) {
      return <Image size={24} className="text-byte-pink" />;
    } else if (file.mimetype.startsWith('video/')) {
      return <Video size={24} className="text-byte-blue" />;
    } else if (file.mimetype.startsWith('text/') || file.mimetype.includes('pdf')) {
      return <FileText size={24} className="text-byte-purple" />;
    } else {
      return <File size={24} className="text-gray-400" />;
    }
  };

  return (
    <Link to={`/file/${file.id}`}>
      <Card className="border border-gray-800 bg-opacity-20 backdrop-blur-sm bg-gray-900 hover:border-byte-purple transition-all duration-200 h-full">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            {getIcon()}
            <div className="truncate">
              <p className="font-medium text-white truncate" title={file.filename}>
                {file.filename}
              </p>
              <p className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(file.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-800 p-3 flex justify-between">
          <span className="text-xs text-gray-400">{file.mimetype}</span>
          <div className="flex items-center gap-1">
            <Download size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400">{file.downloads || 0}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default FileCard;
