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
        "seiryo-green-start": "#C4F500",
        "seiryo-green-end": "#05F800",
        "seiryo-blue-start": "#00F0FF",
        "seiryo-blue-end": "#5FC3FB",
        "seiryo-orange-start": "#FFB422",
        "seiryo-orange-end": "#FB7B5F",
        "seiryo-purple-start": "#BA49FF",
        "seiryo-purple-end": "#7856FF",
      },
      boxShadow: {
        shadow1: `0px 0px 20px hsla(0, 0%, 0%, 0.090)`,
        shadow2: `0px 0px 35px hsla(0, 0%, 0%, 0.090)`,
        shadow3: `0px 0px 35px hsla(0, 0%, 0%, 0.114)`,
      },
      animation: {
        "spin-scale": "spin-scale 0.3s ease",
        "stretch-bounce": "stretch-bounce 0.7s ease",
        "pop-in-dialog": "pop-in-dialog 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "pop-out-dialog": "pop-out-dialog 500ms",
        "scale-blur": "scale-blur 1s",
        scale: "scale 0.5s",
        "flip-card": "flip-card 2s",
        "bounce-left": "bounce-left 0.6s",
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
          "0%": { width: "50%" },
          "30%": { width: "150%" },
          "100%": { width: "100%" },
        },
        scale: {
          "0%": {
            transform: "scale(0.25)",
          },
          "50%": {
            transform: "scale(1.2)",
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
        "flip-card": {
          "0%": {
            transform: "rotateX(1deg) rotateY(1deg)",
          },
          "60%": {
            transform: "rotateX(360deg) rotateY(5deg) scale(0.8) ",
          },
          "80%": {
            transform: "scale(1.01)",
          },
        },
        "bounce-left": {
          "0%": {
            transform: "translateX(0)",
          },
          "25%": {
            transform: "translateX(3em)",
          },
        },
      },
    },
  },
  plugins: [],
};
