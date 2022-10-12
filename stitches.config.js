import { createStitches } from '@stitches/react';

export const {styled,getCssText} = createStitches({
  theme: {
    colors: {
      sgGray1: 'rgb(248, 248, 248)',
      sgGray2: 'rgb(238, 238, 238)',
      sgGray3: 'rgb(230, 230, 230)',

      black: 'linear-gradient(0deg, black 0%, white 100%)',
      blue: 'linear-gradient(90deg, #00FFD1 0%, #5FC3FB 100%)',
      green: 'linear-gradient(90deg, #C3F304 0%, #50F403 100%)',
      red: 'linear-gradient(90deg, #FFB422 0%, #FB7B5F 100%)',
      purple: 'linear-gradient(90deg, #BA49FF 0%, #6E56FF 100%)'
    },
    fonts: {
      sgFont1: 'Noto Sans JP, Helvetica, sans-serif',
      sgFont2: 'Shippori Antique B1',
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
      shadow1:'0px 0px 20px #f0f0f0'
    },
    transitions: {
      speed1:'0.2s',
      speed2:'0.5s',
      speed3:'1s',
      speed4:'1.5s',
    },
  },
  media: {
    bp1: '(min-width: 640px)',
    bp2: '(min-width: 768px)',
    bp3: '(min-width: 1024px)',
  },
});