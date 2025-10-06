import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  conversationId: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  provider: string;
  model: string;
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  sidebarOpen: boolean;
  settingsOpen: boolean;
  isStreaming: boolean;
  currentProvider: string;
  currentModel: string;
  
  // Actions
  setActiveConversation: (id: string | null) => void;
  createConversation: () => string;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateMessage: (id: string, content: string) => void;
  deleteMessage: (id: string) => void;
  deleteConversation: (id: string) => void;
  updateConversationTitle: (id: string, title: string) => void;
  togglePin: (id: string) => void;
  setSidebarOpen: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
  setStreaming: (streaming: boolean) => void;
  setProvider: (provider: string) => void;
  setModel: (model: string) => void;
  clearAllConversations: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeConversationId: null,
      sidebarOpen: true,
      settingsOpen: false,
      isStreaming: false,
      currentProvider: 'openai',
      currentModel: 'gpt-3.5-turbo',

      setActiveConversation: (id) =>
        set({ activeConversationId: id }),

      createConversation: () => {
        const id = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newConversation: Conversation = {
          id,
          title: 'New Chat',
          messages: [],
          provider: get().currentProvider,
          model: get().currentModel,
          pinned: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set((state) => ({
          conversations: [newConversation, ...state.conversations],
          activeConversationId: id,
        }));
        
        return id;
      },

      addMessage: (messageData) => {
        const message: Message = {
          ...messageData,
          id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date(),
        };

        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === message.conversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, message],
                  updatedAt: new Date(),
                  title: conv.messages.length === 0 && message.role === 'user'
                    ? message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '')
                    : conv.title,
                }
              : conv
          ),
        }));
      },

      updateMessage: (id, content) =>
        set((state) => ({
          conversations: state.conversations.map((conv) => ({
            ...conv,
            messages: conv.messages.map((msg) =>
              msg.id === id ? { ...msg, content } : msg
            ),
          })),
        })),

      deleteMessage: (id) =>
        set((state) => ({
          conversations: state.conversations.map((conv) => ({
            ...conv,
            messages: conv.messages.filter((msg) => msg.id !== id),
          })),
        })),

      deleteConversation: (id) =>
        set((state) => ({
          conversations: state.conversations.filter((conv) => conv.id !== id),
          activeConversationId:
            state.activeConversationId === id ? null : state.activeConversationId,
        })),

      updateConversationTitle: (id, title) =>
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === id ? { ...conv, title } : conv
          ),
        })),

      togglePin: (id) =>
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === id ? { ...conv, pinned: !conv.pinned } : conv
          ),
        })),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setSettingsOpen: (open) => set({ settingsOpen: open }),
      setStreaming: (streaming) => set({ isStreaming: streaming }),
      setProvider: (provider) => set({ currentProvider: provider }),
      setModel: (model) => set({ currentModel: model }),
      
      clearAllConversations: () =>
        set({ conversations: [], activeConversationId: null }),
    }),
    {
      name: 'ai-buddy-chat-storage',
    }
  )
);