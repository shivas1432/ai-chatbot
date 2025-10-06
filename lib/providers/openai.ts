import { AIProvider, ChatRequest } from './types';

export const openaiProvider: AIProvider = {
  id: 'openai',
  name: 'OpenAI',
  enabled: true,
  requiresApiKey: true,
  models: [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      contextLength: 8192,
      inputPrice: 0.03,
      outputPrice: 0.06,
    },
    {
      id: 'gpt-4-turbo-preview',
      name: 'GPT-4 Turbo',
      contextLength: 128000,
      inputPrice: 0.01,
      outputPrice: 0.03,
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      contextLength: 4096,
      inputPrice: 0.0015,
      outputPrice: 0.002,
    },
  ],
};

export async function* streamOpenAI(request: ChatRequest, apiKey: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: request.model,
      messages: request.messages,
      stream: true,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

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
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            
            if (content) {
              yield content;
            }
          } catch (error) {
            // Skip invalid JSON
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}