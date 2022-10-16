import React from 'react'
import { styled } from '../../stitches.config'

const GridStyled = styled('div',{
  display: 'grid',  
  height: 'fit-content',
  gap:'0',
  gridTemplateColumns: '1fr',
  variants: {
    gap:{
      extraSmall:{
        gap: '$extraSmall',
      },
      small: {
        gap: '$small',
      },
      medium: {
        gap: '$medium',
      },
      large: {
        gap: '$large',
      }
    },
    grid: {
      oneTwo:{
        '@desktop':{
          gridTemplateColumns: '1fr 2fr',
        }
      },
      twoOne: {
        '@desktop':{
          gridTemplateColumns: '2fr 1fr',
        }
      },
      duo:{
        '@desktop':{
          gridTemplateColumns: '1fr 1fr',
        }
      },
      tri:{
        '@desktop':{
          gridTemplateColumns: '1fr 1fr 1fr',
        }
      },
      quad: {
        '@desktop':{
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
        }
      },
      oneTwoOne: {
        '@desktop':{
          gridTemplateColumns: '1fr 2fr 1fr',
        }
      }
    }
  }
})

export default function Grid(props) {
  return (
    <GridStyled
      grid={props.grid}
      gap={props.gap}
    >
      {props.children}
    </GridStyled>
  )
}
