import React from 'react'
import { styled } from '../../stitches.config'
import { popOutNoBlur } from '../ux/keyframes'
import useSound from 'use-sound';
import { keyframes } from '@stitches/react';

const spinAni = keyframes({
  from: {
    transform: 'rotate(0deg)'
  },
  to: {
    transform: 'rotate(360deg)'
  }
})

const ButtonStyled = styled('button',{
  outlineColor:'$gray6',
  fontFamily: '$sgFont1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap:'0.5em',
  cursor:'pointer',
  width:'fit-content',
  height:'fit-content',
  userSelect:'none',
  borderRadius:'50px',
  animation: `${popOutNoBlur} 0.3s`,
  transition:'$speed1',
  variants:{
    animation:{
      load:{
        animation: `${spinAni} 2s infinite`
      },
    },
    size:{
      medium:{
        padding:'0.5em 1em',
      },
      small:{
        minWidth:'35px',
        minHeight:'35px',
        padding:'0.5em',
      }
    },
    styleType: {
      standard:{
        backgroundColor: '$gray1',
        border:'1px solid $gray1',
        color:'$gray10',
        '&:hover':{
          backgroundColor:'$gray3',
          color: '$gray12',
        }
      },
      transparent:{
        background: 'transparent',
        border: '1px solid transparent',
        color:'gray',
        '&:hover':{
          backgroundColor:'$grayA3',
          color: '$gray12',
          // border:'1px solid $sgGray2',
          // boxShadow:'0px 0px 15px $sgGray1',
        }
      },
      gray:{
        backgroundColor: '$gray10',
        border:'1px solid $gray10',
        color:'$gray9',
        '&:hover':{
          color: 'white',
        }
      },
      black:{
        backgroundColor: '$gray12',
        // background: 'linear-gradient($gray11,$gray12)',
        border:'1px solid $gray5',
        color:'$gray6',
        '&:hover':{
          transform:'scale(1.02)',
          opacity:'0.8',
          color: '$gray1',
        }
      },
      red:{
        backgroundColor: 'transparent',
        border:'1px solid transparent',
        color:'$red9',
        '&:hover':{
          backgroundColor:'$grayA3',
          transform:'scale(1.02)',
          opacity:'0.8',
          color: '$red10',
        }
      }
    }
  },
  'span': {
    whiteSpace:'nowrap', 
    fontSize:'12px',
    fontWeight:'500',
    
    // '@tablet':{
    //   display: 'none',
    // }
  },
  defaultVariants:{
    styleType:'standard',
    size:'medium'
  }
})

export default function Button(props) {
  const [tap1] = useSound('/sound/tap-1-sg.mp3',{playbackRate:1.1});
  const [tap2] = useSound('/sound/tap-2-sg.mp3',{playbackRate:1.1});



  return (
    <ButtonStyled
      size={props.size}
      styleType={props.styleType}
      onMouseDown={
        props.overRideSound ? 
        props.overRideSound : ()=> props.backTapSound ? tap2():tap1()
      }
      animation={props.animate}
      onClick={props.onClick}
      title={props.children}
      css={props.css}
    >
      {props.icon && props.icon}
      {props.children && <span>{props.children}</span>}
    </ButtonStyled>
  )
}
