import React from 'react'
import { styled } from '@stitches/react'

export default function Container(props) {
  const Container = styled('div', {
    minHeight:'200px',
    width:'100%',
    zIndex:0,
    padding: '1em',
    position: 'relative',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'var(--sgLightGray)',
    border: '1px solid var(--sgMediumGray)'
  })
  return (
    <Container>
      {props.children}
    </Container>
  )
}