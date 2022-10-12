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
    background:'$black',
    width:'2px',
    height: '100px',
    borderRadius: '$r1'
  },
  'h4':{
    fontFamily: '$sgFont2',
    fontWeight: 'normal',
    writingMode:'vertical-rl',
    textOrientation:'mixed',
  }
})

export default function End({children}) {
  return (
    <EndStyled>
      <div/>
      <h4>
        {children}
      </h4>
    </EndStyled>
  )
}
