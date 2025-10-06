import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Playfair Display', 'Times New Roman', 'serif'],
        'heading': ['Playfair Display', 'Times New Roman', 'serif'],
        'body': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'elegant': ['Crimson Text', 'Times New Roman', 'serif'],
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'serif': ['Playfair Display', 'Times New Roman', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        // Neumorphic shadows for light theme
        'neu-raised': '8px 8px 16px rgba(163, 177, 198, 0.6), -8px -8px 16px rgba(255, 255, 255, 0.5)',
        'neu-raised-low': '4px 4px 8px rgba(163, 177, 198, 0.4), -4px -4px 8px rgba(255, 255, 255, 0.3)',
        'neu-raised-high': '12px 12px 24px rgba(163, 177, 198, 0.8), -12px -12px 24px rgba(255, 255, 255, 0.7)',
        'neu-inset': 'inset 8px 8px 16px rgba(163, 177, 198, 0.6), inset -8px -8px 16px rgba(255, 255, 255, 0.5)',
        'neu-inset-low': 'inset 4px 4px 8px rgba(163, 177, 198, 0.4), inset -4px -4px 8px rgba(255, 255, 255, 0.3)',
        'neu-inset-high': 'inset 12px 12px 24px rgba(163, 177, 198, 0.8), inset -12px -12px 24px rgba(255, 255, 255, 0.7)',
        'neu-flat': '4px 4px 8px rgba(163, 177, 198, 0.3), -4px -4px 8px rgba(255, 255, 255, 0.2)',
        'neu-flat-low': '2px 2px 4px rgba(163, 177, 198, 0.2), -2px -2px 4px rgba(255, 255, 255, 0.1)',
        'neu-flat-high': '6px 6px 12px rgba(163, 177, 198, 0.4), -6px -6px 12px rgba(255, 255, 255, 0.3)',
        
        // Neumorphic shadows for dark theme
        'neu-raised-dark': '8px 8px 16px rgba(0, 0, 0, 0.5), -8px -8px 16px rgba(40, 40, 40, 0.8)',
        'neu-raised-dark-low': '4px 4px 8px rgba(0, 0, 0, 0.3), -4px -4px 8px rgba(40, 40, 40, 0.5)',
        'neu-raised-dark-high': '12px 12px 24px rgba(0, 0, 0, 0.7), -12px -12px 24px rgba(40, 40, 40, 1)',
        'neu-inset-dark': 'inset 8px 8px 16px rgba(0, 0, 0, 0.5), inset -8px -8px 16px rgba(40, 40, 40, 0.8)',
        'neu-inset-dark-low': 'inset 4px 4px 8px rgba(0, 0, 0, 0.3), inset -4px -4px 8px rgba(40, 40, 40, 0.5)',
        'neu-inset-dark-high': 'inset 12px 12px 24px rgba(0, 0, 0, 0.7), inset -12px -12px 24px rgba(40, 40, 40, 1)',
        'neu-flat-dark': '4px 4px 8px rgba(0, 0, 0, 0.4), -4px -4px 8px rgba(40, 40, 40, 0.6)',
        'neu-flat-dark-low': '2px 2px 4px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(40, 40, 40, 0.3)',
        'neu-flat-dark-high': '6px 6px 12px rgba(0, 0, 0, 0.6), -6px -6px 12px rgba(40, 40, 40, 0.8)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;