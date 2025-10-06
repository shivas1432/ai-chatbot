# AI Buddy - Production-Ready AI Chat Application

A comprehensive, production-ready AI chat application built with Next.js 14, featuring multiple AI providers, real-time streaming, and beautiful neumorphic design.

## 🌟 Features

### Core Functionality
- **Multi-AI Provider Support**: OpenAI, Anthropic, Google, DeepSeek, Groq, Mistral, and more
- **Real-time Streaming**: Smooth, responsive AI conversations
- **Conversation Management**: Create, edit, delete, pin, and search conversations
- **Authentication**: Google OAuth + Guest access
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Progressive Web App**: Install and use like a native app

### UI/UX Excellence
- **Neumorphic Design**: Beautiful depth with soft shadows
- **Dark/Light Themes**: System preference detection
- **Smooth Animations**: Framer Motion powered transitions
- **Mobile Optimized**: Touch-friendly interface
- **Accessibility**: WCAG compliant with keyboard navigation

### Coming Soon Features (Interactive Modals)
- 🔒 **Text to Image Studio**: DALL-E 3, Midjourney, Stable Diffusion
- 🔒 **Plugin Marketplace**: Web search, code execution, calculations
- 🔒 **AI Agents Market**: 500+ specialized assistants
- ✅ **Progressive Web App**: Already available
- ✅ **Mobile Adaptation**: Already optimized
- ✅ **Custom Themes**: Dark/Light mode support

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Prisma + MySQL (Aiven)
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Markdown**: React Markdown + Shiki syntax highlighting

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <repository-url>
cd ai-buddy
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
```

Configure your environment variables:
```env
NEXTAUTH_SECRET=your-secret-key-32-chars-minimum
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL="mysql://username:password@hostname:port/database?ssl-mode=REQUIRED"
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GUEST_USERNAME=guest_demo
GUEST_PASSWORD=aibuddy2024
```

### 3. Database Setup
```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🎯 Guest Access

Try the application immediately with these credentials:
- **Username**: `guest_demo`  
- **Password**: `aibuddy2024`

*Guest accounts have limitations: 5 conversations max, 50 messages max*

## 📱 Progressive Web App

Install AI Buddy on any device:
1. Visit the app in your browser
2. Look for "Install" or "Add to Home Screen"
3. Follow your browser's installation prompts
4. Enjoy native app experience!

## 🎨 Design System

### Color Palette
- **Primary**: #007AFF (iOS Blue)
- **Light Theme**: #f5f5f7 background, #ffffff panels
- **Dark Theme**: #0a0a0a background, #1c1c1e panels

### Neumorphic Shadows
- Raised: Convex appearance with outward shadows
- Inset: Concave appearance with inward shadows  
- Flat: Subtle depth for secondary elements

## 🔧 Configuration

### AI Providers

Add your API keys in the Settings panel:

1. **OpenAI**: Get key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Anthropic**: Get key from [Anthropic Console](https://console.anthropic.com/)
3. **Google**: Get key from [AI Studio](https://aistudio.google.com/app/apikey)
4. **Others**: Check respective provider documentation

### Database (Aiven MySQL)

1. Create account at [Aiven.io](https://aiven.io)
2. Create MySQL service
3. Copy connection string to `DATABASE_URL`
4. Run migrations: `npx prisma db push`

## 📂 Project Structure

```
src/
├── app/                   # Next.js 14 App Router
│   ├── (auth)/           # Authentication pages
│   ├── (main)/           # Main application
│   ├── api/              # API routes
│   └── layout.tsx        # Root layout
├── components/           # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── chat/             # Chat interface
│   ├── layout/           # Layout components
│   ├── modals/           # Coming soon modals
│   └── settings/         # Settings panel
├── lib/                  # Utilities and configurations
│   ├── providers/        # AI provider integrations
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Database client
│   └── utils.ts          # Helper functions
├── stores/               # Zustand state management
├── prisma/               # Database schema
└── public/               # Static assets
```

## 🚢 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically

### Manual Build
```bash
npm run build
npm start
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Build test
npm run build
```

## 🔐 Security

- API keys stored in browser localStorage (never sent to our servers)
- CSRF protection via NextAuth.js
- SQL injection protection via Prisma
- Rate limiting on API routes
- Secure headers configuration

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Developer

**Kanugula Shivashanker**
- Full-Stack Developer specializing in React, Node.js, Express, MySQL
- **Contact**: shivas1432
- **GitHub**: ss_web_innovations  
- **Telegram**: @helpme_coder
- **Website**: [shivashanker.com](https://shivashanker.com)
- **LinkedIn**: [linkedin.com/in/shivashanker-kanugul](https://linkedin.com/in/shivashanker-kanugul)

---

**Built with ❤️ using Next.js 14, TypeScript, and modern web technologies**