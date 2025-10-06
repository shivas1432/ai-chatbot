'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Square, 
  Loader as Loader2, 
  Paperclip, 
  Image as ImageIcon, 
  Mic, 
  Smile, 
  Code, 
  FileText,
  Camera,
  Video,
  Music,
  Archive
} from 'lucide-react';
import { useChatStore } from '@/stores/chatStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageList } from './MessageList';
import { ProviderSelector } from './ProviderSelector';
import { Neumorphic } from '@/components/ui/neumorphic';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function ChatInterface() {
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const {
    conversations,
    activeConversationId,
    addMessage,
    updateMessage,
    createConversation,
    currentProvider,
    currentModel,
  } = useChatStore();

  const { apiKeys } = useSettingsStore();

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isStreaming) return;

    let conversationId = activeConversationId;
    
    // Create new conversation if none exists
    if (!conversationId) {
      conversationId = createConversation();
    }

    const userMessage = input.trim();
    setInput('');
    setIsStreaming(true);

    // Add user message
    addMessage({
      role: 'user',
      content: userMessage,
      conversationId,
    });

    try {
      // Create assistant message
      const assistantMessageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      addMessage({
        role: 'assistant',
        content: '',
        conversationId,
      });

      // Get API key for current provider
      const apiKey = apiKeys[currentProvider as keyof typeof apiKeys];
      
      if (!apiKey) {
        throw new Error(`No API key found for ${currentProvider}. Please add one in settings.`);
      }

      // Create abort controller for this request
      abortControllerRef.current = new AbortController();

      // Stream response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...(activeConversation?.messages.map(m => ({
              role: m.role,
              content: m.content,
            })) || []),
            { role: 'user', content: userMessage },
          ],
          provider: currentProvider,
          model: currentModel,
          apiKey,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      if (!reader) {
        throw new Error('No response body');
      }

      try {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            break;
          }

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              
              if (data === '[DONE]') {
                continue;
              }

              try {
                const parsed = JSON.parse(data);
                const content = parsed.content;
                
                if (content) {
                  assistantContent += content;
                  
                  // Update the assistant message
                  updateMessage(assistantMessageId, assistantContent);
                }
              } catch (error) {
                console.warn('Failed to parse streaming chunk:', error);
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }

    } catch (error: any) {
      console.error('Chat error:', error);
      
      if (error.name !== 'AbortError') {
        // Add error message
        addMessage({
          role: 'assistant',
          content: `Sorry, there was an error: ${error.message}`,
          conversationId: conversationId!,
        });
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const attachmentOptions = [
    { icon: ImageIcon, label: 'Image', accept: 'image/*', color: 'text-blue-500' },
    { icon: FileText, label: 'Document', accept: '.pdf,.doc,.docx,.txt', color: 'text-green-500' },
    { icon: Code, label: 'Code', accept: '.js,.ts,.py,.html,.css', color: 'text-purple-500' },
    { icon: Video, label: 'Video', accept: 'video/*', color: 'text-red-500' },
    { icon: Music, label: 'Audio', accept: 'audio/*', color: 'text-yellow-500' },
    { icon: Archive, label: 'Archive', accept: '.zip,.rar,.7z', color: 'text-gray-500' },
  ];

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display">
              {activeConversation?.title || 'New Chat'}
            </h1>
            <div className="flex items-center gap-2 mt-1 font-body">
              <span className="text-sm text-muted-foreground font-medium">
                {activeConversation?.messages.length || 0} messages
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground capitalize font-medium">
                {currentProvider} - {currentModel}
              </span>
            </div>
          </div>
          
          <ProviderSelector />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <MessageList />
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        {/* File Attachments */}
        {attachedFiles.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {attachedFiles.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2"
                >
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium truncate max-w-32">
                    {file.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="h-4 w-4 p-0 hover:bg-destructive/20"
                  >
                    ×
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Neumorphic variant="inset" className="p-4 bg-muted/30">
            <div className="flex gap-3 items-end">
              {/* Attachment Options */}
              <div className="flex items-center gap-1">
                <TooltipProvider>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-accent"
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      {attachmentOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.label}
                          onClick={() => {
                            if (fileInputRef.current) {
                              fileInputRef.current.accept = option.accept;
                              fileInputRef.current.click();
                            }
                          }}
                          className="flex items-center gap-3"
                        >
                          <option.icon className={`h-4 w-4 ${option.color}`} />
                          <span>{option.label}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-accent"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Take Photo</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-accent"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Emoji</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isStreaming 
                    ? "AI is responding..." 
                    : "Type your message here. Press Ctrl+Enter to insert a line break..."
                }
                disabled={isStreaming}
                className="flex-1 min-h-[60px] max-h-[200px] resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none font-body"
                rows={1}
              />
              
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-accent"
                      >
                        <Mic className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Voice Message</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {isStreaming ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={handleStop}
                    className="h-8 w-8 p-0"
                  >
                    <Square className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!input.trim()}
                    className="h-8 w-8 p-0 bg-[#007AFF] hover:bg-[#007AFF]/90 disabled:bg-muted"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </Neumorphic>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex items-center justify-between text-xs text-muted-foreground font-body">
            <span>
              Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Enter</kbd> to send, 
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs ml-1">Shift+Enter</kbd> for new line
            </span>
            
            {isStreaming && (
              <div className="flex items-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>AI is thinking...</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}