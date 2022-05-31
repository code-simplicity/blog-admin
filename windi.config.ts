import { defineConfig } from 'windicss/helpers';
import formsPlugin from 'windicss/plugin/forms';
import colors from 'windicss/colors';

export default defineConfig({
  darkMode: 'class',
  safelist: 'p-3 p-4 p-5',
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      colors: {
        blue: colors.sky,
        red: colors.rose,
        pink: colors.fuchsia,
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [formsPlugin],
});
