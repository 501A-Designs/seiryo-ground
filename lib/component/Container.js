import React from 'react'
import { styled } from '@stitches/react'

const ContainerStyled = styled('div', {
  fontFamily: '$sgFont1',
  fontWeight: '500',
  color:'gray',
  minHeight:'200px',
  width:'auto',
  zIndex:0,
  padding: '1em',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  borderRadius: '$r2',
  backgroundColor: '$sgGray1',
  border: '1px solid $sgGray2',
  'p':{
    fontWeight: 'normal'
  }
})

export default function Container(props) {
  return (
    <ContainerStyled>
      {props.children}
    </ContainerStyled>
  )
}