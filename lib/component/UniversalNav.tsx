import { doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { FiBook, FiCreditCard, FiHome, FiInfo, FiLogIn, FiMoreHorizontal, FiRefreshCw } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';
import useSound from 'use-sound';
import { auth, db } from '../../firebase';
import AlignItems from '../alignment/AlignItems';
import Button from '../button/Button';
import { checkLevel } from '../function/checkLevel';
import Input from '../Input';
import Dialog from './Dialog';
import SectionButton from './SectionButton';

import { styled } from '../../stitches.config';
import { gradient, spin } from '../ux/keyframes';
import { keyframes } from "@stitches/react";
import { useState } from 'react';

const jiggleAni = keyframes({
  '10%, 90%':{
    transform: 'translate3d(-1px, 0, 0)',
  },
  '20%, 80%':{
    transform: 'translate3d(2px, 0, 0)',
  },
  '30%, 50%, 70%':{
    transform: 'translate3d(-4px, 0, 0)',
  },
  '40%, 60%':{
    transform: 'translate3d(4px, 0, 0)',
  }
});
const hideAni = keyframes({
  '100%':{
    transform: 'translate3d(0, 80px, 0)',
  },
});
const showAni = keyframes({
  '0%':{
    transform: 'translate3d(0, -80px, 0)',
  },
  '100%':{
    transform: 'translate3d(0, 0px, 0)',
  },
});

const scaleUpAni = keyframes({
  '50%':{
    transform: 'scale(1.05)',
  },
});

const NavContainerStyled = styled('nav', {
  position: 'sticky',
  userSelect:'none',
  width:'fit-content',
  minWidth: '150px',
  maxHeight: '45px',
  margin:'auto',
  padding:'0',
  borderRadius:'$round',
  bottom: '$medium',
  zIndex:100,
  backdropFilter: 'blur(10px)',
  border: '1px solid $grayA3',

  backgroundColor:'$gray12',
  boxShadow:'$shadow2',

  variants:{
    animate:{
      jiggle:{
        animation:`${jiggleAni} 0.8s linear infinite`
      },
      hide:{
        animation:`${hideAni} 1s`,
      },
      show:{
        animation:`${showAni} 1s`,
      },
      shine:{
        background: '$mix',
        backgroundSize: '200% 200%',
        animation: `${gradient} 1s linear infinite`,
      },
      scaleUp:{
        animation: `${scaleUpAni} 1s ease infinite`,
      }
    }
  }
})

const NavStyled = styled('section',{
  borderRadius:'$round',
  display: 'flex',
  justifyContent:'space-between',
  gap:'$small',
  // backgroundColor:'$gray1',
  backdropFilter:'blur(1px)',
  '@mobile':{
    // background: 'linear-gradient(to top, transparent 0%,white 100%)',
  },
  '@tablet':{
  },
  '@desktop':{
    // background: 'linear-gradient(to left, $sgGray1 0%, white 100%)',
  },
})

const Footer = styled('footer', {
  padding: '$large',
  perspective:'200px',
  '@mobile':{
    display: 'none',  
  },
  '@tablet':{
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',  
  },
  '@desktop':{
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',  
  },
});

const ProfileImageStyled = styled('img', {
  borderRadius: '$round',
  border:'none',
  border: '1px solid $grayA1',
  animation: `${spin} linear infinite 10s`,
  '&:hover':{
    transform: 'scale(1.07)',
  },
})

const CardUpdateStyled = styled('section', {
  fontFamily: '$sgFont1',
  boxShadow:'0 0 10px $sgGray1',
  border: '1px solid $sgGray1',
  borderRadius: '$r3',
  marginTop: '1.5em',
  cursor: 'pointer',
  transition:'$speed1',
  padding: '$extraSmall',
  width: '130px',
  background: '$mix',
  backgroundSize: '200% 200%',
  animation: `${gradient} 1s infinite`,
  'p':{
    margin:0
  },
  '&:hover':{
    transform: 'scale(1.07)',
  },
  'div':{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '$sgGray1',
    gap:'$small',
    backdropFilter: 'blur(30px)',
    borderRadius: '$r2',
    padding: '$medium',
  },
  '@mobile':{
    width: 'fit-content',
    'p':{
      display: 'none'
    }
  },
  '@tablet':{
    width: 'fit-content',
    'p':{
      display: 'none'
    }
  },
})

export default function UniversalNav(props) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  // const [userData,loadingUserData] = useDocument(doc(db, `users/${user && user.uid}`))

  const [jumpPage, setJumpPage] = useState('');

  return (
    <NavContainerStyled
      animate={props.animate}
    >
      <NavStyled>
        {user ?
          <ProfileImageStyled
            onClick={()=>{
              router.push('/profile')
            }}
            width='35'
            height='35'
            src={user.photoURL}
          />:
          <Button
            icon={<FiLogIn/>}
          >
            アカウント作成
          </Button> 
        }
        <Dialog
          title={'メニュー'}
          trigger={
            <Button
              size={'small'}
              styleType={'transparent'}
              icon={<FiMoreHorizontal/>}
              // onClick={()=>alert('bruh')}
            />
          }
        >
          <>
            <SectionButton
              icon={<FiHome/>}
            >
              ホーム
            </SectionButton>
            <SectionButton
              slug={'news'}
              icon={<FiBook/>}
            >
              SEIRYO NEWS
            </SectionButton>
            <SectionButton
              slug={'about'}
              icon={<FiInfo/>}
            >
              SEIRYO GROUNDとは？
            </SectionButton>
            <SectionButton
              slug={'levels'}
              icon={<FiCreditCard/>}
            >
              SEIRYO Cardについて
            </SectionButton>
            <SectionButton
              slug={'tos'}
              icon={<FiInfo/>}
            >
              利用規約
            </SectionButton>
          </>
        </Dialog>
        {props.dynamicButton}
      </NavStyled>
      {/* <Footer>
        {!user &&
          <Button
            color='transparent'
            iconPosition={'left'}
            icon={<FiLogIn/>}
            onClick={()=>{
              signInWithGoogle();
            }}
          >
            ログイン
          </Button>
        }
        <Button
          color='transparent'
          iconPosition={'left'}
          icon={<FiCheckCircle/>}
          onClick={()=>{
            router.push('/news');
          }}
        >
          ニュース
        </Button>
        <Button
          color='transparent'
          iconPosition={'left'}
          icon={<FiInfo/>}
          onClick={()=>{
            router.push('/about');
          }}
        >
          清涼広場とは
        </Button>
        <Button
          color='transparent'
          iconPosition={'left'}
          icon={<FiGithub/>}
          onClick={()=>{
            router.push('https://github.com/501A-Designs/seiryo-ground');
          }}
        >
          GitHubを開く
        </Button>
        {user &&
          <Button
            color='transparent'
            iconPosition={'left'}
            icon={<FiLogOut/>}
            onClick={()=>{
              signOut(auth)
            }}
          >
            ログアウト
          </Button>
        }
        {user && 
          <>
            {userData && userData.data() &&
              <>

              </>
              // <></>
            }
            {loadingUserData && 
              <AlignItems justifyContent={'center'} height={'100px'}>
                <ClipLoader size={20}/>
              </AlignItems>
            }
          </>
        }
      </Footer> */}
    </NavContainerStyled>
  )
}
