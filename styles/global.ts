import Link from "next/link"
import { globalCss } from "../stitches.config"

export const globalStyles = globalCss({
  '*': {
    fontFamily:'$sgFont1',
  },
  'body':{
    background:'$gray1',
    padding: 0,
    margin: 0,
  },
  'h1':{
    fontFamily:'$sgFont2'
  },
  'ul':{
    fontSize:'$8',
    margin:'$small 0'
  },
  'p':{
    fontSize:'$8',
  },
  'table':{  
    border: '1px solid $sgGray3',
    borderCollapse: 'collapse',
    textAlign: 'center',
    width: '100%'
  },
  'td':{
    border: '1px solid $sgGray3',
    padding: '$small',
  },
  'th':{
    border: '1px solid $sgGray3',
    backgroundColor: 'black',
    fontWeight: 'normal',
    color: 'white',
    padding: '$small',
  },
  'hr':{
    backgroundColor: '$sgGray3',
    border: '1px solid $sgGray3',
    width: '80%',
    borderRadius: '$round'
  },
  [`& ${Link}`]: {
    // fontWeight:'normal',
    textDecoration:'dotted',
  },
})