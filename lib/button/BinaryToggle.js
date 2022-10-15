import React from 'react'
import { styled } from '../../stitches.config'

const BinaryToggleStyled = styled('div',{
  backgroundColor: 'black',
  borderRadius: '$round',
  display:'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition:'ease $speed1',
  variants:{
    selected:{
      true:{
        color: 'white',
        backgroundColor: 'black',
        border:'1px solid black',
        width: '100px',
        height: '100px',
        fontWeight: 'bold',
      },
      false:{
        color: 'black',
        backgroundColor: 'white',
        border:'1px solid $sgGray3',
        width: '50px',
        height: '50px',
        '&:hover':{
          transform: 'scale(1.09)',
          backgroundColor: '$sgGray2'
        }
      }
    }
  }
})

export default function BinaryToggle(props) {
  return (
    <BinaryToggleStyled
      selected={props.selected}
      onClick={props.onClick}
    >
      {props.children}
    </BinaryToggleStyled>
  )
}
