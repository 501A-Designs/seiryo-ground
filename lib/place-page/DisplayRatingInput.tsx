import React from 'react'
import { styled } from '../../stitches.config'
import useSound from 'use-sound';

const DisplayRatingInputStyled = styled('div',{
  display: 'grid',
  gridTemplateColumns:'1fr',
  backgroundColor: '$gray3',
  border: '1px solid $gray4',
  padding: '1em 1em 0.5em 1em',
  gap:'1em',
  borderRadius: '10px',
  transition:'$speed1',
  'h1':{
    margin: '0',
    textAlign: 'center',
    fontWeight:'500',
  },
  'input': {
    WebkitAppearance: 'none',
    appearance: 'none',
    backgroundColor: '$gray6',
    height: '2px',
    cursor:'pointer',
    '&:focus': {
      outline: 'none',
    },
    '&:active': {
      outline: 'none',
    },
    '&::-webkit-slider-thumb': {
      WebkitAppearance: 'none',
      // backgroundColor:'$gray12',
      background: 'linear-gradient($gray11,$gray12)',
      border:'1px solid $gray6',
      borderRadius: '$round',
      width: '25px',
      height: '25px',
      boxShadow: '$shadow1',
      color:'#a2a2a2',
      transition: '$speed2',
      '&:hover': {
        transform: 'scale(0.9)',

        // background: '$gray12',
        // background: 'linear-gradient($gray1,$gray2)',
        boxShadow:'none'
      },
      '&:active': {
        transform: 'translateY(-2px)',
      }
    }
  },
  'p':{
    textAlign: 'center'
  },
  '&:hover':{
    backgroundColor:'$gray2',
  }
})

export default function DisplayRatingInput(props) {
  const [tap3] = useSound('/sound/tap-3-sg.mp3',{playbackRate:1.1});

  return (
    <DisplayRatingInputStyled>
      <h1>{props.value}</h1>
      <input
        max={props.maxValue}
        min={props.minValue}
        type={"range"}
        value={props.value}
        onChange={props.onChange}
        onChangeCapture={()=>tap3()}
      />
      <p>{props.placeholder}</p>
    </DisplayRatingInputStyled>
  )
}