import React from 'react'
import { popOut } from '../ux/keyframes'
import { styled } from '../../stitches.config'

const MarginStyled = styled('div',{
  animation: `${popOut} 0.7s`,
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
