'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  MessageSquare, 
  Globe, 
  Github, 
  Linkedin, 
  Send, 
  MapPin, 
  Clock,
  Phone,
  User,
  MessageCircle
} from 'lucide-react';
import { Neumorphic } from '@/components/ui/neumorphic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'shivas1432@gmail.com',
      href: 'mailto:shivas1432@gmail.com',
      description: 'Send me an email for business inquiries'
    },
    {
      icon: MessageSquare,
      title: 'Telegram',
      value: '@helpme_coder',
      href: 'https://t.me/helpme_coder',
      description: 'Quick chat and support'
    },
    {
      icon: Globe,
      title: 'Website',
      value: 'shivashanker.com',
      href: 'https://shivashanker.com',
      description: 'Visit my portfolio website'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'shivashanker-kanugul',
      href: 'https://linkedin.com/in/shivashanker-kanugul',
      description: 'Connect professionally'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      href: 'https://github.com/ss_web_innovations',
      color: 'hover:text-gray-600'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/shivashanker-kanugul',
      color: 'hover:text-blue-600'
    },
    {
      icon: Globe,
      name: 'Website',
      href: 'https://shivashanker.com',
      color: 'hover:text-green-600'
    },
    {
      icon: MessageSquare,
      name: 'Telegram',
      href: 'https://t.me/helpme_coder',
      color: 'hover:text-blue-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#007AFF] to-[#007AFF]/70 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#007AFF] to-[#007AFF]/70 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have questions about AI Buddy? Want to collaborate on a project? Or just want to say hello? 
              I'd love to hear from you! Let's build something amazing together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Neumorphic className="p-8 bg-card">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-2"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-2"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="mt-2"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="mt-2 min-h-[120px]"
                      placeholder="Tell me more about your project or question..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#007AFF] hover:bg-[#007AFF]/90"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </Neumorphic>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Developer Info */}
              <Neumorphic className="p-8 bg-card">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#007AFF] to-[#007AFF]/70 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Kanugula Shivashanker</h3>
                  <p className="text-[#007AFF] font-medium">Full-Stack Developer</p>
                  <p className="text-muted-foreground text-sm mt-2">
                    React, Node.js, Express, MySQL | Passionate about building dynamic web apps
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>India</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>Available for collaboration</span>
                  </div>
                </div>
              </Neumorphic>

              {/* Contact Methods */}
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Neumorphic className="p-4 bg-card">
                      <a
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 hover:text-[#007AFF] transition-colors"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-[#007AFF]/20 to-[#007AFF]/10 rounded-lg flex items-center justify-center">
                          <method.icon className="w-5 h-5 text-[#007AFF]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{method.title}</h4>
                          <p className="text-sm text-muted-foreground">{method.value}</p>
                          <p className="text-xs text-muted-foreground">{method.description}</p>
                        </div>
                      </a>
                    </Neumorphic>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <Neumorphic className="p-6 bg-card">
                <h3 className="font-semibold mb-4 text-center">Connect on Social</h3>
                <div className="flex justify-center gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center transition-colors ${social.color}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </Neumorphic>

              {/* Quick Response */}
              <Neumorphic className="p-6 bg-card">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-[#007AFF] mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Quick Response</h3>
                  <p className="text-sm text-muted-foreground">
                    I typically respond within 24 hours. For urgent matters, 
                    reach out via Telegram for faster communication.
                  </p>
                </div>
              </Neumorphic>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-border">
            <p className="text-muted-foreground mb-2">
              © 2025 AI Buddy. Built with ❤️ by Kanugula Shivashanker
            </p>
            <p className="text-sm text-muted-foreground">
              Full-Stack Developer | Open to collaboration and new opportunities
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}