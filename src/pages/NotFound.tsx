
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-byte-darkblue p-4">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-byte-purple to-byte-pink flex items-center justify-center mb-6 animate-float">
        <span className="text-4xl font-bold text-white">404</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Page Not Found</h1>
      <p className="text-xl text-gray-300 mb-8 text-center max-w-md">
        We couldn't find the page you were looking for.
      </p>
      <Button asChild className="bg-gradient-to-r from-byte-purple to-byte-pink hover:opacity-90 px-8 py-6">
        <a href="/">Return to Home</a>
      </Button>
    </div>
  );
};

export default NotFound;
