import React from 'react'
import { styled } from '../../stitches.config'

const BinaryToggleContainerStyled = styled('div',{
  borderRadius: '$r2',
  padding: '$small',
  display:'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$small',
  width: '100%',
  height: '100%',
  minHeight: '103px'
})

export default function BinaryToggleContainer(props) {
  return (
    <BinaryToggleContainerStyled>
      {props.children}
    </BinaryToggleContainerStyled>
  )
}
