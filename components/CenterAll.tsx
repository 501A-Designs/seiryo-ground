import React from 'react'
import { styled } from '../../stitches.config'

const CenterAllStyled = styled('div', {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
})

export default function CenterAll({children}) {
  return (
    <CenterAllStyled>
      {children}
    </CenterAllStyled>
  )
}
