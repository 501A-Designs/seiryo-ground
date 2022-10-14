import React from 'react'
import { styled } from '@stitches/react'

const ContainerStyled = styled('div', {
  minHeight:'200px',
  width:'auto',
  display: 'flex',
  padding: '$medium',
  flexDirection: 'column',
  borderRadius: '$r2',
  
  variants: {
    type: {
      standard: {
        fontWeight: '500',
        color:'gray',
        backgroundColor: '$sgGray1',
        border: '1px solid $sgGray2',
      }
    },
    alignment: {
      center: {
        alignItems: 'center',
        justifyContent: 'center',
      }
    }
  },
  'p':{
    fontWeight: 'normal'
  }
})

export default function Container(props) {
  return (
    <ContainerStyled
      type={props.type}
      alignment={props.alignment}
      ref={props.ref}
    >
      {props.children}
    </ContainerStyled>
  )
}