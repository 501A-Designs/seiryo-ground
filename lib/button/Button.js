import React from 'react'
import { styled } from '../../stitches.config'
// import { tapSound } from '../ux/audio'
import { popOut } from '../ux/keyframes'

const ButtonStyled = styled('button',{
  fontFamily: '$sgFont1',
  fontSize:'$7',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap:'0.5em',
  cursor:'pointer',
  padding:'0.5em 1em',
  width:'fit-content',
  height:'fit-content',
  userSelect:'none',
  cursor:'pointer',
  borderRadius:'50px',
  animation: `${popOut} 0.7s`,
  transition:'$speed1',
  variants:{
    color: {
      transparent:{
        backgroundColor: 'transparent',
        border:'1px solid transparent',
        color:'gray',
      },
      white:{
        backgroundColor: 'white',
        border:'1px solid $sgGray2',
        color:'gray',
      },
      black:{
        backgroundColor: 'black',
        border:'1px solid black',
        color:'white',
      }
    }
  },
  'span': {
    '@tablet':{
      display: 'none',
    }
  },
  '&:hover':{
    transform: 'scale(1.05)',
    backgroundColor:'$sgGray1',
    color: 'black',
    border:'1px solid $sgGray2',
    boxShadow:'0px 0px 15px $sgGray1',
  }
})

export default function Button(props) {

  return (
    <ButtonStyled
      color={props.color}
      // onMouseEnter={()=> tap()}
      onClick={props.onClick}
      title={props.children}
    >
      {props.iconPosition === 'left' && props.icon}
      <span>{props.children}</span>
      {props.iconPosition === 'right' && props.icon}
    </ButtonStyled>
  )
}
