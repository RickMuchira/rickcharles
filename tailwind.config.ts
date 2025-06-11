import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        zentry: ['zentry', 'sans-serif'],
        general: ['general', 'sans-serif'],
        circular: ['circular-web', 'sans-serif'],
        robertMedium: ['robert-medium', 'sans-serif'],
        robertRegular: ['robert-regular', 'sans-serif'],
        generalSans: ['"General Sans"', 'sans-serif'], // optional if using CDN
      },
      colors: {
        blue: {
          50: '#DFDFF0',
          75: '#dfdff2',
          100: '#F0F2FA',
          200: '#010101',
          300: '#4FB7DD',
        },
        violet: {
          300: '#5724ff',
        },
        yellow: {
          100: '#8e983f',
          300: '#edff66',
        },
      },
    },
  },
  plugins: [],
}

export default config
