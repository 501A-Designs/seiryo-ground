import React from 'react'
import { styled } from '../../stitches.config'
import Margin from '../alignment/Margin'
import AlignItems from '../alignment/AlignItems'


const HeaderStyled = styled('header',{
  borderBottom:'1px solid $gray5',
  padding:'0.5em 0',
  marginBottom:'1em',
  'h5':{
    margin:'0'
  },
  variants:{
    type:{
      header:{
        background:'linear-gradient($gray1,$gray3)',
      },
      banner:{
        background:'linear-gradient($gray1,$gray5)',
      }
    },
    
  }
})

export default function Header(props) {
  return (
    <HeaderStyled {...props}>
      <Margin fullHeight={false}>
        <AlignItems
          spaceBetween={true}
        >
          {props.title && <h5>{props.title}</h5>}
          {props.children}
        </AlignItems>
      </Margin>
    </HeaderStyled>
  )
}
