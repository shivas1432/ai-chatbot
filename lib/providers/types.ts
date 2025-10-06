export interface AIProvider {
  id: string;
  name: string;
  models: AIModel[];
  enabled: boolean;
  baseUrl?: string;
  requiresApiKey: boolean;
}

export interface AIModel {
  id: string;
  name: string;
  contextLength: number;
  inputPrice?: number;
  outputPrice?: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  model: string;
  provider: string;
  stream?: boolean;
}

export interface ChatResponse {
  content: string;
  model: string;
  provider: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}