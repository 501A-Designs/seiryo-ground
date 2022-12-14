import React from 'react'
import { styled } from '../../stitches.config'

const DisplayRatingInputStyled = styled('div',{
  display: 'grid',
  gridTemplateColumns:'1fr',
  backgroundColor:'$gray3',
  padding: '1em 1em 0.5em 1em',
  gap:'1em',
  borderRadius: '10px',
  'h1':{
    margin: '0',
    textAlign: 'center'
  },
  'input': {
    WebkitAppearance: 'none',
    appearance: 'none',
    backgroundColor: '$gray5',
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
      background: '$gray1',
      border:'1px solid $gray6',
      borderRadius: '$round',
      width: '30px',
      height: '30px',
      boxShadow: '$shadow1',
      color:'#a2a2a2',
      transition: '$speed2',
      '&:hover': {
        transform: 'scale(0.9)',
        background: '$gray12',
        boxShadow:'none'
      },
      '&:active': {
        transform: 'translateY(-2px)',
      }
    }
  },
  'p':{
    textAlign: 'center'
  }
})

export default function DisplayRatingInput(props) {
  return (
    <DisplayRatingInputStyled>
      <h1>{props.value}</h1>
      <input
        max={props.maxValue}
        min={props.minValue}
        type={"range"}
        value={props.value}
        onChange={props.onChange}
      />
      <p>{props.placeholder}</p>
    </DisplayRatingInputStyled>
  )
}