import React from 'react';
import { Video, Github } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg mr-4">
          <Video className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            TeraBox Video Viewer
          </h1>
          <p className="text-gray-600 mt-2">Watch TeraBox videos online instantly</p>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4 text-sm text-gray-500">
        <span className="flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Free & Open Source
        </span>
        <span className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          No Registration Required
        </span>
        <span className="flex items-center">
          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
          Mobile Friendly
        </span>
      </div>
    </header>
  );
};

export default Header;