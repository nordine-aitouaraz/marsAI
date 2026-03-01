/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      colors: {
        "brand-bg": "rgb(var(--color-bg) / <alpha-value>)",
        "brand-surface": "rgb(var(--color-surface) / <alpha-value>)",
        "brand-primary": "rgb(var(--color-primary) / <alpha-value>)",
        "brand-primary-soft": "rgb(var(--color-primary-soft) / <alpha-value>)",
        "brand-accent": "rgb(var(--color-accent) / <alpha-value>)",
        "brand-border": "rgb(var(--color-border) / <alpha-value>)",
        "brand-muted": "rgb(var(--color-muted) / <alpha-value>)",
        "brand-white": "rgb(var(--color-white) / <alpha-value>)",
      },
      boxShadow: {
        "soft-xl": "0 24px 60px rgba(15, 23, 42, 0.55)",
        "soft-md": "0 18px 40px rgba(15, 23, 42, 0.40)",
        "soft-sm": "0 10px 24px rgba(15, 23, 42, 0.35)",
      },
      borderRadius: {
        xl: "var(--radius-xl)",
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        full: "999px",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
