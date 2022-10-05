import React from 'react'
import { styled } from '@stitches/react';


export default function SolidButton(props) {
  const SolidButton = styled('button', {
    borderRadius: '10px',
    fontSize: '13px',
    backgroundColor: 'var(--sgGray)',
    border: '1px solid var(--sgGray)',
    padding: '10px 15px',
    transition: '0.2s',
    '&:hover': {
      opacity: 0.8,
      transform: 'scale(1.02)',
      cursor: 'pointer',
    },
  });

  return (
    <SolidButton onClick={props.onClick}>
      {props.iconPosition === 'left' && props.icon}
      {props.children}
      {props.iconPosition === 'right' && props.icon}
    </SolidButton>
  )
}