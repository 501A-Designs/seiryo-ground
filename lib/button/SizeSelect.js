import React from 'react'
import { styled } from '../../stitches.config'

const PlaceSizeStyled = styled('div',{
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'fit-content',
  padding: '$small',
  border: '1px solid $sgGray2',
  borderRadius: '$r2',
  transition: '$speed2',
  variants: {
    selected: {
      true: {
        backgroundColor: 'black',
        width: '66%',
      },
      false: {
        backgroundColor: '$sgGray1',
        width: '33%',
      },
    }
  },
  'p':{
    writingMode:'vertical-lr',
  }
})

const LetterContainer = styled('div',{
  borderRadius: '$round',
  padding: '$extraSmall',
  width:'15px',
  height: '15px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  variants: {
    selected: {
      true: {
        color: 'white',
        fontWeight: 'bold',
      },
      false: {
        color: 'black',
      },
    }
  }
})

export default function PlaceSize(props) {
  return (
    <PlaceSizeStyled
      selected={props.name === props.currentState}
      onClick={props.onClick}
    >
      <LetterContainer
        selected={props.name === props.currentState}
      >
        {props.name === 'small' && '小'}
        {props.name === 'medium' && '中'}
        {props.name === 'large' && '大'}
      </LetterContainer>
      <p>
        {props.children}
      </p>
    </PlaceSizeStyled>
  )
}