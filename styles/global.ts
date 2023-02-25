import Link from "next/link"
import { globalCss } from "../stitches.config"

export const globalStyles = globalCss({
  '*': {
    fontFamily: 'Clash Display, Helvetica, sans-serif',
    WebkitFontSmoothing: 'antialiased',
    textRendering:'optimizeLegibility',
    fontWeight:'normal',
    userSelect: 'none',
  },
  'body':{
    background:'$gray1',
    padding: 0,
    margin: 0,
  },
  'h1':{
    fontWeight:'500',
    color:'$gray12',
  },
  'h2':{
    fontWeight:'500',
    color:'$gray12',
  },
  'h3':{
    fontWeight:'500',
    color:'$gray12',
  },
  'h4':{
    fontWeight:'500',
    color:'$gray12',
  },
  'h5':{
    fontWeight:'500',
    color:'$gray12',
  },
  'h6':{
    fontWeight:'500',
    color:'$gray12',
  },

  'ul':{
    fontSize:'$8',
    margin:'$small 0'
  },
  'li':{
    fontSize:'$7',
    color:'$gray12'
  },
  'p':{
    fontSize:'$8',
    color:'$gray11'
  },
  'table':{  
    border: '1px solid $gray4',
    borderCollapse: 'collapse',
    textAlign: 'center',
    width: '100%'
  },
  'td':{
    fontSize:'$8',
    border: '1px solid $gray4',
    padding: '$small',
    backgroundColor: '$gray1',
  },
  'th':{
    fontSize:'$8',
    border: '1px solid $gray4',
    backgroundColor: '$gray2',
    fontWeight: 'normal',
    color: '$gray11',
    padding: '$small',
  },
  'hr':{
    background: 'linear-gradient(90deg, transparent, $gray6, transparent)',
    border: 'none',
    height:'1px',
    width: '100%',
    borderRadius: '$round'
  },
  'a': {
    fontWeight:'inherit',
    textDecorationStyle:'dotted',
    color:'inherit'
  },

  'canvas':{
    borderRadius: '$r3',
    width: 'auto'
  },
  'iframe':{
    border: '1px solid $sgGray2',
    borderRadius: '$r2',
    // filter: 'grayscale(1)',
  },
})