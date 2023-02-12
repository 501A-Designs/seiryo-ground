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
      },
      extraLarge: {
        gap: '$extralarge',
      },
      extraExtraLarge: {
        gap: '$extraExtraLarge',
      }
    },
    grid: {
      oneTwo:{
        '@tablet':{
          gridTemplateColumns: '1fr 2fr',
        },
        '@desktop':{
          gridTemplateColumns: '1fr 2fr',
        }
      },
      twoOne: {
        '@tablet':{
          gridTemplateColumns: '2fr 1fr',
        },
        '@desktop':{
          gridTemplateColumns: '2fr 1fr',
        }
      },
      oneThree:{
        '@tablet':{
          gridTemplateColumns: '1fr 2fr',
        },
        '@desktop':{
          gridTemplateColumns: '1fr 3fr',
        }
      },
      duo:{
        '@tablet':{
          gridTemplateColumns: '1fr 1fr',
        },
        '@desktop':{
          gridTemplateColumns: '1fr 1fr',
        }
      },
      tri:{
        '@tablet':{
          gridTemplateColumns: '1fr 1fr 1fr',
        },
        '@desktop':{
          gridTemplateColumns: '1fr 1fr 1fr',
        }
      },
      quad: {
        '@tablet':{
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
        },
        '@desktop':{
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
        }
      },
      oneThreeOne: {
        '@tablet':{
          gridTemplateColumns: '1fr 3fr 1fr',
        },
        '@desktop':{
          gridTemplateColumns: '1fr 3fr 1fr',
        }
      },
      hex:{
        '@tablet':{
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
        },
        '@desktop':{
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
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
      css={props.css}
    >
      {props.children}
    </GridStyled>
  )
}
