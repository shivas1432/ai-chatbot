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
      let assistantMessageId = '';
      let messageCreated = false;

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
                  
                  // Create assistant message only when we have actual content
                  if (!messageCreated) {
                    // Add the message without specifying ID (let the store generate it)
                    addMessage({
                      role: 'assistant',
                      content: assistantContent,
                      conversationId,
                    });
                    messageCreated = true;
                    
                    // Get the ID of the message we just created by finding the latest assistant message
                    const updatedConversation = conversations.find(c => c.id === conversationId);
                    if (updatedConversation) {
                      const assistantMessages = updatedConversation.messages.filter(m => m.role === 'assistant');
                      if (assistantMessages.length > 0) {
                        assistantMessageId = assistantMessages[assistantMessages.length - 1].id;
                      }
                    }
                  } else if (assistantMessageId) {
                    // Update the existing message
                    updateMessage(assistantMessageId, assistantContent);
                  }
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
      {/* Header - Mobile Optimized */}
      <div className="border-b border-border p-3 sm:p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-2xl font-display font-semibold truncate">
              {activeConversation?.title || 'New Chat'}
            </h1>
            <div className="flex items-center gap-2 mt-0.5 sm:mt-1 font-body">
              <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                {activeConversation?.messages.length || 0} messages
              </span>
              <span className="text-xs text-muted-foreground hidden sm:inline">•</span>
              <span className="text-xs sm:text-sm text-muted-foreground capitalize font-medium truncate">
                <span className="hidden sm:inline">{currentProvider} - </span>
                {currentModel}
              </span>
            </div>
          </div>
          
          <div className="ml-3 flex-shrink-0">
            <ProviderSelector />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <MessageList />
      </div>

      {/* Input Area - Mobile Optimized */}
      <div className="border-t border-border p-3 sm:p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* File Attachments */}
        {attachedFiles.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {attachedFiles.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 bg-muted/50 rounded-lg px-2.5 py-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium truncate max-w-24 sm:max-w-32">
                    {file.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="h-3.5 w-3.5 p-0 hover:bg-destructive/20"
                  >
                    ×
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <Neumorphic variant="inset" className="p-3 sm:p-4 bg-muted/30">
            <div className="flex gap-2 sm:gap-3 items-end">
              {/* Attachment Options - Mobile Optimized */}
              <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
                <TooltipProvider>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 sm:h-9 sm:w-9 p-0 hover:bg-accent"
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-44 sm:w-48">
                      {attachmentOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.label}
                          onClick={() => {
                            if (fileInputRef.current) {
                              fileInputRef.current.accept = option.accept;
                              fileInputRef.current.click();
                            }
                          }}
                          className="flex items-center gap-3 text-sm"
                        >
                          <option.icon className={`h-4 w-4 ${option.color}`} />
                          <span>{option.label}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Camera button - hide on very small screens */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 sm:h-9 sm:w-9 p-0 hover:bg-accent hidden xs:flex"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Take Photo</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Emoji button - hide on small screens */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 sm:h-9 sm:w-9 p-0 hover:bg-accent hidden sm:flex"
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
                    : "Type your message..."
                }
                disabled={isStreaming}
                className="flex-1 min-h-[44px] max-h-[120px] sm:min-h-[60px] sm:max-h-[200px] resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none font-body text-sm sm:text-base leading-relaxed"
                rows={1}
              />
              
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                {/* Voice button - hide on very small screens */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 sm:h-9 sm:w-9 p-0 hover:bg-accent hidden xs:flex"
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
                    className="h-9 w-9 sm:h-10 sm:w-10 p-0 flex-shrink-0"
                  >
                    <Square className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!input.trim()}
                    className="h-9 w-9 sm:h-10 sm:w-10 p-0 bg-[#007AFF] hover:bg-[#007AFF]/90 disabled:bg-muted flex-shrink-0"
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

          {/* Help text - responsive */}
          <div className="flex items-center justify-between text-xs text-muted-foreground font-body">
            <span className="hidden sm:block">
              Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Enter</kbd> to send, 
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs ml-1">Shift+Enter</kbd> for new line
            </span>
            <span className="sm:hidden text-xs">
              Tap send to submit
            </span>
            
            {isStreaming && (
              <div className="flex items-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span className="text-xs">AI is thinking...</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}