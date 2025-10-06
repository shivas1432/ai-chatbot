'use client';

import { useChatStore } from '@/stores/chatStore';
import { providers } from '@/lib/providers';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function ProviderSelector() {
  const { 
    currentProvider, 
    currentModel, 
    setProvider, 
    setModel 
  } = useChatStore();

  const currentProviderData = providers[currentProvider];
  const availableModels = currentProviderData?.models || [];

  const handleProviderChange = (providerId: string) => {
    setProvider(providerId);
    
    // Set default model for the new provider
    const newProvider = providers[providerId];
    if (newProvider?.models.length > 0) {
      setModel(newProvider.models[0].id);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col gap-2">
        <Select value={currentProvider} onValueChange={handleProviderChange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(providers).map(([id, provider]) => (
              <SelectItem 
                key={id} 
                value={id}
                disabled={!provider.enabled}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    provider.enabled ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                  {provider.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={currentModel} onValueChange={setModel}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableModels.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                <div className="flex flex-col">
                  <span>{model.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {model.contextLength.toLocaleString()} tokens
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}