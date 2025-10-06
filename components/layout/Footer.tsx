'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageSquare, Github, Linkedin, Globe, Mail, Heart } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    product: [
      { name: 'Features', href: '/#features' },
      { name: 'Pricing', href: '/#pricing' },
      { name: 'FAQ', href: '/#faq' },
      { name: 'Changelog', href: '/changelog' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' }
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Status', href: '/status' }
    ]
  };

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/ss_web_innovations',
      icon: Github
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/shivashanker-kanugul',
      icon: Linkedin
    },
    {
      name: 'Website',
      href: 'https://shivashanker.com',
      icon: Globe
    },
    {
      name: 'Email',
      href: 'mailto:shivas1432@gmail.com',
      icon: Mail
    }
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#007AFF] rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display">AI Buddy</span>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-sm">
              Your intelligent chat companion that brings together the best AI models 
              from multiple providers in one beautiful, privacy-focused application.
            </p>
            
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center hover:bg-[#007AFF]/10 hover:text-[#007AFF] transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground text-sm mb-1">
                © 2025 AI Buddy. All rights reserved.
              </p>
              <p className="text-muted-foreground text-xs flex items-center justify-center md:justify-start gap-1">
                Built with <Heart className="w-3 h-3 text-red-500" /> by 
                <a 
                  href="https://shivashanker.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#007AFF] hover:underline ml-1"
                >
                  Kanugula Shivashanker
                </a>
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-muted-foreground text-xs">
                Full-Stack Developer | React, Node.js, Express, MySQL
              </p>
              <p className="text-muted-foreground text-xs">
                Contact: shivas1432@gmail.com | Telegram: @helpme_coder
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}