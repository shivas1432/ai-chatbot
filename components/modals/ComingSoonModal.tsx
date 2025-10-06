'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image, Wrench, Store, Smartphone, Palette, Star, Sparkles, Zap, Calendar, Mail, Check, Cake as Shake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Neumorphic } from '@/components/ui/neumorphic';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'text-to-image' | 'tool-calling' | 'assistant-market' | 'pwa-info' | 'mobile-info' | 'themes-info';
}

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function ComingSoonModal({ isOpen, onClose, type }: ComingSoonModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const modalData = {
    'text-to-image': {
      title: 'AI Image Studio',
      emoji: '🎨',
      description: 'Transform your ideas into stunning visuals with advanced AI image generation',
      features: [
        'DALL-E 3 Integration',
        'Midjourney API Support',
        'Stable Diffusion XL',
        'Style Transfer & Enhancement',
        'Batch Image Generation',
        'Custom Model Training'
      ],
      targetDate: '2025-06-01',
      ctaText: 'Notify Me When Ready',
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-500'
    },
    'tool-calling': {
      title: 'Plugin Marketplace',
      emoji: '🔌',
      description: 'Extend AI capabilities with powerful tools and custom integrations',
      features: [
        'Web Search Integration',
        'Code Execution Environment',
        'Calculator & Math Tools',
        'Weather & News APIs',
        'Stock Market Data',
        'Custom Plugin Creator'
      ],
      targetDate: '2025-07-15',
      ctaText: 'Join Beta Waitlist',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-500'
    },
    'assistant-market': {
      title: 'AI Agents Marketplace',
      emoji: '🤖',
      description: '500+ specialized AI assistants ready to help with any task',
      features: [
        'Expert Coding Assistants',
        'Professional Writers',
        'Business Analysts',
        'Creative Artists',
        'Language Teachers',
        'Custom Agent Builder'
      ],
      targetDate: '2025-05-20',
      ctaText: 'Join Early Access',
      gradient: 'from-green-500/20 to-emerald-500/20',
      iconColor: 'text-green-500'
    },
    'pwa-info': {
      title: 'Install AI Buddy',
      emoji: '📱',
      description: 'Use AI Buddy like a native app on any device',
      features: [
        'Offline Chat Support',
        'Push Notifications',
        'Desktop Shortcuts',
        'Fast Performance',
        'Auto Updates',
        'Native App Feel'
      ],
      targetDate: null,
      ctaText: 'Install Now',
      gradient: 'from-indigo-500/20 to-purple-500/20',
      iconColor: 'text-indigo-500',
      available: true
    },
    'mobile-info': {
      title: 'Mobile Optimized',
      emoji: '📱',
      description: 'Perfect chat experience optimized for mobile devices',
      features: [
        'Touch-Optimized Interface',
        'Responsive Design',
        'Gesture Controls',
        'Mobile Voice Input',
        'Swipe Navigation',
        'Adaptive Layout'
      ],
      targetDate: null,
      ctaText: 'Learn More',
      gradient: 'from-orange-500/20 to-red-500/20',
      iconColor: 'text-orange-500',
      available: true
    },
    'themes-info': {
      title: 'Customize Your Experience',
      emoji: '🎨',
      description: 'Personalize AI Buddy with beautiful themes and customization options',
      features: [
        'Dark Mode Support',
        'Light Mode Options',
        'Auto Theme Switching',
        'Custom Color Schemes (Coming Soon)',
        'Font Customization (Coming Soon)',
        'Layout Preferences'
      ],
      targetDate: null,
      ctaText: 'Customize Now',
      gradient: 'from-pink-500/20 to-rose-500/20',
      iconColor: 'text-pink-500',
      available: true
    }
  };

  const data = modalData[type];

  const calculateTimeLeft = (targetDate: string): CountdownTime => {
    const difference = +new Date(targetDate) - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  useEffect(() => {
    if (data.targetDate) {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(data.targetDate!));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [data.targetDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      onClose();
    }, 2000);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <motion.div 
      key={value}
      initial={{ rotateX: 90 }}
      animate={{ rotateX: 0 }}
      className="text-center"
    >
      <Neumorphic className="p-4 bg-card">
        <div className="text-3xl font-bold text-[#007AFF] mb-1">{value.toString().padStart(2, '0')}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
      </Neumorphic>
    </motion.div>
  );

  const IconComponent = type === 'text-to-image' ? Image : 
                      type === 'tool-calling' ? Wrench :
                      type === 'assistant-market' ? Store :
                      type === 'pwa-info' || type === 'mobile-info' ? Smartphone :
                      Palette;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <Neumorphic className="p-8 bg-card">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="absolute top-4 right-4 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  animate={{ 
                    rotate: type === 'text-to-image' ? 360 : 0,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${data.gradient} flex items-center justify-center`}
                >
                  <IconComponent className={`w-10 h-10 ${data.iconColor}`} />
                </motion.div>
                
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#007AFF] to-[#007AFF]/70 bg-clip-text text-transparent">
                  {data.title}
                </h1>
                
                <p className="text-lg text-muted-foreground">
                  {data.description}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {data.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Neumorphic variant="inset" className="p-4 bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#007AFF] rounded-full shrink-0" />
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    </Neumorphic>
                  </motion.div>
                ))}
              </div>

              {/* Countdown Timer (for coming soon features) */}
              {data.targetDate && (
                <div className="mb-8">
                  <h3 className="text-center text-lg font-semibold mb-4 flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Coming Soon
                  </h3>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <TimeUnit value={timeLeft.days} label="Days" />
                    <TimeUnit value={timeLeft.hours} label="Hours" />
                    <TimeUnit value={timeLeft.minutes} label="Minutes" />
                    <TimeUnit value={timeLeft.seconds} label="Seconds" />
                  </div>
                </div>
              )}

              {/* CTA Section */}
              <div className="text-center">
                {data.available ? (
                  <Button 
                    className="bg-[#007AFF] hover:bg-[#007AFF]/90 text-white px-8 py-3 text-lg"
                    onClick={onClose}
                  >
                    {data.ctaText}
                  </Button>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div
                      animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="Enter your email for early access"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="bg-[#007AFF] hover:bg-[#007AFF]/90 text-white px-6 h-12"
                          disabled={isSubmitted}
                        >
                          {isSubmitted ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex items-center gap-2"
                            >
                              <Check className="w-4 h-4" />
                              Subscribed!
                            </motion.div>
                          ) : (
                            data.ctaText
                          )}
                        </Button>
                      </div>
                    </motion.div>
                    
                    <p className="text-xs text-muted-foreground">
                      We'll notify you as soon as this feature is available. No spam, ever.
                    </p>
                  </form>
                )}
              </div>

              {/* Floating Particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[#007AFF]/20 rounded-full"
                    animate={{
                      x: [0, 100, 0],
                      y: [0, -100, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.5,
                      repeat: Infinity,
                    }}
                    style={{
                      left: `${10 + i * 15}%`,
                      top: `${20 + (i % 2) * 40}%`,
                    }}
                  />
                ))}
              </div>
            </Neumorphic>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}