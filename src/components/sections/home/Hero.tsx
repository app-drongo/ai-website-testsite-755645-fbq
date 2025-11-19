'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, CheckCircle, Star, Users, Zap } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

interface HeroConfig {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: string;
  primaryCtaHref: string;
  secondaryCta: string;
  secondaryCtaHref: string;
  videoHref: string;
  features: string[];
  stats: {
    users: string;
    rating: string;
    reviews: string;
  };
}

const defaultConfig: HeroConfig = {
  badge: '🚀 New Dashboard Features Available',
  title: 'Transform Your Data Into Actionable Insights',
  subtitle: 'The Complete SaaS Platform for Modern Teams',
  description:
    'Streamline your workflow with our powerful dashboard and data visualization tools. Make data-driven decisions faster than ever before.',
  primaryCta: 'Start Free Trial',
  primaryCtaHref: '/dashboard',
  secondaryCta: 'Watch Demo',
  secondaryCtaHref: '#demo',
  videoHref: 'https://www.youtube.com/watch?v=demo',
  features: ['Real-time Analytics', 'Advanced Data Tables', 'Custom Dashboards'],
  stats: {
    users: '10K+',
    rating: '4.9',
    reviews: '500+',
  },
};

export default function Hero() {
  const navigate = useSmartNavigation();
  const [config] = useState<HeroConfig>(defaultConfig);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.05),transparent_50%)]" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div
            className={`flex justify-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
            >
              <span data-editable="badge">{config.badge}</span>
            </Badge>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-8">
            {/* Title */}
            <div
              className={`space-y-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                <span data-editable="title">{config.title}</span>
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary">
                <span data-editable="subtitle">{config.subtitle}</span>
              </h2>
            </div>

            {/* Description */}
            <div
              className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                <span data-editable="description">{config.description}</span>
              </p>
            </div>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold group transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={() => navigate(config.primaryCtaHref)}
                data-editable-href="primaryCtaHref"
                data-href={config.primaryCtaHref}
              >
                <span data-editable="primaryCta">{config.primaryCta}</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 px-8 py-6 text-lg font-semibold group transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-accent-foreground"
                onClick={() => navigate(config.secondaryCtaHref)}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span data-editable="secondaryCta">{config.secondaryCta}</span>
              </Button>
            </div>

            {/* Features */}
            <div
              className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="flex flex-wrap justify-center gap-6 mt-12">
                {config.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span
                      data-editable={`feature-${index}`}
                      className="text-sm md:text-base font-medium"
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div
              className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-16 pt-8 border-t border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm">
                    <span data-editable="statsUsers" className="font-bold text-foreground">
                      {config.stats.users}
                    </span>{' '}
                    Active Users
                  </span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="h-5 w-5 text-primary fill-primary" />
                  <span className="text-sm">
                    <span data-editable="statsRating" className="font-bold text-foreground">
                      {config.stats.rating}
                    </span>{' '}
                    Rating
                  </span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="text-sm">
                    <span data-editable="statsReviews" className="font-bold text-foreground">
                      {config.stats.reviews}
                    </span>{' '}
                    Reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse delay-1000" />
      <div
        className="absolute top-1/2 left-5 w-16 h-16 bg-primary/5 rounded-full blur-lg animate-bounce"
        style={{ animationDelay: '2s' }}
      />
    </section>
  );
}
