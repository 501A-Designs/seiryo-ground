import React from 'react'
import { styled } from '../stitches.config'
import AlignItems from './alignment/AlignItems'

const RatingStyled = styled('div',{
  background: "linear-gradient(20deg, $gray4 0%, $gray1 100%)",
  color: '$gray12',
  border:'1px solid $gray5',
  padding: '1em',
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
  variants:{
    borderRadius:{
      topLeft: {
        borderRadius:'$r2 $r1 $r1 $r1',
        '@mobile':{
          borderRadius:'$r2 $r2 $r1 $r1'
        }
      },
      topRight: {
        borderRadius:'$r1 $r2 $r1 $r1',
        '@mobile':{
          borderRadius:'$r1'
        }
      },
      bottomRight: {
        borderRadius:'$r1 $r1 $r2 $r1',
        '@mobile':{
          borderRadius:'$r1 $r1 $r2 $r2'
        }
      },
      bottomLeft: {
        borderRadius:'$r1 $r1 $r1 $r2',
        '@mobile':{
          borderRadius:'$r1'
        }
      },
      left: {
        borderRadius:'$r3 $r1 $r1 $r3',
        '@mobile':{
          borderRadius:'$r3 $r3 $r1 $r1'
        }
      },
      right: {
        borderRadius:'$r1 $r3 $r3 $r1',
        '@mobile':{
          borderRadius:'$r1 $r1 $r3 $r3'
        }
      }
    }
  }
})

export default function Rating(props) {
  return (
    <RatingStyled
      borderRadius={props.borderRadius}
    >
      <AlignItems>
        <h2>{props.rating}</h2>
        {!props.hideMax && <h4>/10</h4>}
      </AlignItems>
      <p>{props.description}</p>
    </RatingStyled>
  )
}
