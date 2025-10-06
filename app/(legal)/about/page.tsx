'use client';

import { motion } from 'framer-motion';
import { 
  Heart, 
  Code, 
  Zap, 
  Users, 
  Globe, 
  Star, 
  Github, 
  Linkedin, 
  Mail, 
  MessageSquare,
  Sparkles,
  Shield,
  Smartphone,
  Database
} from 'lucide-react';
import { Neumorphic } from '@/components/ui/neumorphic';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const features = [
    {
      icon: Sparkles,
      title: 'Multi-AI Provider Support',
      description: 'OpenAI, Anthropic, Google, DeepSeek, Groq, and more'
    },
    {
      icon: Zap,
      title: 'Real-time Streaming',
      description: 'Smooth, responsive AI conversations with live streaming'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your API keys stay in your browser, never sent to our servers'
    },
    {
      icon: Smartphone,
      title: 'Progressive Web App',
      description: 'Install and use like a native app on any device'
    },
    {
      icon: Database,
      title: 'Conversation Management',
      description: 'Create, edit, delete, pin, and search conversations'
    },
    {
      icon: Users,
      title: 'Multiple Auth Options',
      description: 'Google OAuth and guest access for everyone'
    }
  ];

  const techStack = [
    'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Prisma', 'MySQL', 
    'NextAuth.js', 'Zustand', 'Framer Motion', 'React Markdown', 'Shiki'
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Hero Section */}
          <div className="text-center">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-24 h-24 bg-gradient-to-br from-[#007AFF] to-[#007AFF]/70 rounded-2xl flex items-center justify-center mx-auto mb-8"
            >
              <MessageSquare className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#007AFF] to-[#007AFF]/70 bg-clip-text text-transparent">
              About AI Buddy
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your intelligent chat companion that brings together the best AI models from multiple providers 
              in one beautiful, privacy-focused application. Built with modern web technologies and a passion 
              for exceptional user experience.
            </p>
          </div>

          {/* Mission Section */}
          <Neumorphic className="p-8 bg-card">
            <div className="text-center mb-8">
              <Heart className="w-12 h-12 text-[#007AFF] mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  Making advanced AI accessible to everyone, regardless of technical expertise
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Privacy</h3>
                <p className="text-muted-foreground">
                  Ensuring your data and conversations remain private and secure
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  Delivering a premium experience with attention to every detail
                </p>
              </div>
            </div>
          </Neumorphic>

          {/* Features Grid */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Neumorphic className="p-6 bg-card h-full">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#007AFF]/20 to-[#007AFF]/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-[#007AFF]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </Neumorphic>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <Neumorphic className="p-8 bg-card">
            <div className="text-center mb-8">
              <Code className="w-12 h-12 text-[#007AFF] mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Built With Modern Technology</h2>
              <p className="text-muted-foreground">
                AI Buddy is built using cutting-edge web technologies for optimal performance and user experience
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-muted/50 rounded-full text-sm font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </Neumorphic>

          {/* Developer Section */}
          <Neumorphic className="p-8 bg-card">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#007AFF] to-[#007AFF]/70 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">KS</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Meet the Developer</h2>
            </div>
            
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-2">Kanugula Shivashanker</h3>
              <p className="text-[#007AFF] font-medium mb-4">Full-Stack Developer</p>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Passionate about building dynamic web applications with React, Node.js, Express, and MySQL. 
                A continuous learner who loves creating innovative solutions and is always open to collaboration. 
                Specializing in modern web technologies and AI integration.
              </p>
              
              <div className="flex justify-center gap-4 mb-8">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://github.com/ss_web_innovations" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                
                <Button variant="outline" size="sm" asChild>
                  <a href="https://linkedin.com/in/shivashanker-kanugul" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                
                <Button variant="outline" size="sm" asChild>
                  <a href="https://shivashanker.com" target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                  </a>
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>shivas1432@gmail.com</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Telegram: @helpme_coder</span>
                </div>
              </div>
            </div>
          </Neumorphic>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: '8+', label: 'AI Providers' },
              { number: '20+', label: 'AI Models' },
              { number: '100%', label: 'Privacy Focused' },
              { number: '24/7', label: 'Available' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Neumorphic className="p-6 bg-card text-center">
                  <div className="text-3xl font-bold text-[#007AFF] mb-2">{stat.number}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </Neumorphic>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-border">
            <p className="text-muted-foreground mb-2">
              © 2025 AI Buddy. Built with ❤️ by Kanugula Shivashanker
            </p>
            <p className="text-sm text-muted-foreground">
              Full-Stack Developer | React, Node.js, Express, MySQL | Open to collaboration
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}