import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/UI/FeatureCard';
import { Upload, Clock, Lock, Zap, FileCode } from 'lucide-react';

const Home = () => {
  return (
    <MainLayout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-text">BYTE HOSTING</span>
                <br />
                <span className="text-white">File sharing reimagined</span>
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-lg">
                Upload, share, and manage your files with our lightning-fast, secure hosting platform. Files are kept for 10 days with no sign-up required.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-gradient-to-r from-byte-purple to-byte-pink hover:opacity-90 text-white px-8 py-6">
                  <Link to="/upload">Start Uploading</Link>
                </Button>
                <Button asChild variant="outline" className="border-byte-purple text-white px-8 py-6">
                  <Link to="/dashboard">Browse Files</Link>
                </Button>
                <Button asChild variant="secondary" className="px-8 py-6">
                  <Link to="/api-docs">
                    <FileCode className="mr-2" />
                    API Documentation
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="w-full h-72 md:h-96 bg-gradient-to-br from-byte-purple/30 to-byte-pink/30 rounded-lg relative overflow-hidden backdrop-blur-sm border border-gray-800">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek00NCAyOGgtNHYyaDR2LTJ6TTM4IDMyaC0ydjJoMnYtMnptMC00aC0ydjJoMnYtMnptLTQtOGgtMnY0aDJ2LTR6bTAgMTJoLTJ2NGgydi00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-byte-purple to-byte-pink flex items-center justify-center mb-6 animate-float">
                    <Upload size={48} className="text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-2">Simple File Uploading</h3>
                    <p className="text-gray-300">Drag, drop, and share</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-byte-red rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-byte-blue rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-900 bg-opacity-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="gradient-text">Features</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our platform offers everything you need for seamless file sharing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Upload size={24} className="text-white" />}
              title="Easy Upload"
              description="Drag and drop any file type with our intuitive interface"
            />
            <FeatureCard
              icon={<Clock size={24} className="text-white" />}
              title="10-Day Storage"
              description="Your files are securely stored for 10 days"
            />
            <FeatureCard
              icon={<Lock size={24} className="text-white" />}
              title="Secure Sharing"
              description="Unique links for each upload to share with anyone"
            />
            <FeatureCard
              icon={<Zap size={24} className="text-white" />}
              title="Fast Downloads"
              description="Lightning-fast download speeds for all your files"
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-gray-300 mb-8">
              No registration required. Just upload and start sharing your files instantly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-gradient-to-r from-byte-purple to-byte-pink hover:opacity-90 text-white px-8 py-6">
                <Link to="/upload">Upload Your First File</Link>
              </Button>
              <Button asChild variant="outline" className="border-byte-purple text-white px-8 py-6">
                <Link to="/api-docs">View API Docs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
