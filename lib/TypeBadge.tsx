import React from 'react'
import { styled } from '../stitches.config';

const TypeBadgeStyled = styled('div',{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontStyle: 'italic',
  height: '7px',
  borderRadius:'$round',
  border:'0.5px solid white',
  transition: '$speed2',
  variants:{
    width: {
      small: {
        height:'10px',
        width:'10px',
      },
      large: {
        height:'20px',
        width:'20px',
      },
    },
    type:{
      blue:{
        background:'$sgBlue'
      },
      green:{
        background:'$sgGreen'
      },
      red:{
        background:'$sgRed'
      },
      purple:{
        background:'$sgPurple'
      },
    }
  }
})

export default function TypeBadge(props) {
  return (
    <TypeBadgeStyled
      width={props.width}
      type={props.type}
    />
  )
}
