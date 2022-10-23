import { useRouter } from 'next/router';
import { styled } from '../../stitches.config';
import AlignItems from '../alignment/AlignItems';
import { leftSlideIn, popOut, spin } from '../ux/keyframes';

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
  // backgroundColor:'black',
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
    transform: 'scale(1.05)',
  }
})

export default function LeftPannel(props) {
  let user = props.user;
  const router = useRouter();

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
          <ProfileContainerStyled
            onClick={()=>router.push('/profile')}
          >
            <AlignItems gap={'1em'}>
              <img
                width='35'
                height= '35'
                src={user.photoURL}
              />
              <h4>{user.displayName.split(' ')[0]}</h4>
            </AlignItems>
          </ProfileContainerStyled>
        }
      </Footer>
    </LeftPannelStyled>
  )
}
