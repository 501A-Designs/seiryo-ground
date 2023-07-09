import {
  gray,
  grayDark,
  grayA,
  grayDarkA,
  blue,
  blueDark,
  red,
  redDark,
  green,
  greenDark,
  orange,
  orangeDark,
} from "@radix-ui/colors";
import { createStitches, createTheme } from "@stitches/react";

export const { styled, getCssText, globalCss } = createStitches({
  theme: {
    colors: {
      ...gray,
      ...grayA,
      ...blue,
      ...red,
      ...green,
      ...orange,

      // sgBlackBackground: 'linear-gradient(217deg, #383838, black)',
      // sgWhiteBackground: 'linear-gradient(217deg, rgb(248, 248, 248), white)',

      // sgWhite: `linear-gradient(20deg, ${gray.gray2} 0%,white  100%)`,
      // sgBlack: `linear-gradient(20deg, black 0%,#383838  100%)`,

      // Card Colors
      levelOne: "linear-gradient(0deg, rgb(248, 248, 248) 0%, white 100%)",
      levelThree: "linear-gradient(0deg, #ccfcb6 0%, white 100%)",
      levelFour: "linear-gradient(0deg, #f5e1bc 0%, white 100%)",
      levelFive: "linear-gradient(0deg, black 0%, #262626 100%)",
    },
    fontSizes: {
      1: "3em",
      2: "2em",
      3: "1.5em",
      4: "1.2em",
      5: "1.1em",
      6: "1em",
      7: "0.9em",
      8: "0.8em",
      9: "0.7em",
    },
    radii: {
      r1: "5px",
      r2: "10px",
      r3: "15px",
      r4: "25px",
      round: "9999px",
    },
    shadows: {
      shadow1: `0px 0px 20px ${grayA.grayA5}`,
      shadow2: `0px 0px 35px ${grayA.grayA5}`,
      shadow3: `0px 0px 35px ${grayA.grayA6}`,
    },
    transitions: {
      speed1: "0.2s",
      speed2: "0.5s",
      speed3: "1s",
      speed4: "1.5s",
    },
    space: {
      extraSmall: "0.25em",
      small: "0.5em",
      medium: "1.0em",
      large: "1.5em",
      extraLarge: "2em",
      extraExtraLarge: "3em",
    },
  },
  media: {
    mobile: "(min-width: 0px) and (max-width: 900px)",
    tablet: "(min-width: 901px) and (max-width: 1200px)",
    desktop: "(min-width: 1201px)",
  },
});

// define the dark theme using the de-constructed function
export const darkTheme = createTheme({
  colors: {
    ...grayDark,
    ...grayDarkA,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...orangeDark,
  },
});
