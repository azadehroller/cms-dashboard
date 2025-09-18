/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        gold: {
          100: '#fef3c7',
          200: '#fde68a',
          800: '#92400e',
        },
        silver: {
          100: '#f3f4f6',
          200: '#e5e7eb',
          800: '#6b7280',
        },
        bronze: {
          100: '#fed7aa',
          200: '#fdba74',
          800: '#92400e',
        },
      },
    },
  },
  plugins: [],
}