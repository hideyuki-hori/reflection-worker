import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: true,
  include: [
    './app/**/*.{js,jsx,ts,tsx}',
    './infrastructure/**/*.{js,jsx,ts,tsx}',
  ],
  exclude: [],
  jsxFramework: 'solid',
  theme: {
    extend: {},
  },
  outdir: 'styled-system',
})
