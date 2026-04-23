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
        // Faded West semantic palette
        "bg-primary":   "#F2EDE4",
        "bg-secondary": "#E0D5C5",
        "bg-tertiary":  "#D4C4AE",
        "bg-dark":      "#1A1208",
        "text-primary": "#1A1208",
        "text-secondary":"#4A3F32",
        "text-muted":   "#8C7B65",
        "text-light":   "#F2EDE4",
        "border-primary":"#C4B49A",
        "border-subtle": "#E0D5C5",
        ember:          "#C84B2A",
        amber:          "#D4914A",
        // Convenience aliases
        black:          "#1A1208",
        charcoal:       "#1A1208",
        ash:            "#2F2416",
        bone:           "#F2EDE4",
        cream:          "#F2EDE4",
        gold:           "#B8972A",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body:    ["var(--font-body)", "serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
