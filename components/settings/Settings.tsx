'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';
import { 
  X, 
  Moon, 
  Sun, 
  Monitor, 
  Key, 
  Trash2, 
  Download, 
  User, 
  LogOut,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { useSettingsStore } from '@/stores/settingsStore';
import { useChatStore } from '@/stores/chatStore';
import { providers } from '@/lib/providers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Neumorphic } from '@/components/ui/neumorphic';

interface SettingsProps {
  onClose: () => void;
}

export function Settings({ onClose }: SettingsProps) {
  const {
    theme,
    apiKeys,
    defaultProvider,
    defaultModel,
    setTheme,
    setApiKey,
    removeApiKey,
    setDefaultProvider,
    setDefaultModel,
    clearAllSettings,
  } = useSettingsStore();

  const { clearAllConversations } = useChatStore();
  
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({});
  const [tempApiKeys, setTempApiKeys] = useState(apiKeys);

  const handleSaveApiKeys = () => {
    Object.entries(tempApiKeys).forEach(([provider, key]) => {
      if (key) {
        setApiKey(provider, key);
      }
    });
  };

  const handleToggleApiKeyVisibility = (provider: string) => {
    setShowApiKeys(prev => ({ ...prev, [provider]: !prev[provider] }));
  };

  const handleExportData = () => {
    // This would export all user data
    const data = {
      settings: { theme, defaultProvider, defaultModel },
      conversations: [], // Would include conversations from store
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-buddy-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-xl font-bold">Settings</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="providers">AI Providers</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            {/* Theme */}
            <Neumorphic className="p-4">
              <h3 className="font-semibold mb-4">Appearance</h3>
              <div className="space-y-4">
                <div>
                  <Label>Theme</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4" />
                          Light
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="h-4 w-4" />
                          Dark
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center gap-2">
                          <Monitor className="h-4 w-4" />
                          System
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Neumorphic>

            {/* Default AI Settings */}
            <Neumorphic className="p-4">
              <h3 className="font-semibold mb-4">Default AI Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label>Default Provider</Label>
                  <Select value={defaultProvider} onValueChange={setDefaultProvider}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(providers).map(([id, provider]) => (
                        <SelectItem key={id} value={id} disabled={!provider.enabled}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Default Model</Label>
                  <Select value={defaultModel} onValueChange={setDefaultModel}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {providers[defaultProvider]?.models.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Neumorphic>
          </TabsContent>

          <TabsContent value="providers" className="space-y-6">
            <Neumorphic className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">API Keys</h3>
                <Button onClick={handleSaveApiKeys} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save Keys
                </Button>
              </div>

              <div className="space-y-4">
  {Object.entries(providers).map(([providerId, provider]) => {
    const key = providerId as keyof typeof apiKeys; // ✅ Type-safe key

    return (
      <div key={providerId}>
        <Label className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              provider.enabled && apiKeys[key] ? 'bg-green-500' : 'bg-gray-400'
            }`}
          />
          {provider.name} API Key
        </Label>

        <div className="flex gap-2 mt-2">
          <Input
            type={showApiKeys[key] ? 'text' : 'password'}
            placeholder={`Enter ${provider.name} API key`}
            value={tempApiKeys[key] || ''}
            onChange={(e) =>
              setTempApiKeys((prev) => ({ ...prev, [key]: e.target.value }))
            }
          />

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleToggleApiKeyVisibility(key)}
          >
            {showApiKeys[key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => removeApiKey(key)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  })}
</div>


              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Security Notice</h4>
                <p className="text-sm text-muted-foreground">
                  API keys are stored securely in your browser's local storage and are never sent to our servers. 
                  They are only used to make direct API calls to the respective AI providers.
                </p>
              </div>
            </Neumorphic>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            {/* Profile */}
            <Neumorphic className="p-4">
              <h3 className="font-semibold mb-4">Profile</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#007AFF] rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-medium">Guest User</p>
                  <p className="text-sm text-muted-foreground">guest@aibuddy.com</p>
                </div>
              </div>
            </Neumorphic>

            {/* Data Management */}
            <Neumorphic className="p-4">
              <h3 className="font-semibold mb-4">Data Management</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Export Data</p>
                    <p className="text-sm text-muted-foreground">
                      Download all your conversations and settings
                    </p>
                  </div>
                  <Button onClick={handleExportData} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Clear All Conversations</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete all chat history
                    </p>
                  </div>
                  <Button 
                    onClick={clearAllConversations} 
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Reset Settings</p>
                    <p className="text-sm text-muted-foreground">
                      Reset all settings to default values
                    </p>
                  </div>
                  <Button 
                    onClick={clearAllSettings} 
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </Neumorphic>

            {/* Sign Out */}
            <Neumorphic className="p-4">
              <h3 className="font-semibold mb-4">Session</h3>
              <Button 
                onClick={() => signOut({ callbackUrl: '/login' })} 
                variant="outline" 
                className="w-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </Neumorphic>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-center text-xs text-muted-foreground space-y-1">
          <div className="font-medium">AI Buddy v1.0.0</div>
          <div>Built by Kanugula Shivashanker</div>
          <div className="flex items-center justify-center gap-2 text-xs">
            <span>Full-Stack Developer</span>
            <span>•</span>
            <span>React, Node.js, MySQL</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs">
            <span>GitHub: ss_web_innovations</span>
            <span>•</span>
            <span>Telegram: @helpme_coder</span>
          </div>
          <div className="text-xs mt-1">
            <a href="https://shivashanker.com" target="_blank" rel="noopener noreferrer" 
               className="text-[#007AFF] hover:underline">
              shivashanker.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}