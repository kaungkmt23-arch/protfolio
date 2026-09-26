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
        body: "#0F172A",
        muted: "#475569",
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-green-400",
    "bg-blue-400",
    "bg-amber-400",
    "bg-red-400",
    "bg-cyan-400",
    "bg-orange-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-gray-400",
    "bg-teal-400",
    "bg-slate-300",
  ],
};

export default config;
