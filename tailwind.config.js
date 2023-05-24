const { blackA, gray, grayA } = require("@radix-ui/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    extend: {
      colors: {
        ...gray,
        ...grayA,
        ...blackA,
      },
      boxShadow: {
        shadow1: `0px 0px 20px ${grayA.grayA5}`,
        shadow2: `0px 0px 35px ${grayA.grayA5}`,
        shadow3: `0px 0px 35px ${grayA.grayA6}`,
      },
      animation: {
        "spin-scale": "spin-scale 0.3s ease",
        "stretch-bounce": "stretch-bounce 0.3s ease",
        "pop-in-dialog": "pop-in-dialog 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "pop-out-dialog": "pop-out-dialog 500ms",
        "scale-blur": "scale-blur 1s",
      },
      keyframes: {
        "pop-in-dialog": {
          "0%": {
            opacity: 0.9,
            filter: "blur(10px)",
            top: "100%",
            left: "50%",
            transform: "translateY(-50%) translateX(-50%) scale(0.5)",
            borderRadius: "100px",
          },
        },
        "pop-out-dialog": {
          "20%": {
            transform: "translateY(-50%) translateX(-50%) scale(1.04)",
          },
          "100%": {
            opacity: 0,
            filter: "blur(5px)",
            transform: "translateY(50%) translateX(-50%) scale(0)",
          },
        },

        "stretch-bounce": {
          "0%": { width: "0%" },
          "50%": { width: "150%" },
          "100%": { width: "100%" },
        },
        scale: {
          "0%": {
            transform: "scale(0.5)",
            opacity: 0,
          },
          "50%": {
            transform: "scale(1.02)",
          },
        },
        "scale-blur": {
          "0%": {
            transform: "scale(0.5)",
            opacity: 0,
          },
          "30%": {
            filter: "blur(5px)",
          },
          "50%": {
            transform: "scale(1.02)",
          },
        },
        "spin-scale": {
          "0%": { rotate: "0deg" },
          "30%": { scale: "1.2" },
          "100%": { rotate: "360deg" },
        },
      },
    },
  },
  plugins: [],
};
