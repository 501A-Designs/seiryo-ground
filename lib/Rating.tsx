import React from 'react'
import { styled } from '../stitches.config'
import AlignItems from './alignment/AlignItems'

const RatingStyled = styled('div',{
  // background: "linear-gradient(20deg, $gray4 0%, $gray1 100%)",
  color: '$gray12',
  padding: '0.5em 1em',
  'h2':{
    margin: '0',
    fontWeight:'500',
  },
  'h4':{
    margin: '0',
    color:'$gray11'
  },
  'p':{
    margin: '0',
    color:'$gray11'
  },
  borderRadius:'$r1',
})

export default function Rating(props) {
  return (
    <RatingStyled>
      <AlignItems>
        <h2>{props.rating}</h2>
        {props.hideMax ? 
          <p>{props.description}</p>:
          <p>/10：{props.description}</p>
        }
      </AlignItems>
    </RatingStyled>
  )
}
