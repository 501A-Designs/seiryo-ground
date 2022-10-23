import React from 'react'
import { styled } from '../stitches.config'
import AlignItems from './alignment/AlignItems'

const RatingStyled = styled('div',{
  // backgroundColor: 'black',
  background: '$sgBlackBackground',
  color: 'white',
  padding: '1em',
  'h2':{
    margin: '0'
  },
  'h4':{
    margin: '0'
  },
  'p':{
    margin: '0'
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
