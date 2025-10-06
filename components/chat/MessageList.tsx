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
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-[#007AFF]/20 to-[#007AFF]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🤖</span>
          </div>
          
          <h2 className="text-2xl font-display mb-4">Welcome to AI Buddy</h2>
          
          <p className="text-muted-foreground mb-6 font-body">
            Your intelligent chat companion is ready to help with any question, task, or creative project. 
            What would you like to explore today?
          </p>
          
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="p-3 bg-muted/50 rounded-lg text-left">
              <div className="font-medium mb-1 font-heading">💡 Get creative help</div>
              <div className="text-muted-foreground font-body">"Help me brainstorm ideas for my project"</div>
            </div>
            
            <div className="p-3 bg-muted/50 rounded-lg text-left">
              <div className="font-medium mb-1 font-heading">🔍 Ask questions</div>
              <div className="text-muted-foreground font-body">"Explain quantum computing in simple terms"</div>
            </div>
            
            <div className="p-3 bg-muted/50 rounded-lg text-left">
              <div className="font-medium mb-1 font-heading">⚡ Get coding help</div>
              <div className="text-muted-foreground font-body">"Review this React component for me"</div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
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