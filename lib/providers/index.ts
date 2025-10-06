import { openaiProvider, streamOpenAI } from './openai';
import { anthropicProvider, streamAnthropic } from './anthropic';
import { AIProvider, ChatRequest } from './types';

export const providers: Record<string, AIProvider> = {
  openai: openaiProvider,
  anthropic: anthropicProvider,
  // Additional providers can be added here
  google: {
    id: 'google',
    name: 'Google',
    enabled: true,
    requiresApiKey: true,
    models: [
      {
        id: 'gemini-1.5-pro',
        name: 'Gemini 1.5 Pro',
        contextLength: 1000000,
      },
      {
        id: 'gemini-1.5-flash',
        name: 'Gemini 1.5 Flash',
        contextLength: 1000000,
      },
    ],
  },
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    enabled: true,
    requiresApiKey: true,
    models: [
      {
        id: 'deepseek-chat',
        name: 'DeepSeek Chat',
        contextLength: 4096,
      },
      {
        id: 'deepseek-coder',
        name: 'DeepSeek Coder',
        contextLength: 4096,
      },
    ],
  },
  groq: {
    id: 'groq',
    name: 'Groq',
    enabled: true,
    requiresApiKey: true,
    models: [
      {
        id: 'llama3-70b-8192',
        name: 'Llama 3 70B',
        contextLength: 8192,
      },
      {
        id: 'mixtral-8x7b-32768',
        name: 'Mixtral 8x7B',
        contextLength: 32768,
      },
    ],
  },
};

export async function* streamChat(request: ChatRequest, apiKey: string) {
  switch (request.provider) {
    case 'openai':
      yield* streamOpenAI(request, apiKey);
      break;
    case 'anthropic':
      yield* streamAnthropic(request, apiKey);
      break;
    default:
      throw new Error(`Provider ${request.provider} not implemented`);
  }
}

export { openaiProvider, anthropicProvider };
export * from './types';