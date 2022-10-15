import React from 'react'
import { styled } from '../../stitches.config'

const SizeSelectContainerStyled = styled('section',{
  display: 'flex',
  gap:'$extraSmall',
})

export default function SizeSelectContainer(props) {
  return (
    <SizeSelectContainerStyled>
      {props.children}
    </SizeSelectContainerStyled>
  )
}