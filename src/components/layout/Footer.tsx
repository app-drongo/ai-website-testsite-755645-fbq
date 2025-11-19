'use client';

import React from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const navigate = useSmartNavigation();

  const footerConfig = {
    brandName: 'SaaS Platform',
    description: 'Empowering businesses with modern data solutions and analytics.',
    copyright: '© 2024 SaaS Platform. All rights reserved.',
    sections: {
      company: {
        title: 'Company',
        links: [{ label: 'About', href: '/about' }],
      },
      legal: {
        title: 'Legal',
        links: [
          { label: 'Privacy', href: '/privacy' },
          { label: 'Terms', href: '/terms' },
        ],
      },
    },
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-foreground">
                  <span data-editable="brandName">{footerConfig.brandName}</span>
                </h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md">
                <span data-editable="description">{footerConfig.description}</span>
              </p>
              <button
                onClick={handleBackToTop}
                className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors duration-200 group"
                aria-label="Back to top"
              >
                <svg
                  className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                Back to top
              </button>
            </div>

            {/* Company Section */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">
                <span data-editable="companyTitle">{footerConfig.sections.company.title}</span>
              </h4>
              <ul className="space-y-3">
                {footerConfig.sections.company.links.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => navigate(link.href)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      data-editable-href={`companyLink${index}Href`}
                      data-href={link.href}
                    >
                      <span data-editable={`companyLink${index}Label`}>{link.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">
                <span data-editable="legalTitle">{footerConfig.sections.legal.title}</span>
              </h4>
              <ul className="space-y-3">
                {footerConfig.sections.legal.links.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => navigate(link.href)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      data-editable-href={`legalLink${index}Href`}
                      data-href={link.href}
                    >
                      <span data-editable={`legalLink${index}Label`}>{link.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Bar */}
        <div className="py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-xs text-muted-foreground">
              <span data-editable="copyright">{footerConfig.copyright}</span>
            </p>

            {/* Social Links Placeholder */}
            <div className="flex items-center space-x-4">
              <div className="flex space-x-4">
                <button
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label="Follow us on Twitter"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label="Follow us on LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
                <button
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label="Follow us on GitHub"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
