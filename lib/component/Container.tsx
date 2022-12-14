import React from 'react'
import { styled } from '@stitches/react'

const ContainerStyled = styled('div', {
  width:'auto',
  display: 'flex',
  padding: '$medium',
  flexDirection: 'column',
  borderRadius: '$r2',
  'h2':{
    margin:0,
  },
  'h3':{
    margin:0,
  },
  'h4':{
    margin:0,
  },
  'h5':{
    margin:0,
  },
  'h6':{
    margin:0,
  },
  variants: {
    type: {
      standard: {
        backgroundColor: '$gray2',
        border: '1px solid $gray3',
      },
      white: {
        backgroundColor: 'white',
        border: '1px solid $gray5',
      },
    },
    height: {
      standard:{
        minHeight:'200px',
      },
      fitContent:{
        height: 'fit-content',
      }
    },
    alignment: {
      center: {
        alignItems: 'center',
        justifyContent: 'center',
      }
    },
    padding: {
      small: {
        padding: '$small'
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
      height={props.height}
      padding={props.padding}
      ref={props.ref}
    >
      {props.children}
    </ContainerStyled>
  )
}