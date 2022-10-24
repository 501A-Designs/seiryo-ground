import { doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useDocument } from 'react-firebase-hooks/firestore';
import { FiRefreshCw } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';
import useSound from 'use-sound';
import { db } from '../../firebase';
import { styled } from '../../stitches.config';
import AlignItems from '../alignment/AlignItems';
import { checkLevel } from '../function/checkLevel';
import { leftSlideIn, popOut, gradient, spin } from '../ux/keyframes';

const LeftPannelStyled = styled('section', {
  position: 'sticky',
  userSelect:'none',
  top: '0px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent:'space-between',
  zIndex:100,
  animation: `${leftSlideIn} 1s`,

  '@mobile':{
    background: 'linear-gradient(to top, transparent 0%,white 100%)',
    // backdropFilter: 'blur(10px)',
    // maskImage: 'linear-gradient(to top,transparent, black 60%)',
    // WebkitMasKImage: 'linear-gradient(to top,#000 25%,transparent)',
  },
  '@tablet':{
    background: 'linear-gradient(to left, $sgGray1 0%,white 100%)',
    borderRight: '1px solid $sgGray2',
    borderRadius: '0 $r4 $r4 0',
    height: '100vh',
  },
  '@desktop':{
    background: 'linear-gradient(to left, $sgGray1 0%,white 100%)',
    borderRight: '1px solid $sgGray2',
    borderRadius: '0 $r4 $r4 0',
    height: '100vh',
  },
  
  'header':{
    minWidth:'max-content',
    margin:0,
    padding: '$large',
    fontFamily: '$sgFont2',
    'h3':{
      fontWeight: 'normal',
    },
    'p':{
      margin:0,
    },
    '@mobile':{
      'h3':{
        fontSize:'$6',
        margin:0
      }
    },
    '@tablet':{
      writingMode:'vertical-lr',
      'h3':{
        fontSize:'$4',
        marginLeft:0
      }
    },
    '@desktop':{
      writingMode:'vertical-lr',
      'h3':{
        fontSize:'$4',
        marginLeft:0
      }
    },

  }
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

const ProfileContainerStyled = styled('div', {
  background: '$sgBlackBackground',
  fontFamily: '$sgFont1',
  boxShadow:'0 0 10px $sgGray1',
  border: '1px solid $sgGray1',
  borderRadius: '$round',
  marginTop: '1.5em',
  display: 'flex',
  justifyContent: 'left',
  cursor: 'pointer',
  transition:'$speed1',
  padding: '$small',
  animation: `${popOut} 1s`,
  '@tablet':{
    padding: '$extraSmall',
    width: 'fit-content',
  },
  'img':{
    borderRadius: '$round',
    border: '1px solid gray',
    animation: `${spin} linear infinite 10s`
  },
  'h4':{
    color:'$sgGray1',
    minWidth:'min-content',
    margin:0,
    '@tablet':{
      display: 'none',
    }
  },
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

export default function LeftPannel(props) {
  let user = props.user;
  const router = useRouter();

  const [tap4] = useSound('/sound/tap-4-sg.mp3');

  let status = false
  const [userData,loadingUserData] = useDocument(doc(db, `users/${user && user.uid}`))

  return (
    <LeftPannelStyled>
      <header>
        <p>
          Designed & Produced by 501A.
        </p>
        <h3>
          SEIRYO GROUND
          <br/>
          清涼広場
        </h3>
      </header>
      <Footer>
        {props.children}
        {user && 
          <>
            {userData &&
              <>
                {checkLevel(userData.data().postCount,userData.data().reviewCount) === userData.data().level ?
                  <ProfileContainerStyled
                    onClick={()=>{
                      tap4();
                      router.push('/profile')
                    }}
                    color={status}
                  >
                    <AlignItems gap={'1em'}>
                      <img
                        width='35'
                        height= '35'
                        src={user.photoURL}
                      />
                      <h4>
                        {user.displayName.split(' ')[0]}
                      </h4>
                    </AlignItems>
                  </ProfileContainerStyled>:
                  <CardUpdateStyled
                    onClick={()=>{
                      tap4();
                      router.push('/profile')
                    }}
                  >
                    <div>
                      <FiRefreshCw/>
                      <p>アップデート</p>
                    </div>
                  </CardUpdateStyled>
                }
              </>
            }
            {loadingUserData && 
              <AlignItems justifyContent={'center'} height={'100px'}>
                <ClipLoader size={20}/>
              </AlignItems>
            }
          </>
        }
      </Footer>
    </LeftPannelStyled>
  )
}
