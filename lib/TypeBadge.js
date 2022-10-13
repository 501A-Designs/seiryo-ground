import React from 'react'
import { styled } from '../stitches.config';

const TypeBadgeStyled = styled('div',{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontStyle: 'italic',
  height: '10px',
  borderRadius:'$r2',
  border:'0.5px solid white',
  transition: '$speed2',
  variants:{
    width: {
      mini:{
        width:'10px',
        boxShadow: '0px 1px 5px white',
      },
      short: {
        height: '7px',
        width:'30px',
        boxShadow: '0px 2px 7px gray',
        border:'0.5px solid white',
      },
      long: {
        height: '5px',
        width:'70px',
        border:'0.5px solid white',
      }
    },
    type:{
      blue:{
        background:'$blue'
      },
      green:{
        background:'$green'
      },
      red:{
        background:'$red'
      },
      purple:{
        background:'$purple'
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
