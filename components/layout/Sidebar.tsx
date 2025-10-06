'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Settings, 
  User, 
  Sparkles,
  Eye,
  Mic,
  Image,
  Wrench,
  Store,
  Smartphone,
  Palette,
  Lock,
  Clock
} from 'lucide-react';
import { useChatStore } from '@/stores/chatStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Neumorphic } from '@/components/ui/neumorphic';
import { ConversationList } from './ConversationList';
import { ComingSoonModal } from '@/components/modals/ComingSoonModal';

interface SidebarProps {
  onSettingsClick: () => void;
}

export function Sidebar({ onSettingsClick }: SidebarProps) {
  const { createConversation, sidebarOpen } = useChatStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const handleNewChat = () => {
    createConversation();
  };

  const features = [
    { 
      id: 'multi-ai', 
      name: 'Multi AI Providers', 
      icon: Sparkles, 
      available: true,
      description: 'OpenAI, Anthropic, Google & more'
    },
    { 
      id: 'local-llm', 
      name: 'Local LLM Support', 
      icon: Sparkles, 
      available: true,
      description: 'Ollama integration'
    },
    { 
      id: 'vision', 
      name: 'Vision Recognition', 
      icon: Eye, 
      available: true,
      description: 'Image analysis & OCR'
    },
    { 
      id: 'voice', 
      name: 'TTS & STT', 
      icon: Mic, 
      available: true,
      description: 'Voice conversations'
    },
    { 
      id: 'text-to-image', 
      name: 'Text to Image', 
      icon: Image, 
      available: false,
      comingSoon: true
    },
    { 
      id: 'tool-calling', 
      name: 'Tool Calling', 
      icon: Wrench, 
      available: false,
      comingSoon: true
    },
  ];

  const marketplace = [
    { 
      id: 'assistant-market', 
      name: 'Assistant Market', 
      icon: Store, 
      available: false,
      comingSoon: true
    },
    { 
      id: 'pwa', 
      name: 'Progressive Web App', 
      icon: Smartphone, 
      available: true
    },
    { 
      id: 'mobile', 
      name: 'Mobile Adaptation', 
      icon: Smartphone, 
      available: true
    },
    { 
      id: 'themes', 
      name: 'Custom Themes', 
      icon: Palette, 
      available: true
    },
  ];

  const handleFeatureClick = (feature: any) => {
    // Don't open modals for locked features - only show tooltip on hover
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

  if (!sidebarOpen) return null;

  return (
    <>
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        className="w-80 h-full bg-background border-r border-border flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[#007AFF] rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-display">AI Buddy</h1>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Chat Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Chat
              </h2>
            </div>
            
            <Button
              onClick={handleNewChat}
              className="w-full mb-4 bg-[#007AFF] hover:bg-[#007AFF]/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>

            <ConversationList searchTerm={searchTerm} />
          </div>

          {/* Features Section */}
          <div className="p-4 border-t border-border">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Features
            </h2>
            
            <div className="space-y-2">
              {features.map((feature) => (
                <div 
                  key={feature.id}
                  className="relative"
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <motion.button
                    onClick={() => handleFeatureClick(feature)}
                    className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors flex items-center gap-3 relative group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`p-2 rounded-lg ${
                      feature.available 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' 
                        : 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
                    }`}>
                      {feature.available ? (
                        <feature.icon className="w-4 h-4" />
                      ) : (
                        <div className="relative">
                          <feature.icon className="w-4 h-4" />
                          <Lock className="w-2 h-2 absolute -top-1 -right-1" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{feature.name}</span>
                        {!feature.available && (
                          <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded dark:bg-orange-900/20 dark:text-orange-400"
                          >
                            🔒
                          </motion.span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.button>
                  
                  {/* Tooltip for locked features */}
                  {!feature.available && hoveredFeature === feature.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[9999] px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
                    >
                      Coming Soon
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Marketplace Section */}
          <div className="p-4 border-t border-border">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Marketplace
            </h2>
            
            <div className="space-y-2">
              {marketplace.map((item) => (
                <div 
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setHoveredFeature(item.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <motion.button
                    onClick={() => handleFeatureClick(item)}
                    className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors flex items-center gap-3 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`p-2 rounded-lg ${
                      item.available 
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                        : 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
                    }`}>
                      {item.available ? (
                        <item.icon className="w-4 h-4" />
                      ) : (
                        <div className="relative">
                          <item.icon className="w-4 h-4" />
                          <Lock className="w-2 h-2 absolute -top-1 -right-1" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{item.name}</span>
                        {!item.available && (
                          <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded dark:bg-orange-900/20 dark:text-orange-400"
                          >
                            🔒
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
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[9999] px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
                    >
                      Coming Soon
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border space-y-2">
          <Button
            variant="ghost"
            onClick={onSettingsClick}
            className="w-full justify-start"
          >
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </Button>
          
          <Button variant="ghost" className="w-full justify-start">
            <User className="w-4 h-4 mr-3" />
            Profile
          </Button>
          
          <div className="pt-4 border-t border-border">
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <a href="/about" className="hover:text-foreground transition-colors">About</a>
                <a href="/contact" className="hover:text-foreground transition-colors">Contact</a>
              </div>
              <div className="flex justify-between">
                <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
                <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

    </>
  );
}