'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore } from '@/stores/chatStore';
import { MessageBubble } from './MessageBubble';

export function MessageList() {
  const { conversations, activeConversationId } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const messages = activeConversation?.messages || [];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-4 py-6 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-sm sm:max-w-md w-full"
        >
          {/* Hero Icon - Mobile Optimized */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#007AFF]/20 to-[#007AFF]/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <span className="text-2xl sm:text-4xl">🤖</span>
          </div>
          
          {/* Welcome Title - Mobile Responsive */}
          <h2 className="text-xl sm:text-2xl font-display mb-3 sm:mb-4 leading-tight">
            Welcome to AI Buddy
          </h2>
          
          {/* Description - Mobile Optimized */}
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 font-body leading-relaxed">
            Your intelligent chat companion is ready to help with any question, task, or creative project.
            <span className="hidden sm:inline"> What would you like to explore today?</span>
          </p>
          
          {/* Example Cards - Mobile Stack Layout */}
          <div className="grid grid-cols-1 gap-2.5 sm:gap-3 text-xs sm:text-sm">
            <motion.div 
              className="p-3 sm:p-3.5 bg-muted/50 hover:bg-muted/70 rounded-lg text-left transition-colors cursor-pointer border border-transparent hover:border-border/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-medium mb-1 font-heading text-sm sm:text-base flex items-center gap-2">
                <span className="text-base sm:text-lg">💡</span>
                Get creative help
              </div>
              <div className="text-muted-foreground font-body text-xs sm:text-sm leading-relaxed">
                "Help me brainstorm ideas for my project"
              </div>
            </motion.div>
            
            <motion.div 
              className="p-3 sm:p-3.5 bg-muted/50 hover:bg-muted/70 rounded-lg text-left transition-colors cursor-pointer border border-transparent hover:border-border/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-medium mb-1 font-heading text-sm sm:text-base flex items-center gap-2">
                <span className="text-base sm:text-lg">🔍</span>
                Ask questions
              </div>
              <div className="text-muted-foreground font-body text-xs sm:text-sm leading-relaxed">
                "Explain quantum computing in simple terms"
              </div>
            </motion.div>
            
            <motion.div 
              className="p-3 sm:p-3.5 bg-muted/50 hover:bg-muted/70 rounded-lg text-left transition-colors cursor-pointer border border-transparent hover:border-border/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-medium mb-1 font-heading text-sm sm:text-base flex items-center gap-2">
                <span className="text-base sm:text-lg">⚡</span>
                Get coding help
              </div>
              <div className="text-muted-foreground font-body text-xs sm:text-sm leading-relaxed">
                "Review this React component for me"
              </div>
            </motion.div>
          </div>

          {/* Additional Mobile Tip */}
          <div className="mt-4 sm:mt-6">
            <p className="text-xs text-muted-foreground font-body">
              <span className="sm:hidden">Tap any example above to get started</span>
              <span className="hidden sm:inline">Click any example above to get started</span>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* Mobile-optimized container */}
      <div className="max-w-4xl mx-auto px-3 py-4 sm:p-6 space-y-4 sm:space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}