import { doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { FiBook, FiCommand, FiCornerLeftUp, FiCreditCard, FiHome, FiInfo, FiLogIn, FiMoreHorizontal, FiRefreshCw } from 'react-icons/fi';
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
import { useEffect, useRef, useState } from 'react';
import { scroll } from '../ux/scroll';
import Profile from '../../pages/profile';
import ProfileContainer from '../profile-page/ProfileContainer';

const expandAni = keyframes({
  '10%':{
    width: '260px',
    transform:'scale(1.05)'
  },
  '50%':{
    transform:'scale(0.80)'
  }
});

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
    transform: 'translate3d(0, 80px, 0)',
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
  bottom: '$medium',
  zIndex:100,
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  variants:{
    hide:{
      true:{
        animation:`${hideAni} 0.2s`,
      },
      false:{
        animation:`${showAni} 0.2s`,
      }
    },
  }
})

const NavStyled = styled('section',{
  display: 'flex',
  justifyContent:'space-between',
  alignItems:'center',
  gap:'$small',

  maxHeight: '45px',
  padding:'calc($small*0.5)',
  borderRadius:'$round',
  backdropFilter: 'blur(10px)',
  border: '1px solid $grayA4',

  backgroundColor:'white',
  boxShadow:'$shadow3',
  transition:'$speed1',

  variants:{
    size:{
      xl:{
        width: '300px',
      },
      l:{
        width: '200px',
      },
      m:{
        width: '150px',
      },
      s:{
        width: '100px',
      },
      auto:{
        width:'fit-content'
      }
    },
    animate:{
      expand:{
        animation:`${expandAni} 0.3s linear`,
      },
      jiggle:{
        animation:`${jiggleAni} 0.8s linear infinite`
      },
      shine:{
        background: '$mix',
        backgroundSize: '200% 200%',
        animation: `${gradient} 1s linear infinite`,
      },
      scaleUp:{
        animation: `${scaleUpAni} 1s ease infinite`,
      }
    },
  }
})

const ProfileCard = styled('footer', {
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
  // border:'none',
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

  const [hide, setHide] = useState(props.hideInitially ? true:false);
  const [hideDelay, setHideDelay] = useState(props.hideInitially ? true:false)
  const [hideScrollUp, setHideScrollUp] = useState(props.hideInitially ? true:false);
  useEffect(() => {
    if (props.hideInitially) {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
        currentScrollY < 100 ? setHide(true):setHide(false);
        currentScrollY < 1000 ? setHideScrollUp(true):setHideScrollUp(false);
      }
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    };
  }, [hide]);
  useEffect(()=>{
    if (hide) {
      setTimeout(()=>setHideDelay(true),200);
    }else{
      setTimeout(()=>setHideDelay(false),200);
    }
  })

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'u' && e.metaKey) {
        router.push('/profile')
      }
      if (e.key === 'm' && e.metaKey) {
        router.push('/')
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])


  return (
    <>
      {!hideDelay &&
        <NavContainerStyled  
          hide={hide}
        >
          <NavStyled          
            animate={props.animate}
            size={props.size ? props.size:!hideScrollUp ? 'l':'s'}
          >
            {props.dynamicButton}
            {!hideScrollUp &&
              <Button
                size={'small'}
                styleType={'transparent'}
                icon={<FiCornerLeftUp/>}
                onClick={()=>{scroll.scrollToTop();}}
              >
                上へ戻る
              </Button>
            }

            <Dialog
              title={'Menu'}
              trigger={
                <Button
                  size={'small'}
                  styleType={'transparent'}
                  icon={<FiCommand/>}
                />
              }
            >
              <>
                <ProfileContainer
                  size={'l'}
                  user={user}
                />
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
          </NavStyled>
        </NavContainerStyled>
      }
    </>
  )
}
