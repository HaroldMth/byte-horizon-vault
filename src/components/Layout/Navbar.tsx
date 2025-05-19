
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Upload, LayoutDashboard, FileCode } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-opacity-80 backdrop-blur-lg border-b border-b-gray-800">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-byte-purple to-byte-pink flex items-center justify-center">
            <span className="font-bold text-white">B</span>
          </div>
          <Link to="/" className="text-xl font-bold gradient-text">BYTE HOSTING</Link>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link to="/upload" className="text-gray-300 hover:text-white transition-colors">Upload</Link>
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
          <Link to="/api-docs" className="text-gray-300 hover:text-white transition-colors">API Docs</Link>
        </div>
        
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="border-byte-purple text-white">
            <Link to="/upload">Upload File</Link>
          </Button>
        </div>
        
        <div className="md:hidden flex items-center">
          <div className="flex gap-5">
            <Link to="/" className="text-gray-300 hover:text-white">
              <Home size={20} />
            </Link>
            <Link to="/upload" className="text-gray-300 hover:text-white">
              <Upload size={20} />
            </Link>
            <Link to="/dashboard" className="text-gray-300 hover:text-white">
              <LayoutDashboard size={20} />
            </Link>
            <Link to="/api-docs" className="text-gray-300 hover:text-white">
              <FileCode size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
