import { styled } from '@stitches/react'
import React from 'react'
import StaticGrid from '../StaticGrid'

export default function RightPannel(props) {
  const RightPannel = styled('div', {
    height:'100vh',
    width:'100%',
    overflowY:'scroll',
  })
  return (
    <RightPannel>
        {props.children}

    </RightPannel>
  )
}
