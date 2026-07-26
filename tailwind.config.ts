import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        ink: "hsl(var(--color-ink) / <alpha-value>)",
        paper: "hsl(var(--color-paper) / <alpha-value>)",
        lacquer: {
          DEFAULT: "hsl(var(--color-lacquer) / <alpha-value>)",
          foreground: "hsl(var(--color-lacquer-foreground) / <alpha-value>)",
        },
        jade: {
          DEFAULT: "hsl(var(--color-jade) / <alpha-value>)",
          foreground: "hsl(var(--color-jade-foreground) / <alpha-value>)",
        },
        gold: {
          DEFAULT: "hsl(var(--color-gold) / <alpha-value>)",
          foreground: "hsl(var(--color-gold-foreground) / <alpha-value>)",
        },
        blush: {
          DEFAULT: "hsl(var(--color-blush) / <alpha-value>)",
          foreground: "hsl(var(--color-blush-foreground) / <alpha-value>)",
        },
        border: "hsl(var(--color-border) / <alpha-value>)",
        muted: "hsl(var(--color-muted) / <alpha-value>)",
        "muted-foreground": "hsl(var(--color-muted-foreground) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        accent: ["var(--font-accent)", "serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgb(23 19 16 / 0.08)",
        card: "0 2px 12px -2px rgb(23 19 16 / 0.06)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
