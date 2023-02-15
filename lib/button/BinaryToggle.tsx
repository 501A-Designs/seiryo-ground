import React from 'react'
import { styled } from '../../stitches.config'
import { spin } from '../ux/keyframes'

const BinaryToggleItemStyled = styled('div',{
  backgroundColor: 'black',
  borderRadius: '$round',
  display:'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: '1px solid transparent',
  transition:'ease $speed1',
  variants:{
    selected:{
      true:{
        color: '$gray1',
        backgroundColor:'$gray12',
        // background: 'linear-gradient($gray11,$gray12)',
        borderColor:'$gray5',
        boxShadow: '$shadow1',
        width: '95px',
        height: '95px',
        fontWeight: '500',
        animation: `${spin} 0.5s`
      },
      false:{
        color: '$gray10',
        // background:'$gray3',
        backgroundColor:'transparent',
        width: '50px',
        height: '50px',
        '&:hover':{
          color: '$gray11',
          backgroundColor: '$gray4',
          borderColor:'$gray5',
        }
      }
    }
  }
})

const BinaryToggleStyled = styled('div',{
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

const BinaryToggleItem = (props:any)=> {
  return (
    <BinaryToggleItemStyled
      selected={props.selected}
      onClick={props.onClick}
    >
      {props.name}
    </BinaryToggleItemStyled>
  )
}

BinaryToggle.Item = BinaryToggleItem;
export default function BinaryToggle(props) {
  return (
    <BinaryToggleStyled>
      {props.children}
    </BinaryToggleStyled>
  )
}
