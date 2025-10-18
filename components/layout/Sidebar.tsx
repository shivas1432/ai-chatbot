'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Settings, 
  User, 
  Crown,
  Zap,
  ArrowUpRight,
  X,
  Lock
} from 'lucide-react';
import { useChatStore } from '@/stores/chatStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConversationList } from './ConversationList';

interface SidebarProps {
  onSettingsClick: () => void;
}

export function Sidebar({ onSettingsClick }: SidebarProps) {
  // Remove toggleSidebar from destructuring since it doesn't exist in the store
  const { createConversation, sidebarOpen, setSidebarOpen } = useChatStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Create a local toggleSidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleNewChat = () => {
    createConversation();
    if (isMobile) {
      toggleSidebar();
    }
  };

  const features = [
    { 
      id: 'multi-ai', 
      name: 'Multi AI Providers', 
      icon: '🤖',
      available: true,
      description: 'OpenAI, Anthropic, Google & more'
    },
    { 
      id: 'local-llm', 
      name: 'Local LLM Support', 
      icon: '💻',
      available: true,
      description: 'Ollama integration'
    },
    { 
      id: 'vision', 
      name: 'Vision Recognition', 
      icon: '👁️',
      available: true,
      description: 'Image analysis & OCR'
    },
    { 
      id: 'voice', 
      name: 'TTS & STT', 
      icon: '🎤',
      available: true,
      description: 'Voice conversations'
    },
    { 
      id: 'text-to-image', 
      name: 'Text to Image', 
      icon: '🎨',
      available: false,
      comingSoon: true
    },
    { 
      id: 'tool-calling', 
      name: 'Tool Calling', 
      icon: '🔧',
      available: false,
      comingSoon: true
    },
  ];

  const marketplace = [
    { 
      id: 'assistant-market', 
      name: 'Assistant Market', 
      icon: '🏪',
      available: false,
      comingSoon: true
    },
    { 
      id: 'pwa', 
      name: 'Progressive Web App', 
      icon: '📱',
      available: true
    },
    { 
      id: 'mobile', 
      name: 'Mobile Adaptation', 
      icon: '📲',
      available: true
    },
    { 
      id: 'themes', 
      name: 'Custom Themes', 
      icon: '🎭',
      available: true
    },
  ];

  const handleFeatureClick = (feature: any) => {
    if (feature.comingSoon || !feature.available) {
      return;
    }
    
    if (feature.id === 'pwa') {
      setActiveModal('pwa-info');
    } else if (feature.id === 'mobile') {
      setActiveModal('mobile-info');
    } else if (feature.id === 'themes') {
      setActiveModal('themes-info');
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {(sidebarOpen || !isMobile) && (
          <motion.aside
            key="sidebar"
            initial={isMobile ? { x: -320 } : false}
            animate={{ x: 0 }}
            exit={isMobile ? { x: -320 } : {}}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed lg:relative top-0 left-0 w-80 h-full bg-background dark:bg-[#0f0f0f] border-r border-border dark:border-white/5 flex flex-col overflow-hidden z-50 lg:z-auto"
          >
            {/* Subtle gradient overlay - only in dark mode */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent dark:from-white/[0.02] pointer-events-none" />
            
            {/* Header */}
            <div className="p-5 border-b border-border dark:border-white/5 relative z-10">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold tracking-tight">AI Buddy</h1>
                </div>
                
                {/* Close button for mobile */}
                {isMobile && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="lg:hidden h-9 w-9 shrink-0"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-accent/50 dark:bg-white/5 border-border dark:border-white/10 focus:bg-accent dark:focus:bg-white/10 focus:border-border dark:focus:border-white/20 transition-all rounded-lg h-10"
                />
              </div>
            </div>

            {/* Chat Section */}
            <div className="flex-1 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              <div className="p-4">
                <Button
                  onClick={handleNewChat}
                  className="w-full mb-4 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:via-orange-700 hover:to-amber-700 text-white font-medium shadow-lg shadow-orange-500/20 border-0 h-11 rounded-lg transition-all"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Chat
                </Button>

                <ConversationList searchTerm={searchTerm} />
              </div>

              {/* Features Section */}
              <div className="p-4 border-t border-border dark:border-white/5">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
                  Features
                </h2>
                
                <div className="space-y-1.5">
                  {features.map((feature) => (
                    <div 
                      key={feature.id}
                      className="relative"
                      onMouseEnter={() => setHoveredFeature(feature.id)}
                      onMouseLeave={() => setHoveredFeature(null)}
                    >
                      <motion.button
                        onClick={() => handleFeatureClick(feature)}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-accent dark:hover:bg-white/5 transition-all flex items-center gap-3 relative group"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xl relative ${
                          feature.available 
                            ? 'bg-green-100 dark:bg-gradient-to-br dark:from-green-500/20 dark:to-emerald-500/20' 
                            : 'bg-orange-100 dark:bg-gradient-to-br dark:from-orange-500/10 dark:to-amber-500/10'
                        }`}>
                          <span>{feature.icon}</span>
                          {!feature.available && (
                            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-orange-500 rounded-full flex items-center justify-center">
                              <Lock className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm truncate">{feature.name}</span>
                            {!feature.available && (
                              <motion.span
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-[10px] bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 px-1.5 py-0.5 rounded border-0 dark:border dark:border-orange-500/30"
                              >
                                PRO
                              </motion.span>
                            )}
                          </div>
                          <p className="text-[11px] text-muted-foreground truncate">{feature.description}</p>
                        </div>
                      </motion.button>
                      
                      {/* Tooltip for locked features */}
                      {!feature.available && hoveredFeature === feature.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[9999] px-3 py-1.5 bg-gray-900 text-white text-[11px] rounded-lg shadow-2xl whitespace-nowrap pointer-events-none border border-white/10"
                        >
                          Upgrade to unlock
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Marketplace Section */}
              <div className="p-4 border-t border-border dark:border-white/5">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
                  Marketplace
                </h2>
                
                <div className="space-y-1.5">
                  {marketplace.map((item) => (
                    <div 
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => setHoveredFeature(item.id)}
                      onMouseLeave={() => setHoveredFeature(null)}
                    >
                      <motion.button
                        onClick={() => handleFeatureClick(item)}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-accent dark:hover:bg-white/5 transition-all flex items-center gap-3 group"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xl relative ${
                          item.available 
                            ? 'bg-blue-100 dark:bg-gradient-to-br dark:from-blue-500/20 dark:to-cyan-500/20' 
                            : 'bg-orange-100 dark:bg-gradient-to-br dark:from-orange-500/10 dark:to-amber-500/10'
                        }`}>
                          <span>{item.icon}</span>
                          {!item.available && (
                            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-orange-500 rounded-full flex items-center justify-center">
                              <Lock className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm truncate">{item.name}</span>
                            {!item.available && (
                              <motion.span
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-[10px] bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 px-1.5 py-0.5 rounded border-0 dark:border dark:border-orange-500/30"
                              >
                                PRO
                              </motion.span>
                            )}
                          </div>
                        </div>
                      </motion.button>
                      
                      {/* Tooltip for locked marketplace items */}
                      {!item.available && hoveredFeature === item.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[9999] px-3 py-1.5 bg-gray-900 text-white text-[11px] rounded-lg shadow-2xl whitespace-nowrap pointer-events-none border border-white/10"
                        >
                          Upgrade to unlock
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Premium Upgrade Section */}
            <div className="p-4 border-t border-border dark:border-white/5 relative z-10">
              <motion.div
                className="relative overflow-hidden rounded-2xl p-5 cursor-pointer group bg-orange-50 dark:bg-transparent"
                style={{
                  background: 'var(--premium-gradient, linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(249, 115, 22, 0.05) 50%, rgba(234, 88, 12, 0.1) 100%))',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated gradient background - only dark mode */}
                <motion.div
                  className="absolute inset-0 opacity-0 dark:opacity-30"
                  animate={{
                    background: [
                      'radial-gradient(circle at 0% 0%, rgba(234, 88, 12, 0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 100% 100%, rgba(251, 146, 60, 0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 0% 100%, rgba(217, 70, 12, 0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 100% 0%, rgba(234, 88, 12, 0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 0% 0%, rgba(234, 88, 12, 0.3) 0%, transparent 50%)',
                    ],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                />

                {/* Crown icon with glow */}
                <div className="relative mb-3">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-2xl"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(234, 88, 12, 0.3)',
                        '0 0 40px rgba(234, 88, 12, 0.5)',
                        '0 0 20px rgba(234, 88, 12, 0.3)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Crown className="w-6 h-6 text-white" />
                  </motion.div>
                </div>

                {/* Content */}
               <div className="relative">
  <div className="flex items-center gap-2 mb-1">
    <h3 className="text-sm font-bold">Upgrade to</h3>
    <span className="px-2 py-0.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white text-xs font-bold rounded-full shadow-lg">
      PRO
    </span>
  </div>
  <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
    Unlock premium tools, priority support, enhanced features.
  </p>

  {/* CTA Button */}
  <motion.button
    className="w-full py-2 px-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-semibold rounded-lg shadow-lg shadow-orange-500/30 flex items-center justify-center gap-1.5 transition-all"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Zap className="w-3.5 h-3.5" />
    Don't Miss Out
    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
  </motion.button>
</div>
              </motion.div>

              {/* Bottom Actions */}
              <div className="mt-4 space-y-1">
                <Button
                  variant="ghost"
                  onClick={onSettingsClick}
                  className="w-full justify-start h-10 rounded-lg"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start h-10 rounded-lg"
                >
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}