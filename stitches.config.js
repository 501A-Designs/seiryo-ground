import { createStitches } from '@stitches/react';

export const {styled,getCssText} = createStitches({
  theme: {
    colors: {
      sgGray1: 'rgb(248, 248, 248)',
      sgGray2: 'rgb(238, 238, 238)',
      sgGray3: 'rgb(230, 230, 230)',

      // Reference Black https://www.w3schools.com/colors/colors_shades.asp
      sgBlackBackground: 'linear-gradient(217deg, #383838, black)',
      sgWhiteBackground: 'linear-gradient(217deg, rgb(248, 248, 248), white)',

      mix: 'linear-gradient(45deg,white 0%,black 50%,white 100%)',
      black: 'linear-gradient(0deg, black 0%, white 100%)',
      blue: 'linear-gradient(90deg, #00FFD1 0%, #5FC3FB 100%)',
      green: 'linear-gradient(90deg, #C3F304 0%, #50F403 100%)',
      red: 'linear-gradient(90deg, #FFB422 0%, #FB7B5F 100%)',
      purple: 'linear-gradient(90deg, #BA49FF 0%, #6E56FF 100%)',

      // Card Colors
      levelOne:'linear-gradient(0deg, rgb(248, 248, 248) 0%, white 100%)',
      levelTwo:'linear-gradient(0deg, #ccedff 0%, white 100%)',
      levelThree:'linear-gradient(0deg, #ccfcb6 0%, white 100%)',
      levelFour:'linear-gradient(0deg, #f5e1bc 0%, white 100%)',
      levelFive:'linear-gradient(0deg, black 0%, #262626 100%)',
    },
    fonts: {
      sgFont1: 'Noto Sans JP, Helvetica, sans-serif',
      sgFont2: 'Shippori Antique',
    },
    fontSizes: {
      1: '3em',
      2: '2em',
      3: '1.5em',
      4: '1.2em',
      5: '1.1em',
      6: '1em',
      7: '0.9em',
      8: '0.8em',
    },
    radii: {
      r1: '5px',
      r2: '10px',
      r3: '15px',
      r4: '30px',
      round: '9999px',
    },
    shadows: {
      shadow1:'0px 0px 20px #f0f0f0',
      shadow2:'0px 0px 35px #e3e3e3'
    },
    transitions: {
      speed1:'0.2s',
      speed2:'0.5s',
      speed3:'1s',
      speed4:'1.5s',
    },
    space:{
      extraSmall:'0.25em',
      small:'0.5em',
      medium:'1.0em',
      large:'1.5em',
      extraLarge:'2em',
      extraExtraLarge:'3em',
    }
  },
  media: {
    mobile: '(min-width: 0px) and (max-width: 900px)',
    tablet: '(min-width: 901px) and (max-width: 1200px)',
    desktop: '(min-width: 1201px)',
  },
});