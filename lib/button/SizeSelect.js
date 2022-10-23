import React from 'react'
import { styled } from '../../stitches.config'

const SizeSelectStyled = styled('div',{
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'fit-content',
  padding: '$extraSmall',
  border: '1px solid transparent',
  borderRadius: '$r2',
  transition: '$speed1',
  border: '1px solid transparent',
  variants: {
    selected: {
      true: {
        // backgroundColor: 'black',
        background: '$sgBlackBackground',
        width: '66%',
      },
      false: {
        backgroundColor: 'transparent',
        width: '33%',
        '&:hover':{
          transform:'scale(1.05)',
          border: '1px solid $sgGray3',
          backgroundColor: '$sgGray2',
        }
      },
    },
  },
  'p':{
    writingMode:'vertical-lr',
  },
})

const LetterContainer = styled('div',{
  borderRadius: '$round',
  padding: '$extraSmall',
  fontSize: '$8',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$small',
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

export default function SizeSelect(props) {
  return (
    <SizeSelectStyled
      name={props.name}
      key={props.key}
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
    </SizeSelectStyled>
  )
}