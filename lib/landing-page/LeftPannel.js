import { styled } from '@stitches/react';
import React from 'react'
import AlignItems from '../alignment/AlignItems';
import StaticGrid from '../alignment/StaticGrid';
import { leftSlideIn, popOut, spin } from '../ux/keyframes';

export default function LeftPannel(props) {
  let user = props.user;

  const LeftPannel = styled('div', {
    userSelect:'none',
    // maxWidth:'300px',
    // minWidth:'200px',
    // position: 'sticky',
    padding:'1.5em',
    top: '0px',
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    justifyContent:'space-between',
    background: 'linear-gradient(to left, var(--sgLightGray) 0%,white 100%)',
    borderRight: '1px solid var(--sgMediumGray)',
    borderRadius: '0 30px 30px 0',
    zIndex:1,
    animation: `${leftSlideIn} 1s`,
  })

  const LeftPanelHeader = styled('div',{
    minWidth:'max-content',
    margin:0,
    padding:0,
    writingMode:'vertical-lr',
    'p':{
      margin:0
    },
    'h2':{
      marginLeft:0
    }
  })

  const ProfileContainer = styled('div', {
    backgroundColor:'black',
    boxShadow:'0 0 10px var(--sgLightGray)',
    border: '1px solid var(--sgGray)',
    borderRadius: '15px',
    marginTop: '1.5em',
    padding: '1em',
    display: 'flex',
    justifyContent: 'left',
    animation: `${popOut} 0.7s`,
    'img':{
      borderRadius: '50px',
      border: '1px solid gray',
      animation: `${spin} linear infinite 10s`
    },
    'h4':{
      color:'var(--sgLightGray)',
      minWidth:'min-content',
      margin:0
    }
  })

  const Footer = styled('footer', {

  })

  return (
    <LeftPannel>
      <LeftPanelHeader>
        <p>
          Designed & Produced by 501A.
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
            <ProfileContainer>
              <AlignItems gap={'1em'}>
                <img
                  width='25'
                  height= '25'
                  src={user.photoURL}
                />
                <h4>{user.displayName.split(' ')[0]}</h4>
              </AlignItems>
            </ProfileContainer>
          }
        </StaticGrid>
      </Footer>
    </LeftPannel>
  )
}
