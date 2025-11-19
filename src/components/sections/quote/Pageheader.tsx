'use client';

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
  children?: React.ReactNode;
}

export default function Pageheader({
  title = 'Quote Request',
  description = 'Get a personalized quote for your project needs',
  breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Quote' },
  ],
  showBackButton = false,
  backButtonText = 'Back to Dashboard',
  backButtonHref = '/dashboard',
  children,
}: PageHeaderProps) {
  const navigate = useSmartNavigation();

  return (
    <section className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            className="flex items-center space-x-1 text-sm text-muted-foreground mb-4"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center space-x-1">
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center">
                  {index === 0 && <Home className="w-4 h-4 mr-1" aria-hidden="true" />}
                  {item.href ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => navigate(item.href!)}
                      data-editable-href={`breadcrumb-${index}-href`}
                      data-href={item.href}
                    >
                      <span data-editable={`breadcrumb-${index}-label`}>{item.label}</span>
                    </Button>
                  ) : (
                    <span
                      className="text-foreground font-medium"
                      aria-current="page"
                      data-editable={`breadcrumb-${index}-label`}
                    >
                      {item.label}
                    </span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight
                      className="w-4 h-4 mx-2 text-muted-foreground"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Back Button */}
        {showBackButton && (
          <div className="mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(backButtonHref)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-editable-href="backButtonHref"
              data-href={backButtonHref}
            >
              <ChevronRight className="w-4 h-4 mr-1 rotate-180" aria-hidden="true" />
              <span data-editable="backButtonText">{backButtonText}</span>
            </Button>
          </div>
        )}

        {/* Header Content */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
              <span data-editable="title">{title}</span>
            </h1>
            {description && (
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
                <span data-editable="description">{description}</span>
              </p>
            )}
          </div>

          {/* Action Area */}
          {children && <div className="flex-shrink-0">{children}</div>}
        </div>

        {/* Optional Separator */}
        <div className="mt-6">
          <Separator className="bg-border" />
        </div>
      </div>
    </section>
  );
}
