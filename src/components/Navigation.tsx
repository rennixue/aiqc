import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-soft' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent"
            >
              AI QC
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('ai-qc')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              AI QC
            </button>
            <button
              onClick={() => scrollToSection('introduction')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              服务介绍
            </button>
            <Button 
              size="sm"
              onClick={() => scrollToSection('ai-qc')}
              className="bg-gradient-primary hover:shadow-soft transition-all duration-300"
            >
              开始检测
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('ai-qc')}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors w-full text-left"
              >
                AI QC
              </button>
              <button
                onClick={() => scrollToSection('introduction')}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors w-full text-left"
              >
                服务介绍
              </button>
              <div className="px-3 pt-2">
                <Button 
                  size="sm"
                  onClick={() => scrollToSection('ai-qc')}
                  className="w-full bg-gradient-primary"
                >
                  开始检测
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};