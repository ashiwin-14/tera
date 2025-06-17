import React from 'react';
import { Heart, Code, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 pt-8 border-t border-gray-200">
      <div className="text-center text-gray-600">
        <div className="flex items-center justify-center mb-4 text-sm">
          <span className="flex items-center">
            Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> for the community
          </span>
        </div>
        
        <div className="flex justify-center space-x-6 text-sm">
          <span className="flex items-center">
            <Code className="w-4 h-4 mr-1" />
            Open Source
          </span>
          <span>•</span>
          <span>Privacy Focused</span>
          <span>•</span>
          <span>No Data Collection</span>
        </div>
        
        <p className="text-xs text-gray-500 mt-4">
          This tool helps you view TeraBox videos online. Videos remain hosted on TeraBox servers.
        </p>
      </div>
    </footer>
  );
};

export default Footer;