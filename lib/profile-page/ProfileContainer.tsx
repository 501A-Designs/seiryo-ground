import { useRouter } from 'next/router'
import React from 'react'
import { styled } from '../../stitches.config'
import AlignItems from '../alignment/AlignItems'
import Grid from '../alignment/Grid'
import Button from '../button/Button'
import ProfileImage from './ProfileImage'
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { gradient } from '../ux/keyframes'
import { EnterIcon } from '@radix-ui/react-icons'

const ProfileCardStyled = styled('div',{
  cursor:'pointer',
  borderRadius:'$r3',
  padding:'calc($small/1.5)',
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
  variants:{
    upgradable:{
      true:{
        border:'1px solid $gray3',
        background: 'linear-gradient(45deg,$gray7 0%,$gray1 50%,$gray7 100%)',
        backgroundSize: '200% 200%',
        animation:`${gradient} linear 1s infinite`,
      },
      false:{
        border:'1px solid $gray3',
        backgroundColor:'$gray2',
      }
    }
  }
})

const ProfileCardContentStyled = styled('div',{
  backdropFilter:'blur(20px)',
  backgroundColor:'$gray1',
  border:'1px solid $gray4',
  boxShadow:'$shadow1',
  borderRadius:'$r2',
  padding: '$large',
})

export default function ProfileContainer({upgradable}:{upgradable:boolean}) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  console.log(user)

  return (
    <ProfileCardStyled
      onClick={()=>router.push('/profile')}
      upgradable={upgradable}
    >
      <ProfileCardContentStyled>
        {user ?
          <AlignItems gap={'1em'}>
            <ProfileImage
              width={'35'}
              height={'35'}
              alt={'profile image'}
              src={user.photoURL}
              onClick={()=>{
                router.push('/profile')
              }}
            />
            <Grid>
              <h4>
                {user.displayName}
              </h4>
              <p>{user.email}</p>
            </Grid>
          </AlignItems>:
          <AlignItems justifyContent={"center"} flexDirection={"column"} gap={'1em'}>
            <h4>ログインする必要があります</h4>
            <Button
              size={'medium'}
              styleType={'black'}
              icon={<EnterIcon/>}
              onClick={()=>signInWithGoogle()}
            >
              アカウント作成
            </Button> 
          </AlignItems>
        }
      </ProfileCardContentStyled>
    </ProfileCardStyled>
  )
}
