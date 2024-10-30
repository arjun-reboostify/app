import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            🏠 Home
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            📚 About
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            📞 Contact
          </a>
        </div>
        <div className="mb-4">
          <span>Follow us: </span>
          <a href="#" className="text-gray-400 hover:text-white transition-colors mx-2">
            🐦 Twitter
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors mx-2">
            📘 Facebook
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors mx-2">
            📸 Instagram
          </a>
        </div>
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} ReBoostify. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
