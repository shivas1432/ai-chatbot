import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface APIKeys {
  openai?: string;
  anthropic?: string;
  google?: string;
  deepseek?: string;
  groq?: string;
  mistral?: string;
  cohere?: string;
}

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  apiKeys: APIKeys;
  defaultProvider: string;
  defaultModel: string;
  
  // Actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setApiKey: (provider: string, key: string) => void;
  removeApiKey: (provider: string) => void;
  setDefaultProvider: (provider: string) => void;
  setDefaultModel: (model: string) => void;
  clearAllSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      apiKeys: {},
      defaultProvider: 'openai',
      defaultModel: 'gpt-3.5-turbo',

      setTheme: (theme) => set({ theme }),
      
      setApiKey: (provider, key) =>
        set((state) => ({
          apiKeys: { ...state.apiKeys, [provider]: key },
        })),
      
      removeApiKey: (provider) =>
        set((state) => {
          const newKeys = { ...state.apiKeys };
          delete newKeys[provider as keyof APIKeys];
          return { apiKeys: newKeys };
        }),
      
      setDefaultProvider: (provider) => set({ defaultProvider: provider }),
      setDefaultModel: (model) => set({ defaultModel: model }),
      
      clearAllSettings: () =>
        set({
          theme: 'system',
          apiKeys: {},
          defaultProvider: 'openai',
          defaultModel: 'gpt-3.5-turbo',
        }),
    }),
    {
      name: 'ai-buddy-settings-storage',
    }
  )
);