import { styled } from '@stitches/react';
import { useRouter } from 'next/router';
import React from 'react'
import AlignItems from '../AlignItems';
import Button from '../Button';
import Footer from '../Footer';
import { transitionDownSound, transitionUpSound } from '../sound/audio';
import StaticGrid from '../StaticGrid';

export default function LeftPannel(props) {
  let user = props.user;
  const LeftPannel = styled('div', {
    userSelect:'none',
    maxWidth:'300px',
    minWidth:'200px',
    position: 'sticky',
    top: '0px',
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    justifyContent:'space-between',
    background: 'linear-gradient(to left, var(--sgMediumGray) 0%,white 100%)',
    borderRadius: '0 30px 30px 0',
    zIndex:1,
    transform:'perspective(200px) scale(0.95) rotateX(0deg) rotateY(4deg)',
    transition: '0.4s',
    // '&:hover':{
    //   transform:'rotateX(0deg) rotateY(0deg)',
    // }
  })
  const LeftPanelHeader = styled('div',{
    minWidth:'max-content',
    margin:0,
    marginTop: '1em',
    padding:0,
    writingMode:'vertical-lr',
    textOrientation:'mixed',
    'p':{
      margin:0
    },
    'h2':{
      marginLeft:0
    }
  })
  const Profile = styled('div', {
    backgroundColor:'black',
    boxShadow:'0 0 10px var(--sgLightGray)',
    border: '1px solid var(--sgGray)',
    marginRight:'1em',
    marginTop:'1em',
    borderRadius: '15px',
    padding: '1em',
    display: 'flex',
    justifyContent: 'left',
    'img':{
      borderRadius: '50px',
      border: '1px solid var(--sgGray)',
    },
    'h4':{
      color:'var(--sgLightGray)',
      minWidth:'min-content',
      margin:0
    }
  })
  return (
    <LeftPannel
      // onMouseEnter={()=> transitionUpSound()}
      // onMouseLeave={()=> transitionDownSound()}
    >
      <LeftPanelHeader>
        <p>
          Designed & Produced by 501A.<br/>Managed By Eminent, a Design Nerd Duo.
        </p>
        <h2>
          SEIRYO GROUND
          <br/>
          清涼広場
        </h2>
      </LeftPanelHeader>
      <Footer>
        <StaticGrid>
          {props.children}
          {user && 
            <Profile
              // onClick={()=> {
              //   buttonSound();
              //   router.push('/user');
              // }}
            >
              <AlignItems gap={'1em'}>
                <img
                  src={user.photoURL}
                  width="25"
                  height="25"
                />
                <h4>{user.displayName.split(' ')[0]}</h4>
              </AlignItems>
            </Profile>
          }
        </StaticGrid>
      </Footer>
    </LeftPannel>
  )
}
