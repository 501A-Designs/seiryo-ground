import { styled } from '@stitches/react'
import React from 'react'
import Ztext from 'react-ztext'

const ZtextContainer = styled('div', {
  fontFamily: '$sgFont1',
  'span:not(:first-of-type)': {
    color: `${props.color}`
  }
})

export default function TDText(props) {
  return (
    <ZtextContainer>
      <Ztext
        depth='1rem'
        direction='both'
        event='none'
        deapth='50px'
        eventRotation='50deg'
        eventDirection='default'
        fade={false}
        layers={10}
        perspective='100px'
        style={{
          fontSize: '4rem',
          color: `${props.sideColor}`,
        }}
      >
        {props.children}
      </Ztext>
    </ZtextContainer>
  )
}
