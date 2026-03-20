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
        black:    "#0A0A08",
        charcoal: "#161614",
        ash:      "#2A2A26",
        bone:     "#D4CFC4",
        cream:    "#EDE9E0",
        ember:    "#C84B2A",
        gold:     "#B8972A",
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
