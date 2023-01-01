import { useRouter } from 'next/router'
import React from 'react'
import { FiLogIn } from 'react-icons/fi'
import { styled } from '../../stitches.config'
import AlignItems from '../alignment/AlignItems'
import Grid from '../alignment/Grid'
import Button from '../button/Button'
import ProfileImage from './ProfileImage'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { gradient } from '../ux/keyframes'

const ProfileCardStyled = styled('div',{
  cursor:'pointer',
  borderRadius:'$r3',
  background: 'linear-gradient(45deg,white 0%,$gray4 50%,white 100%)',
  backgroundSize: '200% 200%',
  border:'1px solid $gray4',
  padding: '$large',
  marginBottom:'$medium',

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

  '&:hover':{
    animation:`${gradient} linear 0.6s infinite`,
    transform:'scale(0.95)',
  }
})

export default function ProfileContainer(props:any) {
  const router = useRouter();
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <ProfileCardStyled
      onClick={()=>router.push('/profile')}
    >
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
            onClick={()=>signInWithGoogle()}
          >
            アカウント作成
          </Button> 
        </AlignItems>
      }
    </ProfileCardStyled>
  )
}
