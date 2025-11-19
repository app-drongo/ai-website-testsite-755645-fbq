'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

interface NavigationItem {
  label: string;
  href: string;
  section?: string;
}

const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '/', section: 'hero' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Quote', href: '/quote' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navigate = useSmartNavigation();

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest('[data-navigation]')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Track active section on scroll (only for home page)
  useEffect(() => {
    const handleScroll = () => {
      if (window.location.pathname !== '/') return;

      const sections = navigationItems.filter(item => item.section).map(item => item.section!);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: NavigationItem) => {
    setIsOpen(false);
    if (item.section && window.location.pathname === '/') {
      navigate(`#${item.section}`);
    } else {
      navigate(item.href);
    }
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActiveItem = (item: NavigationItem) => {
    if (item.section && window.location.pathname === '/') {
      return activeSection === item.section;
    }
    return window.location.pathname === item.href;
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      data-navigation
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Button
              variant="ghost"
              className="text-xl font-bold text-primary hover:text-primary/80 p-0 h-auto"
              onClick={() => navigate('/')}
            >
              <span data-editable="brandName">TechSaaS</span>
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item, index) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActiveItem(item)
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground hover:bg-accent/50 hover:text-accent-foreground'
                  }`}
                  onClick={() => handleNavClick(item)}
                >
                  <span data-editable={`navItem${index}Label`}>{item.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => navigate('/quote')}
              data-editable-href="ctaHref"
              data-href="/quote"
            >
              <span data-editable="ctaText">Get Quote</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-foreground hover:bg-accent hover:text-accent-foreground"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
            {navigationItems.map((item, index) => (
              <Button
                key={item.href}
                variant="ghost"
                className={`w-full justify-start px-3 py-2 text-base font-medium transition-colors duration-200 ${
                  isActiveItem(item)
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground hover:bg-accent/50 hover:text-accent-foreground'
                }`}
                onClick={() => handleNavClick(item)}
              >
                <span data-editable={`navMobileItem${index}Label`}>{item.label}</span>
              </Button>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4 pb-2">
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/quote');
                }}
                data-editable-href="mobileCta"
                data-href="/quote"
              >
                <span data-editable="mobileCta">Get Quote</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
