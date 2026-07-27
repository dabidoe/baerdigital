import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import smallLogo from '../assets/Baer Digital Studios smalllogo.png';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleStartProject = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false); // Close mobile menu if open
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050607]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden md:flex justify-between items-center h-16">
          {/* Left: Logo */}
          <a href="#home" className="flex-shrink-0 max-h-12 flex items-center">
            <img
              src={smallLogo}
              alt="Baer Digital Studios"
              className="max-h-12 w-auto"
            />
          </a>

          {/* Right: Navigation Links + CTA */}
          <div className="flex items-baseline space-x-8">
            <a href="#home" className="text-white hover:text-[#00d4ff] transition-colors duration-300">
              Home
            </a>
            <a href="#portfolio" className="text-white hover:text-[#00d4ff] transition-colors duration-300">
              Portfolio
            </a>
            <a href="#services" className="text-white hover:text-[#00d4ff] transition-colors duration-300">
              Services
            </a>
            <a href="#contact" className="text-white hover:text-[#00d4ff] transition-colors duration-300">
              Contact
            </a>
            <Button
              onClick={handleStartProject}
              className="bg-[#00d4ff] hover:bg-[#9beeff] text-[#050607]"
              size="sm"
            >
              Start Project
            </Button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex justify-between items-center h-16">
          <a href="#home" className="flex-shrink-0 max-h-12 flex items-center">
            <img
              src={smallLogo}
              alt="Baer Digital Studios"
              className="max-h-12 w-auto"
            />
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-[#00d4ff] transition-colors duration-300"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="mobile-navigation" className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[#050607] border-t border-white/10">
              <a 
                href="#home" 
                className="block px-3 py-2 text-white hover:text-[#00d4ff] transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
              <a
                href="#portfolio"
                className="block px-3 py-2 text-white hover:text-[#00d4ff] transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Portfolio
              </a>
              <a 
                href="#services" 
                className="block px-3 py-2 text-white hover:text-[#00d4ff] transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Services
              </a>
              <a 
                href="#contact" 
                className="block px-3 py-2 text-white hover:text-[#00d4ff] transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
              <div className="px-3 py-2 border-t border-white/10 mt-4">
                <Button 
                  onClick={handleStartProject}
                  className="w-full bg-[#00d4ff] hover:bg-[#9beeff] text-[#050607]"
                  size="sm"
                >
                  Start Project
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

    </nav>
  );
}
