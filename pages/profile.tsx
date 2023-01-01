import { doc, setDoc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocument } from 'react-firebase-hooks/firestore';
import { FiArrowLeft, FiDownloadCloud, FiInfo, FiX } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';
import useSound from 'use-sound';
import { auth, db } from '../firebase'
import AlignItems from '../lib/alignment/AlignItems';
import Grid from '../lib/alignment/Grid';
import Margin from '../lib/alignment/Margin';
import Button from '../lib/button/Button';
import CenterAll from '../lib/component/CenterAll';
import Container from '../lib/component/Container';
import { checkLevel } from '../lib/function/checkLevel';
import { popOut, rotateAndZoom, rotateInBottonLeft, spin } from '../lib/ux/keyframes';
import { styled } from '../stitches.config';
import UniversalNav from '../lib/component/UniversalNav';

const Perspective = styled('div',{
  perspective: '200px',
  minHeight: '400px'
})

const Notification = styled('div',{
  textAlign: 'center',
  backgroundColor: 'black',
  padding: '1em 2.5em',
  borderRadius: '$round',
  width: 'fit-content',
  animation:`${popOut} 1s`,
  'h5':{
    margin: '0',
    color: 'white',
  },
  'p':{
    margin: '0',
    color: '$sgGray3',
  }
})

const VerticalText = styled('div',{
  fontSize:'$extraSmall',
  writingMode:'vertical-rl',
  'p':{
    margin: '0',
  }
})

const ProfileCard = styled('div',{
  borderRadius:'$r4',
  padding: '$extraLarge',
  width: '400px',
  height: 'auto',
  boxShadow: '$shadow2',
  border:'1px solid white',
  fontFamily: '$sgFont2',
  transition: '$speed1',
  animation: `${rotateInBottonLeft} 1s`,
  'img':{
    borderRadius: '$round',
    border: '1px solid $sgGray3',
    // boxShadow: '$shadow1',
    animation: `${spin} linear infinite 10s`
  },
  'h2':{
    margin:0
  },
  'p':{
    margin: '0',
  },
  'h5':{
    margin:0,
    fontWeight: 'normal',
    fontFamily:'$sgFont2'
  },

  // Levels
  variants:{
    level:{
      1:{
        color: 'black',
        background: '$levelOne',
        [`& ${VerticalText}`]:{
          color: 'gray',
        }
      },
      2:{
        color: '$blue1',
        background: 'linear-gradient(45deg, $blue11 0%, $blue8 100%)',
        [`& ${VerticalText}`]:{
          color: '$blue6',
        }
      },
      3:{
        color: '$green1',
        background: 'linear-gradient(45deg, $green11 0%, $green8 100%)',
        [`& ${VerticalText}`]:{
          color: '$green6',
        }
      },
      4:{
        color: '$orange1',
        background: 'linear-gradient(45deg, $orange11 0%, $orange8 100%)',
        [`& ${VerticalText}`]:{
          color: '$orange6',
        }
      },
      5:{
        color: '$gray1',
        background: 'linear-gradient(45deg, $gray12 0%, $gray11 100%)',
        [`& ${VerticalText}`]:{
          color: '$gray6',
        }
      },
    },
    rotateAndZoom:{
      true:{
        animation: `${rotateAndZoom} 2s`,
        'h2':{
          color:'black',
          margin:'0'
        },
        'p':{
          color:'black',
          fontFamily:'$sgFont1',
        }
      },
      false: {
        '&:hover':{
          transform: 'rotateX(1deg) rotateY(1deg)',
        },
      }
    }
  },
})


export default function Profile() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const [userData,loadingUserData] = useDocument(doc(db, `users/${user && user.uid}`));

  const [openDetails, setOpenDetails] = useState(false)
  const [showNewContent, setShowNewContent] = useState(false)
  const [loading, setLoading] = useState(false)

  const [load1] = useSound('/sound/load-1-sg.mp3')
  const [celebrate1] = useSound('/sound/celebrate-1-sg.mp3')
  const [celebrate2] = useSound('/sound/celebrate-2-sg.mp3')
  const [tap2] = useSound('/sound/tap-2-sg.mp3',{playbackRate:1.3})
  
  async function flip(){
    setOpenDetails(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    celebrate2();
    setShowNewContent(true);
  }

  async function reFlip(){
    setOpenDetails(false);
    setShowNewContent(false);
    tap2();
  }

  const [upgradableLevel, setUpgradableLevel] = useState(0);
  const upgrade = async() =>{
    setLoading(true);
    load1();
    await updateDoc(doc(db, `users/${user && user.uid}/`), {
      level:upgradableLevel,
    });
    reFlip();
    celebrate1();
    setLoading(false);
  }

  useEffect(() => {
    if (user && userData) {
      let postCount = userData.data().postCount;
      let reviewCount = userData.data().reviewCount;
      if (checkLevel(postCount,reviewCount) !== userData.data().level) {
        flip();
        setUpgradableLevel(checkLevel(postCount,reviewCount))
      }
    }
  },[userData])

  return (
    <Margin>
      <CenterAll>
        {user ?
          <Grid gap={'medium'}>
            {userData &&  
            <>
              <AlignItems justifyContent={'center'}>
                {openDetails &&
                  <Notification>
                    {loading ?
                      <ClipLoader color="white"/>:
                      <>
                        <h5>カードをアップグレードできます。</h5>
                        <p>清涼広場の機能をより活用しよう！</p>
                      </>
                    }
                  </Notification>
                }
              </AlignItems>
              {!loading &&           
                <Perspective>
                  <ProfileCard
                    level={userData.data().level}
                    rotateAndZoom={openDetails}
                  >
                    {showNewContent ?
                      <Grid gap={'medium'}>
                        <h3>{user.displayName}</h3>
                        <Container type="white">
                          <Grid gap={'large'}>
                            <Grid gap={'small'}>
                              <p>Level {userData.data().level}から</p>
                              <AlignItems>
                                <h2>Level {upgradableLevel}</h2>
                                <p>にアップグレード</p>
                              </AlignItems>
                            </Grid>
                            <p>
                              {user.displayName}おめでとうございます。
                              <br/>
                              いつもSEIRYO GROUNDへの貢献大変ありがとうございます。
                              <br/>
                              以下のボタンを押すとカードのアップグレードができます。
                            </p>
                            <AlignItems justifyContent={'center'}>
                              <Button
                                color='black'
                                onClick={()=>upgrade()}
                                iconPosition={'left'}
                                icon={<FiDownloadCloud/>}
                              >
                                アップグレード
                              </Button>
                            </AlignItems>
                          </Grid>
                        </Container>
                      </Grid>:
                      <AlignItems
                        justifyContent={'space-between'}
                        alignItems={'top'}
                      >
                        <Grid gap={'medium'}>
                          <h5>SEIRYO GROUND | 清涼広場</h5>
                          <Grid>
                            <h2>{user.displayName}</h2>
                            <p>{user.email}</p>
                          </Grid>
                        </Grid>
                        <VerticalText>
                          <p>Level {userData.data().level} Membership Card</p>
                          <p>{user.uid}</p>
                        </VerticalText>
                      </AlignItems>
                    }
                  </ProfileCard>
                </Perspective>
              }
            </>
            }
            {loadingUserData &&
              <AlignItems justifyContent={'center'}>
                <ClipLoader color="black"/>
              </AlignItems>
            }
          </Grid>:
          <h4>ログインする必要がございます</h4>
        }
      </CenterAll>
      {!loading &&
        <UniversalNav
          showInitially={true}
          minSize={'m'}
          maxSize={showNewContent ? 'xl':'m'}
          dynamicButton={
            <>
              <Button
                size={'small'}
                styleType={'transparent'}
                icon={<FiArrowLeft/>}
                onClick={() =>router.push('/')}
              />
              {showNewContent &&              
                <Button
                  styleType={'transparent'}
                  icon={<FiX/>}
                  onClick={()=>reFlip()}
                >
                  閉じる
                </Button>
              }
              <Button
                size={'small'}
                styleType={'transparent'}
                icon={<FiInfo/>}
                onClick={()=>router.push('/levels')}
              />
            </>
          }
        />
      }
    </Margin>
  )
}
