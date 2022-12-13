import React from 'react'
import { styled } from '../../stitches.config'
// import { tapSound } from '../ux/audio'
import { popOut } from '../ux/keyframes'

const ButtonStyled = styled('button',{
  outlineColor:'$gray6',
  fontFamily: '$sgFont1',
  fontSize:'$7',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap:'0.5em',
  cursor:'pointer',
  width:'fit-content',
  height:'fit-content',
  // minHeight:'35px',
  userSelect:'none',
  cursor:'pointer',
  borderRadius:'50px',
  animation: `${popOut} 0.7s`,
  transition:'$speed1',
  variants:{
    size:{
      medium:{
        padding:'0.5em 1em',
      },
      small:{
        minWidth:'35px',
        minHeight:'35px',
        fontSize:'$5',
        padding:'0.5em',
      }
    },
    styleType: {
      standard:{
        backgroundColor: 'white',
        border:'1px solid white',
        color:'$gray10',
        '&:hover':{
          backgroundColor:'$gray3',
          color: 'black',
        }
      },
      transparent:{
        background: 'transparent',
        border: '1px solid transparent',
        color:'gray',
        '&:hover':{
          backgroundColor:'$grayA3',
          color: 'black',
          // border:'1px solid $sgGray2',
          // boxShadow:'0px 0px 15px $sgGray1',
        }
      },
      black:{
        backgroundColor: 'black',
        border:'1px solid black',
        color:'$gray9',
        '&:hover':{
          color: 'white',
        }
      }
    }
  },
  'span': {
    '@tablet':{
      display: 'none',
    }
  },
  defaultVariants:{
    styleType:'standard'
  }
})

export default function Button(props) {

  return (
    <ButtonStyled
      size={props.size}
      styleType={props.styleType}
      // onMouseEnter={()=> tap()}
      onClick={props.onClick}
      title={props.children}
    >
      {props.icon && props.icon}
      {props.children && <span>{props.children}</span>}
    </ButtonStyled>
  )
}
