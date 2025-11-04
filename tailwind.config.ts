import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e85102",
        "primary-dark": "#d64602",
        "background-main": "#000000",
        "background-sidebar": "#0b0b0b",
        "background-card": "#111111",
        "background-hover": "#1a1a1a",
        border: "#1c1b20",
        "border-light": "#202020",
        "text-primary": "#ffffff",
        "text-secondary": "#eaeaea",
        "text-muted": "#767676",
        success: "#2fd77b",
        error: "#ff4757",
      },
      spacing: {
        'sidebar': '54px',
        'header': '50px',
      },
      width: {
        'sidebar': '54px',
      },
      height: {
        'header': '50px',
      },
      margin: {
        'sidebar': '54px',
        'header': '50px',
      },
      inset: {
        'sidebar': '54px',
        'header': '50px',
      },
      zIndex: {
        '30': '30',
        '40': '40',
        '50': '50',
      },
      boxShadow: {
        'dropdown': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'glow-primary': '0 0 14.4px rgba(232, 81, 2, 1)',
        'inner-glow': 'inset 0px -2px 3px rgba(232, 81, 2, 1)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to bottom, transparent, rgba(232, 81, 2, 0.75))',
        'gradient-separator': 'linear-gradient(to right, #0b0b0b, #e85102, #0b0b0b)',
      },
      animation: {
        'spin': 'spin 1s linear infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontSize: {
        'xs': ['11px', { lineHeight: '1.25' }],
        'sm': ['14px', { lineHeight: '1.25' }],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      transitionDuration: {
        '200': '200ms',
      },
      opacity: {
        '50': '0.5',
      },
    },
  },
  plugins: [],
};

export default config;
