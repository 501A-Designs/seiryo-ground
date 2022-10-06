import { keyframes } from "@stitches/react";

const leftSlideIn = keyframes({
  '0%': {
    transform: 'translateX(-50%)',
    opacity: 0
  },
});

const topSlideIn = keyframes({
  '0%': {
    transform: 'translateY(-50%)',
    opacity: 0
  }
});

const bottomSlideIn = keyframes({
  '0%': {
    transform: 'translateY(50%)',
    opacity: 0
  }
});

const popOut = keyframes({
  '0%': {
    transform: 'scale(0.5)',
    opacity: 0
  },
  '70%':{
    transform: 'scale(1.03)'
  }
});

const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
    // opacity: 0
  },
  '100%':{
    transform: 'rotate(360deg)'
  }
});


export {leftSlideIn,topSlideIn,bottomSlideIn,popOut,spin}