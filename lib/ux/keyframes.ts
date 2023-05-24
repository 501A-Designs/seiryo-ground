import { keyframes } from "@stitches/react";

const leftSlideIn = keyframes({
  "0%": {
    transform: "translateX(-50%)",
    opacity: 0,
  },
});

const topSlideIn = keyframes({
  "0%": {
    transform: "translateY(-50%)",
    opacity: 0,
  },
});

const bottomSlideIn = keyframes({
  "0%": {
    transform: "translateY(50%)",
    opacity: 0,
  },
});

const rotateIn = keyframes({
  "0%": {
    opacity: 0,
    transform: "rotateX(70deg)",
  },
  "50%": {
    transform: "rotateX(-10deg)",
  },
});

const rotateInBottonLeft = keyframes({
  "0%": {
    opacity: 0,
    transform: "rotateX(40deg) rotateY(20deg)",
  },
  "50%": {
    transform: "rotateX(-10deg)",
  },
});

const rotateAndZoom = keyframes({
  "0%": {
    transform: "rotateX(1deg) rotateY(1deg)",
  },
  "60%": {
    transform: "rotateX(360deg) rotateY(5deg) scale(0.8) ",
  },
  "80%": {
    transform: "scale(1.01)",
  },
});

const gradient = keyframes({
  "0%": {
    backgroundPosition: "10% 0%",
  },
  "50%": {
    backgroundPosition: "91% 100%",
  },
  "100%": {
    backgroundPosition: "200% 0%",
  },
});

const fillClipPath = keyframes({
  "0%": {
    clipPath: "ellipse(0px 0px at 10% 20%)",
  },
  "100%": {
    clipPath: "ellipse(1000px 1000px at 20% 20%)",
  },
});

export {
  leftSlideIn,
  topSlideIn,
  bottomSlideIn,
  rotateIn,
  rotateInBottonLeft,
  rotateAndZoom,
  gradient,
  fillClipPath,
};
