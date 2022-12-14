import React from 'react'
import { styled } from '../stitches.config'


const EndStyled = styled('section',{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '1em',
  padding: '5% 0',
  'div':{
    background:'$sgBlack',
    width:'1px',
    height: '100px',
    borderRadius: '$r1'
  },
  'h5':{
    fontWeight: 'normal',
    writingMode:'vertical-rl',
    textOrientation:'mixed',
  }
})

export default function End({children}) {
  return (
    <EndStyled>
      <div/>
      <h5>
        {children}
      </h5>
    </EndStyled>
  )
}
