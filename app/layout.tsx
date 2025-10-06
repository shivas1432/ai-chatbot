import './globals.css';
import type { Metadata } from 'next';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'AI Buddy - Your Intelligent Chat Companion',
  description: 'Multi-provider AI chat application with OpenAI, Anthropic, Google, and more. Built with Next.js 14, TypeScript, and Tailwind CSS.',
  keywords: ['AI', 'Chat', 'GPT', 'Claude', 'Gemini', 'OpenAI', 'Anthropic', 'Google'],
  authors: [{ name: 'Kanugula Shivashanker' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  themeColor: '#007AFF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#007AFF" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AI Buddy" />
      </head>
      <body suppressHydrationWarning>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}