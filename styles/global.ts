import Link from "next/link"
import { globalCss } from "../stitches.config"

export const globalStyles = globalCss({
  '*': {
    fontFamily: 'Clash Display, Helvetica, sans-serif',
    WebkitFontSmoothing: 'antialiased',
    fontWeight:'normal',
    userSelect: 'none',
  },
  'body':{
    background:'$gray1',
    padding: 0,
    margin: 0,
  },
  'ul':{
    fontSize:'$8',
    margin:'$small 0'
  },
  'p':{
    fontSize:'$8',
  },
  'table':{  
    border: '1px solid $gray4',
    borderCollapse: 'collapse',
    textAlign: 'center',
    width: '100%'
  },
  'td':{
    border: '1px solid $gray4',
    padding: '$small',
    fontSize:'$8'
  },
  'th':{
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