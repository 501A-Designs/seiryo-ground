import React from 'react'
import { styled } from '../../stitches.config'

const MapStyled = styled('iframe',{
  width:"100%",
  height:"250px",
  borderRadius:'$r2',
  border:'1px solid $gray5',
  filter:'grayscale(1)'
})

export default function Map(props) {
  return (
    <MapStyled
      src={`https://www.google.com/maps?output=embed&q=${props.location}`}
    />
  )
}
