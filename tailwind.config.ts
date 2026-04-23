import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black:      "#0E0C09",
        charcoal:   "#18150F",
        ash:        "#2E2A22",
        bone:       "#D4CFC4",
        cream:      "#EDE9E0",
        ember:      "#C84B2A",
        gold:       "#B8972A",
        "warm-glow": "#D4914A",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Impact", "sans-serif"],
        body:    ["var(--font-cormorant)", "Georgia", "serif"],
        mono:    ["var(--font-dm-mono)", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
