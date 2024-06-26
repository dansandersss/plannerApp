import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        expand: "expand 0.5s ease-out forwards",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        newBgColor: {
          1: "#5577FF",
          2: "#FD71AF",
          3: "#49CCF9",
          4: "#7B68EE",
          5: "#00B884",
          6: "#FFC800",
          7: {
            1: "#FF6767",
            2: "#c04e4e",
          },
        },
        newTextColor: {
          1: "#5577FF",
          2: "#FD71AF",
          3: "#49CCF9",
          4: "#7B68EE",
          5: "#00B884",
          6: "#FFC800",
          7: {
            1: "#FF6767",
            2: "#c04e4e",
          },
        },
        priorityColor: {
          low: "#05A301",
          medium: "#0225FF",
          high: "#F21E1E",
        },
      },
    },
  },
  plugins: [],
};
export default config;
