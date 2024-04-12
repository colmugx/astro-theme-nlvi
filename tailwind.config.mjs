/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: 'media',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#fdfeff',
        main: '#bb2649'
      },
      fontFamily: {
        texture: "'AmericanCaptain', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        bodytext: "'Helvetica Neue', Helvetica,Arial, 'Microsoft Yahei', 'Hiragino Sans GB', 'Heiti SC', 'WenQuanYi Micro Hei', sans-serif"
      }
    },
  },
  plugins: [
    require('@designbycode/tailwindcss-text-stroke'),
    require('@tailwindcss/typography'),
  ],
}
