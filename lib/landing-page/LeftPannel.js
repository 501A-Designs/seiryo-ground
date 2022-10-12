
import { styled } from '../../stitches.config';
import AlignItems from '../alignment/AlignItems';
import StaticGrid from '../alignment/StaticGrid';
import { leftSlideIn, popOut, spin } from '../ux/keyframes';

const LeftPannelStyled = styled('section', {
  userSelect:'none',
  padding:'1.5em',
  top: '0px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent:'space-between',
  background: 'linear-gradient(to left, $sgGray1 0%,white 100%)',
  WebkitBackdropFilter:'saturate(1.8) blur(20px)',
  borderRight: '1px solid $sgGray2',
  borderRadius: '0 $r4 $r4 0',
  zIndex:1,
  animation: `${leftSlideIn} 1s`,
  'header':{
    minWidth:'max-content',
    margin:0,
    padding:0,
    writingMode:'vertical-lr',
    fontFamily: '$sgFont2',
    'p':{
      margin:0,
    },
    'h2':{
      marginLeft:0
    }
  }
})

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
  animation: `${popOut} 0.7s`,
  'img':{
    borderRadius: '50px',
    border: '1px solid gray',
    animation: `${spin} linear infinite 10s`
  },
  'h4':{
    color:'$sgGray1',
    minWidth:'min-content',
    margin:0
  }
})

export default function LeftPannel(props) {
  let user = props.user;



  return (
    <LeftPannelStyled>
      <header>
        <p>
          Designed & Produced by 501A.
        </p>
        <h2>
          SEIRYO GROUND
          <br/>
          清涼広場
        </h2>
      </header>
      <footer>
        <StaticGrid>
          {props.children}
          {user && 
            <ProfileContainerStyled>
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
      </footer>
    </LeftPannelStyled>
  )
}
