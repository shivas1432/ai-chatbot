'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  TriangleAlert as AlertTriangle,
  Users,
  CreditCard,
  Shield,
} from 'lucide-react';
import { Neumorphic } from '@/components/ui/neumorphic';

export default function TermsOfServicePage() {
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
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground text-lg">
              Last updated: January 2025
            </p>
          </div>

          {/* Content */}
          <Neumorphic className="p-8 bg-card">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2 className="text-2xl font-bold mb-4">
                1. Acceptance of Terms
              </h2>

              <p>
                By accessing and using AI Buddy ("the Service"), you accept and
                agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use
                this service.
              </p>

              <h2 className="flex items-center gap-3 text-2xl font-bold mb-4 mt-8">
                <Users className="w-6 h-6 text-[#007AFF]" />
                2. Use License
              </h2>

              <h3>Permitted Use</h3>
              <ul>
                <li>
                  Personal and commercial use of AI Buddy for legitimate
                  purposes
                </li>
                <li>Creating and managing AI conversations</li>
                <li>Using multiple AI providers through your own API keys</li>
                <li>Exporting your data and conversations</li>
              </ul>

              <h3>Prohibited Use</h3>
              <ul>
                <li>Attempting to reverse engineer or copy the service</li>
                <li>Using the service for illegal activities</li>
                <li>Generating harmful, offensive, or inappropriate content</li>
                <li>Attempting to bypass rate limits or security measures</li>
                <li>Sharing or reselling your account access</li>
              </ul>

              <h2 className="flex items-center gap-3 text-2xl font-bold mb-4 mt-8">
                <CreditCard className="w-6 h-6 text-[#007AFF]" />
                3. API Keys and Costs
              </h2>

              <p>AI Buddy is free to use, but you are responsible for:</p>
              <ul>
                <li>
                  <strong>API Costs:</strong> All costs associated with your AI
                  provider API usage (OpenAI, Anthropic, Google, etc.)
                </li>
                <li>
                  <strong>API Key Security:</strong> Keeping your API keys
                  secure and not sharing them
                </li>
                <li>
                  <strong>Usage Monitoring:</strong> Monitoring your API usage
                  to avoid unexpected charges
                </li>
                <li>
                  <strong>Rate Limits:</strong> Respecting the rate limits of
                  your chosen AI providers
                </li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 mt-8">4. Account Types</h2>

              <h3>Google OAuth Accounts</h3>
              <ul>
                <li>Full access to all features</li>
                <li>Unlimited conversations and messages</li>
                <li>Data synchronization across devices</li>
                <li>Priority support</li>
              </ul>

              <h3>Guest Accounts</h3>
              <ul>
                <li>Limited to 5 conversations</li>
                <li>Maximum 50 messages per session</li>
                <li>No data synchronization</li>
                <li>Basic support only</li>
              </ul>

              <h2 className="flex items-center gap-3 text-2xl font-bold mb-4 mt-8">
                <AlertTriangle className="w-6 h-6 text-[#007AFF]" />
                5. Disclaimer
              </h2>

              <p>
                The information on this service is provided on an "as is" basis.
                To the fullest extent permitted by law, this Company:
              </p>
              <ul>
                <li>
                  Excludes all representations and warranties relating to this
                  service and its contents
                </li>
                <li>
                  Does not guarantee the accuracy of AI-generated responses
                </li>
                <li>
                  Is not responsible for decisions made based on AI
                  recommendations
                </li>
                <li>
                  Does not warrant that the service will be uninterrupted or
                  error-free
                </li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 mt-8">
                6. Data and Privacy
              </h2>

              <ul>
                <li>Your conversations may be stored for service improvement</li>
                <li>
                  API keys are stored locally and never transmitted to our
                  servers
                </li>
                <li>
                  You can delete your data at any time through Settings
                </li>
                <li>We comply with applicable data protection regulations</li>
              </ul>

              <h2 className="flex items-center gap-3 text-2xl font-bold mb-4 mt-8">
                <Shield className="w-6 h-6 text-[#007AFF]" />
                7. Limitation of Liability
              </h2>

              <p>
                In no event shall AI Buddy or its suppliers be liable for any
                damages (including, without limitation, damages for loss of data
                or profit, or due to business interruption) arising out of the
                use or inability to use the service, even if AI Buddy or its
                authorized representative has been notified orally or in writing
                of the possibility of such damage.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">
                8. Accuracy of Materials
              </h2>

              <p>
                The materials appearing on AI Buddy could include technical,
                typographical, or photographic errors. AI Buddy does not warrant
                that any of the materials on its service are accurate, complete,
                or current. AI Buddy may make changes to the materials contained
                on its service at any time without notice.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">9. Modifications</h2>

              <p>
                AI Buddy may revise these terms of service at any time without
                notice. By using this service, you are agreeing to be bound by
                the then current version of these terms of service.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">
                10. Governing Law
              </h2>

              <p>
                These terms and conditions are governed by and construed in
                accordance with the laws of India, and you irrevocably submit to
                the exclusive jurisdiction of the courts in that state or
                location.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">
                Contact Information
              </h2>

              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="mb-4">
                  For questions about these Terms of Service, contact:
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Developer:</strong> Kanugula Shivashanker
                  </p>
                  <p>
                    <strong>Email:</strong> shivas1432@gmail.com
                  </p>
                  <p>
                    <strong>Telegram:</strong> @helpme_coder
                  </p>
                  <p>
                    <strong>Website:</strong>{' '}
                    <a
                      href="https://shivashanker.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      shivashanker.com
                    </a>
                  </p>
                  <p>
                    <strong>LinkedIn:</strong>{' '}
                    <a
                      href="https://linkedin.com/in/shivashanker-kanugul"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      linkedin.com/in/shivashanker-kanugul
                    </a>
                  </p>
                </div>
              </div>

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
