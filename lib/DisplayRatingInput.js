import React from 'react'
import { styled } from '../stitches.config'

const DisplayRatingInputStyled = styled('div',{
  display: 'grid',
  gridTemplateColumns:'1fr',
  backgroundColor:'$sgGray1',
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
    backgroundColor: '$sgGray3',
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
      background: '$sgWhiteBackground',
      border:'1px solid $sgGray3',
      borderRadius: '$round',
      width: '30px',
      height: '30px',
      boxShadow: '0px 3px 10px 0px rgba(0, 0, 0, 0.15)',
      color:'#a2a2a2',
      transition: '$speed2',
      '&:hover': {
        background: '$sgBlackBackground',
        transform: 'scale(0.9)',
        boxShadow: '0px 0px 30px $sgGray1',
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