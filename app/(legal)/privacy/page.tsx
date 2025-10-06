'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, Database, Cookie, Mail, Phone } from 'lucide-react';
import { Neumorphic } from '@/components/ui/neumorphic';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-[#007AFF] rounded-xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground text-lg">
              Last updated: January 2025
            </p>
          </div>

          {/* Content */}
          <Neumorphic className="p-8 bg-card">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                <Eye className="w-6 h-6 text-[#007AFF]" />
                Information We Collect
              </h2>
              
              <h3>Personal Information</h3>
              <ul>
                <li><strong>Account Information:</strong> When you sign up with Google OAuth, we collect your name, email address, and profile picture.</li>
                <li><strong>Guest Access:</strong> Guest users don't provide personal information, but usage is limited.</li>
                <li><strong>Chat Data:</strong> Your conversations with AI assistants are stored locally in your browser and optionally in our secure database.</li>
              </ul>

              <h3>Technical Information</h3>
              <ul>
                <li><strong>Usage Analytics:</strong> We collect anonymous usage statistics to improve our service.</li>
                <li><strong>Device Information:</strong> Browser type, operating system, and device characteristics.</li>
                <li><strong>Log Data:</strong> IP addresses, access times, and error logs for security and debugging.</li>
              </ul>

              <h2 className="flex items-center gap-3 text-2xl font-bold mb-4 mt-8">
                <Database className="w-6 h-6 text-[#007AFF]" />
                How We Use Your Information
              </h2>
              
              <ul>
                <li><strong>Service Provision:</strong> To provide and maintain AI Buddy's chat functionality.</li>
                <li><strong>Personalization:</strong> To customize your experience and remember your preferences.</li>
                <li><strong>Communication:</strong> To send important updates about the service (with your consent).</li>
                <li><strong>Security:</strong> To protect against fraud, abuse, and security threats.</li>
                <li><strong>Improvement:</strong> To analyze usage patterns and improve our AI models and features.</li>
              </ul>

              <h2 className="flex items-center gap-3 text-2xl font-bold mb-4 mt-8">
                <Cookie className="w-6 h-6 text-[#007AFF]" />
                Data Storage & Security
              </h2>
              
              <h3>API Keys</h3>
              <p>
                Your AI provider API keys are stored securely in your browser's local storage and are never transmitted to our servers. 
                They are used exclusively for direct communication with AI providers (OpenAI, Anthropic, Google, etc.).
              </p>

              <h3>Chat History</h3>
              <p>
                Conversations are stored both locally in your browser and in our encrypted database. You can export or delete 
                your data at any time through the Settings panel.
              </p>

              <h3>Security Measures</h3>
              <ul>
                <li>End-to-end encryption for sensitive data</li>
                <li>Regular security audits and updates</li>
                <li>Secure HTTPS connections for all communications</li>
                <li>Limited data retention policies</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 mt-8">Third-Party Services</h2>
              
              <h3>AI Providers</h3>
              <p>
                When you use AI features, your messages are sent directly to the selected AI provider (OpenAI, Anthropic, Google, etc.) 
                using your own API keys. Please review their respective privacy policies:
              </p>
              <ul>
                <li><a href="https://openai.com/privacy/" target="_blank" rel="noopener noreferrer">OpenAI Privacy Policy</a></li>
                <li><a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer">Anthropic Privacy Policy</a></li>
                <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
              </ul>

              <h3>Authentication</h3>
              <p>
                We use Google OAuth for authentication. Google's privacy policy applies to information collected during sign-in.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">Your Rights</h2>
              
              <ul>
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct your information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from communications</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 mt-8">Contact Information</h2>
              
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="mb-4">For privacy-related questions or requests, contact:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Email: shivas1432@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Telegram: @helpme_coder</span>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 mt-8">Changes to This Policy</h2>
              
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date.
              </p>

              <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                <p>© 2025 AI Buddy. Built by Kanugula Shivashanker.</p>
                <p>Full-Stack Developer | React, Node.js, Express, MySQL</p>
              </div>
            </div>
          </Neumorphic>
        </motion.div>
      </div>
    </div>
  );
}