import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { FiLogIn } from 'react-icons/fi'
import { styled } from '../../stitches.config'
import AlignItems from '../alignment/AlignItems'
import Grid from '../alignment/Grid'
import Button from '../button/Button'
import { spin } from '../ux/keyframes'
import ProfileImage from './ProfileImage'

const ProfileCardStyled = styled('div',{
  borderRadius:'$r3',
  backgroundColor:'$gray3',
  border:'1px solid $gray4',
  padding: '$large',
  marginBottom:'$extraLarge',

  height: 'auto',
  transition: '$speed1',
  'h4':{
    margin:0
  },
  'p':{
    margin: '0',
    fontSize:'$8',
    color:'$gray10'
  },
  'h5':{
    margin:0,
    fontWeight: 'normal'
  },
})

// interface ProfileContainer

export default function ProfileContainer(props:any) {
  const router = useRouter();

  return (
    <ProfileCardStyled>
      {props.user ?
        <AlignItems gap={'1em'}>
          <ProfileImage
            width={'35'}
            height={'35'}
            alt={'profile image'}
            src={props.user.photoURL}
            onClick={()=>{
              router.push('/profile')
            }}
          />
          <Grid>
            <h4>
              {props.user.displayName}
            </h4>
            <p>{props.user.uid}</p>
          </Grid>
        </AlignItems>:
        <AlignItems justifyContent={"center"} flexDirection={"column"} gap={'1em'}>
          <h4>ログインする必要があります</h4>
          <Button
            size={'medium'}
            styleType={'black'}
            icon={<FiLogIn/>}
          >
            アカウント作成
          </Button> 
        </AlignItems>
      }
    </ProfileCardStyled>
  )
}
