import React from 'react'
import { styled } from '../../stitches.config'
import { keyframes } from '@stitches/react';

const fadeIn = keyframes({
  '0%': {
    transform: 'scale(0.95)',
    opacity: 0
  },
  '30%':{
    filter:'blur(10px)',
  },
  '50%':{
    transform: 'scale(1.01)',
  }
});

const MarginStyled = styled('div',{
  animation: `${fadeIn} 0.7s`,
  '@mobile':{padding:'0% 5%'},
  '@tablet':{padding:'0% 8%'},
  '@desktop':{padding:'0% 15%'},
  variants:{
    fullHeight:{
      true:{
        minHeight:'100vh'
      }
    }
  },
  defaultVariants:{
    fullHeight:true
  }
})

export default function Margin(props) {
  return (
    <MarginStyled
      fullHeight={props.fullHeight}
      css={props.css}
    >
      {props.children}
    </MarginStyled>
  )
}
