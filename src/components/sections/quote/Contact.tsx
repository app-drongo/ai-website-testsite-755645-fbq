'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Users,
  Headphones,
} from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
  inquiryType: 'general' | 'sales' | 'support' | 'partnership';
}

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  details: string[];
  href?: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Contact() {
  const navigate = useSmartNavigation();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo: ContactInfo[] = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: 'Email Us',
      details: ['hello@company.com', 'support@company.com'],
      href: 'mailto:hello@company.com',
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', 'Mon-Fri 9AM-6PM EST'],
      href: 'tel:+15551234567',
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: 'Visit Us',
      details: ['123 Business Ave', 'San Francisco, CA 94105'],
      href: 'https://maps.google.com',
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'Business Hours',
      details: ['Monday - Friday: 9AM - 6PM', 'Saturday: 10AM - 4PM'],
    },
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: <MessageSquare className="h-4 w-4" /> },
    { value: 'sales', label: 'Sales & Pricing', icon: <Users className="h-4 w-4" /> },
    { value: 'support', label: 'Technical Support', icon: <Headphones className="h-4 w-4" /> },
    { value: 'partnership', label: 'Partnership', icon: <CheckCircle className="h-4 w-4" /> },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general',
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="border-border bg-card">
            <CardContent className="p-12">
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                <span data-editable="successTitle">Thank You!</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                <span data-editable="successMessage">
                  We've received your message and will get back to you within 24 hours.
                </span>
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Send Another Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <span data-editable="badge">Contact Us</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            <span data-editable="title">Get in Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="subtitle">
              Have questions about our platform? We're here to help. Reach out to our team and we'll
              get back to you as soon as possible.
            </span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  <span data-editable="contactInfoTitle">Contact Information</span>
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <div className="text-primary">{info.icon}</div>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">{info.title}</h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-muted-foreground text-sm">
                            {info.href && detailIndex === 0 ? (
                              <button
                                onClick={() => navigate(info.href!)}
                                className="hover:text-primary transition-colors"
                                data-editable-href={`contactInfo${index}Href`}
                                data-href={info.href}
                              >
                                {detail}
                              </button>
                            ) : (
                              detail
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">
                  <span data-editable="responseTimeTitle">Response Time</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">
                      <span data-editable="generalResponse">
                        General inquiries: Within 24 hours
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">
                      <span data-editable="supportResponse">Support requests: Within 4 hours</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">
                      <span data-editable="salesResponse">Sales inquiries: Within 2 hours</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <h2 className="text-2xl font-semibold text-card-foreground">
                  <span data-editable="formTitle">Send us a Message</span>
                </h2>
                <p className="text-muted-foreground">
                  <span data-editable="formSubtitle">
                    Fill out the form below and we'll get back to you shortly.
                  </span>
                </p>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  data-form-id="691de88bc8a3dbe9a70d572c"
                >
                  {/* Inquiry Type Selection */}
                  <div>
                    <Label className="text-sm font-medium text-card-foreground mb-3 block">
                      <span data-editable="inquiryTypeLabel">What can we help you with?</span>
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {inquiryTypes.map(type => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => handleInputChange('inquiryType', type.value)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            formData.inquiryType === type.value
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            {type.icon}
                            <span className="text-sm font-medium">{type.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-card-foreground">
                        <span data-editable="nameLabel">Full Name *</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={e => handleInputChange('name', e.target.value)}
                        className={`mt-1 ${errors.name ? 'border-destructive' : ''}`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <div className="flex items-center space-x-1 mt-1">
                          <AlertCircle className="h-4 w-4 text-destructive" />
                          <span className="text-sm text-destructive">{errors.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-card-foreground">
                        <span data-editable="emailLabel">Email Address *</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={e => handleInputChange('email', e.target.value)}
                        className={`mt-1 ${errors.email ? 'border-destructive' : ''}`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <div className="flex items-center space-x-1 mt-1">
                          <AlertCircle className="h-4 w-4 text-destructive" />
                          <span className="text-sm text-destructive">{errors.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="company" className="text-sm font-medium text-card-foreground">
                        <span data-editable="companyLabel">Company</span>
                      </Label>
                      <Input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={e => handleInputChange('company', e.target.value)}
                        className="mt-1"
                        placeholder="Enter your company name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-card-foreground">
                        <span data-editable="phoneLabel">Phone Number</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={e => handleInputChange('phone', e.target.value)}
                        className="mt-1"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-sm font-medium text-card-foreground">
                      <span data-editable="subjectLabel">Subject *</span>
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={e => handleInputChange('subject', e.target.value)}
                      className={`mt-1 ${errors.subject ? 'border-destructive' : ''}`}
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <div className="flex items-center space-x-1 mt-1">
                        <AlertCircle className="h-4 w-4 text-destructive" />
                        <span className="text-sm text-destructive">{errors.subject}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-card-foreground">
                      <span data-editable="messageLabel">Message *</span>
                    </Label>
                    <textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={e => handleInputChange('message', e.target.value)}
                      className={`mt-1 w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${
                        errors.message ? 'border-destructive' : 'border-input'
                      }`}
                      placeholder="Tell us more about your inquiry..."
                    />
                    {errors.message && (
                      <div className="flex items-center space-x-1 mt-1">
                        <AlertCircle className="h-4 w-4 text-destructive" />
                        <span className="text-sm text-destructive">{errors.message}</span>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="h-4 w-4" />
                        <span data-editable="submitButton">Send Message</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
