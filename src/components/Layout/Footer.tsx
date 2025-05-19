
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-6 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} BYTE HOSTING. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-byte-purple transition-colors">Terms</a>
            <a href="#" className="text-sm text-gray-400 hover:text-byte-purple transition-colors">Privacy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-byte-purple transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
