import React from 'react'
import { styled } from '../../stitches.config'
import { spin } from '../ux/keyframes'

const BinaryToggleStyled = styled('div',{
  backgroundColor: 'black',
  borderRadius: '$round',
  display:'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: '1px solid $gray4',
  transition:'ease $speed1',
  variants:{
    selected:{
      true:{
        color: '$gray1',
        background:'linear-gradient($gray12,black)',
        boxShadow: '$shadow1',
        width: '95px',
        height: '95px',
        fontWeight: 'bold',
        animation: `${spin} 0.5s`
      },
      false:{
        color: '$gray10',
        background:'$gray3',
        width: '50px',
        height: '50px',
        '&:hover':{
          transform: 'scale(1.09)',
          color: '$gray11',
          backgroundColor: '$gray4',
        }
      }
    }
  }
})

export function BinaryToggle(props) {
  return (
    <BinaryToggleStyled
      selected={props.selected}
      onClick={props.onClick}
    >
      {props.children}
    </BinaryToggleStyled>
  )
}

const BinaryToggleContainerStyled = styled('div',{
  borderRadius: '$r2',
  padding: '$small',
  display:'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$small',
  width: '100%',
  height: '100%',
  minHeight: '103px'
})

export default function BinaryToggleContainer(props) {
  return (
    <BinaryToggleContainerStyled>
      {props.children}
    </BinaryToggleContainerStyled>
  )
}
