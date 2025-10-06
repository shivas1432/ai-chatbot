'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Settings as SettingsIcon } from 'lucide-react';
import { useChatStore } from '@/stores/chatStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/layout/Sidebar';
import { Settings } from '@/components/settings/Settings';
import { Footer } from '@/components/layout/Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarOpen, setSidebarOpen, settingsOpen, setSettingsOpen } = useChatStore();
  const { theme } = useSettingsStore();
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
    
    // Open settings by default on large screens only
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      setSettingsOpen(true);
    }
  }, [setSettingsOpen]);

  // Apply theme
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      root.classList.toggle('dark', mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        root.classList.toggle('dark', e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#007AFF]"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background overflow-hidden">
      <div className="flex h-full">
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-background border-b border-border p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <h1 className="text-lg font-display">AI Buddy</h1>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSettingsOpen(!settingsOpen)}
            >
              <SettingsIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                        lg:translate-x-0 transition-transform duration-300 ease-in-out
                        fixed lg:relative top-16 lg:top-0 left-0 z-30 h-full lg:h-auto
                        w-80 lg:w-80 bg-background lg:bg-transparent`}>
          <Sidebar onSettingsClick={() => setSettingsOpen(true)} />
        </div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col mt-16 lg:mt-0 min-h-0">
          {children}
        </main>

        {/* Settings Panel - Visible by default on large screens */}
        <motion.div
          initial={false}
          animate={{
            x: settingsOpen ? 0 : '100%',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`fixed top-16 right-0 z-30 h-full w-80 bg-background border-l border-border
                     lg:top-0 ${settingsOpen ? 'lg:relative' : 'lg:absolute'}`}
        >
          <Settings onClose={() => setSettingsOpen(false)} />
        </motion.div>

        {/* Mobile Overlay */}
        {(sidebarOpen || settingsOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-20"
            onClick={() => {
              setSidebarOpen(false);
              setSettingsOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}