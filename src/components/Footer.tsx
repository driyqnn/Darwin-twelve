
import React from 'react';
import { Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 mt-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              Designed and developed by{" "}
              <a 
                href="https://facebook.com/driyqnn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center"
              >
                @driyqnn <Facebook className="h-3 w-3 ml-1" />
              </a>
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">© {currentYear} Darwin Twelve Graduates</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
