/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: 'media',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        mobile: '430px',
      },
      colors: {
        background: '#fdfeff',
        main: '#bb2649',
      },
      fontFamily: {
        texture:
          "'AmericanCaptain', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        bodytext:
          "'Helvetica Neue', Helvetica,Arial, 'Microsoft Yahei', 'Hiragino Sans GB', 'Heiti SC', 'WenQuanYi Micro Hei', sans-serif",
      },
      keyframes: ({ theme }) => ({
        flashBtn: {
          '0%, 20%': { 'background-color': 'transparent', color: theme('colors.main') },
          '10%': { 'background-color': theme('colors.main'), color: 'transparent' },
          '30%': { 'background-color': theme('colors.main'), color: 'transparent', opacity: 0 },
          '100%': { 'background-color': theme('colors.main'), color: '#fff', opacity: 1 },
        },
      }),
      animation: {
        flashBtn: 'flashBtn 280ms ease forwards',
      },
    },
  },
  plugins: [require('@designbycode/tailwindcss-text-stroke'), require('@tailwindcss/typography')],
}
