import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
        },
        success: {
          DEFAULT: "var(--success)",
          '10': 'rgba(34, 197, 94, 0.1)',  // 薄い緑
          '20': 'rgba(34, 197, 94, 0.2)',
          '90': 'rgba(34, 197, 94, 0.9)',
        },
        error: {
          DEFAULT: "var(--error)",
          '10': 'rgba(239, 68, 68, 0.1)',  // 薄い赤
          '20': 'rgba(239, 68, 68, 0.2)',
          '90': 'rgba(239, 68, 68, 0.9)',
        },
      },
      keyframes: {
        tada: {
          '0%': { transform: 'scale(1)' },
          '10%, 20%': { transform: 'scale(0.9) rotate(-3deg)' },
          '30%, 50%, 70%, 90%': { transform: 'scale(1.1) rotate(3deg)' },
          '40%, 60%, 80%': { transform: 'scale(1.1) rotate(-3deg)' },
          '100%': { transform: 'scale(1) rotate(0)' }
        },
        fadeInOut: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'tada': 'tada 1s ease-in-out',
        'fade-in-permanent': 'fadeInOut 0.5s ease-out forwards'
      },
      boxShadow: {
        'quiz': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
} satisfies Config;
