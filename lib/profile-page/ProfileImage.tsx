import Image from 'next/image'
import React from 'react'
import { styled } from '../../stitches.config'

export default function ProfileImage(props:any) {
  return (
    <ProfileImageStyled
      width={props.width}
      height={props.height}
      alt={'profile image'}
      src={props.src}
    />
  )
}

const ProfileImageStyled = styled(Image,{
  borderRadius:'$round',
  border:'1px solid $gray2',
})