import React from 'react'
import { styled } from '../../stitches.config'
import { popOut } from '../ux/keyframes'

const MarginStyled = styled('div',{
  fontFamily: '$sgFont1',
  userSelect: 'none',
  minHeight: '100vh',
  animation: `${popOut} 0.8s`,

  // 'a':{
  //   color: 'inherit',
  //   fontSize: 'inherit',
  //   textDecoration: 'underline',
  //   textDecorationStyle: 'dashed',
  //   cursor: 'pointer',
  //   '&:hover':{
  //     textDecorationStyle: 'none',
  //   }
  // },
  'canvas':{
    borderRadius: '$r3',
    width: 'auto'
  },
  'iframe':{
    border: '1px solid $sgGray2',
    borderRadius: '$r2',
    // filter: 'grayscale(1)',
  },
  '@mobile':{padding:'0% 5%'},
  '@tablet':{padding:'0% 8%'},
  '@desktop':{padding:'0% 15%'},
})

export default function Margin(props) {
  return (
    <MarginStyled>
      {props.children}
    </MarginStyled>
  )
}
