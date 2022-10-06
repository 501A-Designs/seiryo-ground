import { styled } from '@stitches/react';
import { useRouter } from 'next/router';
import React from 'react'
import AlignItems from '../alignment/AlignItems';
import Footer from '../Footer';
import StaticGrid from '../alignment/StaticGrid';
import { leftSlideIn, popOut, spin } from '../ux/keyframes';

export default function LeftPannel(props) {
  let user = props.user;

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
  return (
    <div
      style={{
        userSelect:'none',
        maxWidth:'300px',
        minWidth:'200px',
        position: 'sticky',
        top: '0px',
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        justifyContent:'space-between',
        background: 'linear-gradient(to left, var(--sgLightGray) 0%,white 100%)',
        borderRadius: '0 30px 30px 0',
        zIndex:1,
        animation: `${leftSlideIn} 1s`,
      }}
    >
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
            <div
              style={{ 
                backgroundColor:'black',
                boxShadow:'0 0 10px var(--sgLightGray)',
                border: '1px solid var(--sgGray)',
                marginRight:'1em',
                marginTop:'1em',
                borderRadius: '15px',
                padding: '1em',
                display: 'flex',
                justifyContent: 'left',
                animation: `${popOut} 0.7s`,
              }}
              // onClick={()=> {
              //   buttonSound();
              //   router.push('/user');
              // }}
            >
              <AlignItems gap={'1em'}>
                <img
                  style={{
                    borderRadius: '50px',
                    border: '1px solid gray',
                    animation: `${spin} linear infinite 10s`
                  }}
                  src={user.photoURL}
                  width="25"
                  height="25"
                />
                <h4
                  style={{
                    color:'var(--sgLightGray)',
                    minWidth:'min-content',
                    margin:0
                  }}
                >
                  {user.displayName.split(' ')[0]}
                </h4>
              </AlignItems>
            </div>
          }
        </StaticGrid>
      </Footer>
    </div>
  )
}
