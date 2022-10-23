import React from 'react'
import { styled } from '../../stitches.config'

const FooterStyled = styled('footer', {
  // left: '0',
  // right: '0',
  // bottom: '0',
  // position: 'absolute',
  position: 'sticky',
  bottom: '0',
  width: '100%',
  height: '100px',
  opacity: '0.95',
  zIndex: '10',
  variants:{
    type:{
      'blur':{
        backdropFilter: 'blur(10px)',
        maskImage: 'linear-gradient(transparent, black 60%)',
        WebkitMasKImage: 'linear-gradient(to top,#000 25%,transparent)',
        zIndex:'0'
      },
      'opaque':{
        background:'linear-gradient(transparent,white)'
      }
    }
  }
})

export default function Footer(props) {
  return (
    <FooterStyled type={props.type}></FooterStyled>
  )
}
