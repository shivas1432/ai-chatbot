'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Neumorphic } from '@/components/ui/neumorphic';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [guestCredentials, setGuestCredentials] = useState({
    username: '',
    password: '',
  });

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error('Google sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('guest', {
        username: guestCredentials.username,
        password: guestCredentials.password,
        redirect: false,
      });

      if (result?.ok) {
        router.push('/');
      } else {
        alert('Invalid guest credentials');
      }
    } catch (error) {
      console.error('Guest sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Neumorphic className="p-8 bg-card">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#007AFF] rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Welcome to AI Buddy</h1>
            <p className="text-muted-foreground mt-2">
              Your intelligent chat companion
            </p>
          </div>

          {/* Google Sign In */}
          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full mb-6 bg-white hover:bg-gray-50 text-black border border-gray-300"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <div className="relative mb-6">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-card px-4 text-muted-foreground text-sm">
                Or try guest access
              </span>
            </div>
          </div>

          {/* Guest Login */}
          <form onSubmit={handleGuestSignIn} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="guest_demo"
                value={guestCredentials.username}
                onChange={(e) =>
                  setGuestCredentials(prev => ({ ...prev, username: e.target.value }))
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="aibuddy2024"
                value={guestCredentials.password}
                onChange={(e) =>
                  setGuestCredentials(prev => ({ ...prev, password: e.target.value }))
                }
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#007AFF] hover:bg-[#007AFF]/90"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign in as Guest
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h3 className="font-medium mb-2">Demo Credentials:</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>Username: <code>guest_demo</code></div>
              <div>Password: <code>aibuddy2024</code></div>
            </div>
            <p className="text-xs mt-2 text-muted-foreground">
              Guest accounts have limited features (5 conversations, 50 messages)
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p className="mb-2">Built by Kanugula Shivashanker</p>
            <div className="space-x-2">
              <span>Full-Stack Developer</span>
              <span>•</span>
              <span>React, Node.js, Express, MySQL</span>
            </div>
            <div className="mt-2 space-x-2">
              <span>Contact: shivas1432</span>
              <span>•</span>
              <span>GitHub: ss_web_innovations</span>
            </div>
          </div>
        </Neumorphic>
      </motion.div>
    </div>
  );
}