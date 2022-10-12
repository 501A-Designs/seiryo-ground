// import { styled } from '@stitches/react'
import React from 'react'
import { styled } from '../../stitches.config'
import { popOut } from '../ux/keyframes'

const MainBodyStyled = styled('div',{
  fontFamily: '$sgFont1',
  animation: `${popOut} 0.8s`,
  '@bp1':{padding:'0% 5%'},
  '@bp2':{padding:'0% 10%'},
  '@bp3':{padding:'0% 15%'},
  'h1':{
    fontWeight: '700'
  },
  'h2':{
    fontWeight: '700'
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
