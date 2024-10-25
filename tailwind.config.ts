import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import flyonui from 'flyonui';
import flyonuiPlugin from 'flyonui/plugin';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}','./node_modules/flyonui/dist/js/*.js'],

  theme: {
    extend: {}
  },
  plugins: [
    typography, 
    forms, 
    containerQueries, 
    aspectRatio, 
    flyonui, 
    flyonuiPlugin]
} as Config;