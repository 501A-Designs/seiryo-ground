import * as Scroll from 'react-scroll';

let scroll = Scroll.animateScroll;
let scroller = Scroll.scroller;
let scrollAnimation = {
  duration: 500,
  delay: 100,
  smooth: true,
  offset: -100,
}

export {scroll, scroller, scrollAnimation}