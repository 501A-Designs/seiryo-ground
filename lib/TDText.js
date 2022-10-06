import { styled } from '@stitches/react'
import React from 'react'
import Ztext from 'react-ztext'

export default function TDText(props) {
  const ZtextContainer = styled('div', {
    'span:not(:first-of-type)': {
      color: `${props.color}`
    }
  })

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
