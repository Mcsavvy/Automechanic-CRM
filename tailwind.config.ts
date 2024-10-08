import { Nunito } from "next/font/google";
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
        rambla: ["Rambla", "sans-serif"],
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        dashboard: "1fr 1fr 250px",
      },
      gridTemplateRows: {
        dashboard: "100px 1fr 1fr",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      scrollbar: ["rounded"],
      colors: {
        "pri-1": "#F2F6FF",
        "pri-2": "#B4CCFD",
        "pri-3": "#70A0EC",
        "pri-4": "#2D6DBE",
        "pri-5": "#003366",
        "pri-6": "#003056",
        "pri-7": "#002B46",
        "pri-8": "#002536",
        "pri-9": "#001C26",
        "acc-1": "#FFB866",
        "acc-2": "#FFAC4D",
        "acc-3": "#FFA133",
        "acc-4": "#FF951A",
        "acc-5": "#FF8900",
        "acc-6": "#E67B00",
        "acc-7": "#CC6E00",
        "acc-8": "#B36000",
        "acc-9": "#995200",
        "neu-1": "#FAFBFC",
        "neu-2": "#EAECEE",
        "neu-3": "#DBDDE0",
        "neu-4": "#CCCFD2",
        "neu-5": "#BCC0C4",
        "neu-6": "#94999D",
        "neu-7": "#6D7275",
        "neu-8": "#474C4E",
        "neu-9": "#222526",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "var(--pri-500)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--neu-6))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fastspin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fastspin: "fastspin 1s linear infinite",
      },
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
    textColor: ["responsive", "hover", "focus", "active"],
    transitionProperty: ["responsive", "hover", "focus", "active"],
    transitionDuration: ["responsive", "hover", "focus", "active"],
    transitionTimingFunction: ["responsive", "hover", "focus", "active"],
    scale: ["responsive", "hover", "focus", "active"],
    zIndex: ["responsive", "hover", "focus", "active"],
    width: ["responsive", "hover", "focus", "active"],
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
} satisfies Config;


export default config