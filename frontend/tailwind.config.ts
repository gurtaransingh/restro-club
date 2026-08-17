import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#FAF8F3',
        sand: '#EDE6D8',
        borderTan: '#E5DEC9',
        charcoal: '#1E241D',
        warmMuted: '#5C554E',
        luxuryGold: '#8C5A3C',
        luxuryGoldHover: '#73482E',
        oliveGreen: '#3E4A38',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
