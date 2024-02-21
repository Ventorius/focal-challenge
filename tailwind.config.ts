import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-purple-500',
    'bg-indigo-500',
    'bg-gray-500',
    'bg-orange-500',
    'bg-teal-500',
    'bg-zinc-500',
    'border-red-500',
    'border-green-500',
    'border-blue-500',
    'border-yellow-500',
    'border-pink-500',
    'border-purple-500',
    'border-indigo-500',
    'border-gray-500',
    'border-orange-500',
    'border-teal-500',
    'border-zinc-500',
  ],
};
export default config;
