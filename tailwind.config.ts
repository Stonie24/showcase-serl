import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(-60px)' },
          '100%': { transform: 'translateX(200px)' },
        },
      },
      animation: {
        slide: 'slide 2s ease-in-out infinite alternate',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      
    },
  },
  plugins: [],
}
export default config
