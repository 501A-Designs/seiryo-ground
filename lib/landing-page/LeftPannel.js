
import { useRouter } from 'next/router';
import { styled } from '../../stitches.config';
import AlignItems from '../alignment/AlignItems';
import StaticGrid from '../alignment/StaticGrid';
import { tapSound } from '../ux/audio';
import { leftSlideIn, popOut, spin } from '../ux/keyframes';

const LeftPannelStyled = styled('section', {
  userSelect:'none',
  top: '0px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent:'space-between',
  WebkitBackdropFilter:'saturate(1.8) blur(20px)',
  zIndex:1,
  animation: `${leftSlideIn} 1s`,
  padding:'1.5em',
  '@desktop':{
    background: 'linear-gradient(to left, $sgGray1 0%,white 100%)',
    borderRight: '1px solid $sgGray2',
    borderRadius: '0 $r4 $r4 0',
  },
  'header':{
    minWidth:'max-content',
    margin:0,
    padding:0,
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
  '@mobile':{
    display: 'none',  
  },
  '@desktop':{      
    display: 'block',  
  },
});

const ProfileContainerStyled = styled('div', {
  backgroundColor:'black',
  fontFamily: '$sgFont1',
  boxShadow:'0 0 10px $sgGray1',
  border: '1px solid $sgGray1',
  borderRadius: '$round',
  marginTop: '1.5em',
  padding: '0.5em',
  display: 'flex',
  justifyContent: 'left',
  cursor: 'pointer',
  transition:'$speed1',
  animation: `${popOut} 1s`,
  'img':{
    borderRadius: '$round',
    border: '1px solid gray',
    animation: `${spin} linear infinite 10s`
  },
  'h4':{
    color:'$sgGray1',
    minWidth:'min-content',
    margin:0
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
        <StaticGrid>
          {props.children}
          {user && 
            <ProfileContainerStyled
              onMouseEnter={()=> tapSound()}
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
        </StaticGrid>
      </Footer>
    </LeftPannelStyled>
  )
}
