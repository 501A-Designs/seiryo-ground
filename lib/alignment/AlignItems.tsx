import React from 'react'
import { styled } from '../../stitches.config'
import { VariantProps } from '@stitches/react'

interface AlignItemsProps extends VariantProps<typeof AlignItemsStyled> {
  children?: JSX.Element | JSX.Element[]
}

export default function AlignItems(props: AlignItemsProps) {
  return (
    <AlignItemsStyled {...props}>
      {props.children}
    </AlignItemsStyled>
  )
}

const AlignItemsStyled = styled('section', {
  display: 'flex',
  width: '100%',
  gap: '$small',
  alignItems: 'center',
  variants: {
    justifyContent: {
      center: {
        justifyContent: 'center'
      },
      spaceBetween: {
        justifyContent: 'space-between'
      },
      end: {
        justifyContent: 'flex-end'
      }
    },
    flexDirection: {
      row: {
        flexDirection: 'row'
      },
      column: {
        flexDirection: 'column'
      },
    },
  }
})
