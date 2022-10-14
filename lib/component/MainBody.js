// import { styled } from '@stitches/react'
import React from 'react'
import { styled } from '../../stitches.config'
import { popOut } from '../ux/keyframes'

const MainBodyStyled = styled('div',{
  fontFamily: '$sgFont1',
  userSelect: 'none',
  animation: `${popOut} 0.8s`,
  'a':{
    color: 'black',
    fontSize: '0.9em',
    textDecoration: 'underline',
    textDecorationStyle: 'dashed',
    '&:hover':{
      textDecorationStyle: 'none',
    }
  },
  'canvas':{
    borderRadius: '$r3',
    width: 'auto'
  },
  'iframe':{
    border: '1px solid $sgGray2',
    filter: 'grayscale(1)',
    borderRadius: '$r2',
  },
  '@mobile':{padding:'0% 5%'},
  '@desktop':{padding:'0% 15%'},
  'h1':{
    fontWeight: '500'
  },
  'h2':{
    fontWeight: '500',
    margin:'0 0 0.2em 0',
    width:'fit-content',
  },
  'h3':{
    fontWeight: '500'
  },
  'h4':{
    fontWeight: '500'
  },
  'h5':{
    fontWeight: '500'
  },
  'h6':{
    fontWeight: '500'
  },
  'p':{
    fontSize:'$8'
  }
})

export default function MainBody(props) {
  return (
    <MainBodyStyled>
      {props.children}
    </MainBodyStyled>
  )
}
