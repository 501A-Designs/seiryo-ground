import React from 'react'
import { styled } from '../../stitches.config'

const AlignItemsStyled = styled('section',{
  display:'flex',
  width:'100%',
})

export default function AlignItems(props) {
  return (
    <AlignItemsStyled
      css={{
        margin:`${props.margin}`,
        flexDirection: `${props.flexDirection ? props.flexDirection:'row'}`,
        height: `${props.height}`,
        alignItems:`${props.alignItems ? props.alignItems:'center'}`,
        gap:`${props.gap ? props.gap:'0.5em'}`,
        justifyContent:`${props.spaceBetween ? 'space-between':props.justifyContent}`
      }}
    >
      {props.children}
    </AlignItemsStyled>
  )
}
