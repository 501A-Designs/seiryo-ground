import React, {useState,useEffect,useRef} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import AlignItems from '../lib/AlignItems'
import Button from '../lib/Button'
import Footer from '../lib/Footer'
import styles from '../styles/Home.module.css'
import logo from '../public/sg-banner-logo.png'
import PostThumbNail from '../lib/PostThumbNail'

import { useRouter } from 'next/router'

import { VscChevronRight,VscAccount,VscLinkExternal,VscAdd,VscHeart,VscLocation,VscMegaphone,VscBook,VscSignOut,VscSignIn, VscSave, VscClose, VscRocket, VscMenu, VscFold } from "react-icons/vsc";

import {app,analytics,auth,db} from '../firebase'
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { doc, addDoc, collection, query, where, getDocs } from "firebase/firestore";

import LoadingBar from 'react-top-loading-bar';

import Input from '../lib/Input'
import TextArea from '../lib/TextArea'

import StaticGrid from '../lib/StaticGrid'
import TypeButton from '../lib/TypeButton'



import * as Scroll from 'react-scroll';
import CreatePlaceForm from '../lib/CreatePlaceForm'
import DistortionCarousel from '../lib/DistortionCarousel'


import { isBrowser } from 'react-device-detect';


export default function Home() {
  const router = useRouter();
  let scroll = Scroll.animateScroll;

  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user, loading, error] = useAuthState(auth);
  const [progress, setProgress] = useState(0);

  let placesArray = [];
  const [fetchedData, setFetchedData] = useState()

  const fetchData = async () => {
    // , where("published", "==", true)
    const querySnapshot = await getDocs(query(collection(db, "places")))
    if (placesArray.length === 0) {                
      querySnapshot.forEach((doc) => {
        placesArray.push(
          {
            data:doc.data(),
            id:doc.id
          }
        );
      });
      setFetchedData(placesArray);
      setProgress(30);
    }
    setProgress(100)
  }
  
  useEffect(() => {
    fetchData();
  }, [user])

  const [createNew, setCreateNew] = useState(false);
  const createNewRef = useRef();
  let newPostNumber = 0;
  
  const [menuDisplay, setMenuDisplay] = useState(false);
  useEffect(() => {
    if (isBrowser) {
      setMenuDisplay(true);
    }
  }, [isBrowser])
  
  
  return (
    <div
      className={'pagePadding'}
    >
      <LoadingBar
        color='black'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Head>
        <title>SEIRYO GROUND</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={'stickySide'}
      >
        <section
          style={{
            maxWidth:`${isBrowser ? '300px':'400px'}`,
            position: 'sticky',
            top: '0px',
            display: 'flex',
            height: `${isBrowser ? '100vh':'fit-content'}`,
            flexDirection: 'column',
            justifyContent:'space-between',
            backgroundColor:'white',
            zIndex:10
          }}
        >
          <StaticGrid>
            <div
              style={{
                padding:'1.5em 0'
              }}
            >
              <AlignItems spaceBetween={true} alignItems={'start'}>
                <h1
                  className="seiryoGroundFont"
                  style={{
                    letterSpacing:'-6px',
                    lineHeight:'0.9em',
                    margin:0
                  }}
                >
                  SEIRYO<br/>GROUND
                </h1>
                {!isBrowser &&
                  <Button
                    iconPosition={'right'}
                    icon={menuDisplay ? <VscFold/>:<VscMenu/>}
                    onClick={()=>{menuDisplay ? setMenuDisplay(false):setMenuDisplay(true)}}
                  />
                }
              </AlignItems>
            </div>

            {menuDisplay &&
              <>
                {isBrowser &&
                  <>                  
                    {user ?
                      <>
                        <Button
                          iconPosition={'right'}
                          icon={<VscAdd/>}
                          onClick={()=>{
                            scroll.scrollToTop();
                            setCreateNew(true);
                          }}
                        >
                          場所を追加
                        </Button>
                        <Button
                          icon={<VscHeart/>}
                          iconPosition={'right'}
                          onClick={()=>router.push('/like')}
                        >
                          好きな場所
                        </Button>
                      </>:
                      <Button
                        iconPosition={'right'}
                        icon={<VscSignIn/>}
                        onClick={()=>signInWithGoogle()}
                      >
                        GOOGLEでログイン
                      </Button>
                    }
                  </>
                }
                <Button
                  iconPosition={'right'}
                  icon={<VscLocation/>}
                  onClick={()=>router.push('/place')}
                >
                  場所を探す
                </Button>
                <Button
                  iconPosition={'right'}
                  icon={<VscMegaphone/>}
                  onClick={()=>router.push('/news')}
                >
                  SG NEWS
                </Button>
                <Button
                  iconPosition={'right'}
                  icon={<VscBook/>}
                  onClick={()=>router.push('/about')}
                >
                  SGについて
                </Button>
                <Button
                  iconPosition={'right'}
                  icon={<VscLinkExternal/>}
                  onClick={()=>router.push('https://github.com/501A-Designs/seiryo-ground')}
                >
                  GITHUBを開く
                </Button>
                {user && 
                  <Button
                    iconPosition={'right'}
                    icon={<VscSignOut/>}
                    onClick={()=>signInWithGoogle()}
                  >
                    ログアウト
                  </Button>
                }
              </>
            }
          </StaticGrid>
          {isBrowser && 
            <StaticGrid>
              {user ? 
                <div style={{padding:'0em',backgroundColor: 'white'}}>
                  <AlignItems gap={'1em'}>
                    <img src={user.photoURL} width="40" height="40" style={{borderRadius: '15px'}}/>
                    <h3 style={{color:'black'}}>{user.displayName}</h3>
                  </AlignItems>
                </div>:            
                <p>
                  外を歩き回り、今までいって良かった場所を一箇所にまとめた場所。カードをクリックして頂くと詳細やレビューを見ることができます。
                </p>
              }
              <Footer></Footer>
            </StaticGrid>
          }
        </section>
        <StaticGrid>
          {user ?
            <>
              {createNew && 
                <CreatePlaceForm
                  user={user}
                  ref={createNewRef}
                  closeThisForm={()=>setCreateNew(false)}
                />
              }
            </>:
            <>
              <DistortionCarousel
                images={[
                  '/seiryo-green.png',
                  '/seiryo-blue.png',
                  '/seiryo-red.png',
                  '/seiryo-purple.png',
                  // '/sg-centered-logo.png'
                ]}
                displacmentImage={'https://raw.githubusercontent.com/robin-dela/hover-effect/master/images/heightMap.png'}
                speed={5}
              />
              <h2 style={{minHeight: '20vh'}}>Welcome to Seiryo Ground.<br/>清涼広場へようこそ。</h2>
            </>
          }
          {newPostNumber > 0 && <p>新しい場所追加：{newPostNumber}個</p>}
            {fetchedData && fetchedData.map(doc => {
              return (
                <div
                  style={{
                    transformStyle: 'flat',
                    perspective: '600px'
                  }}
                  key={doc.id}
                >
                  <PostThumbNail
                    id={doc.id}
                    title={doc.data.name}
                    type={doc.data.type}
                  />
                </div>
              )
            })}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '1em',
              padding: '5% 0',
            }}
          >
            <div
              style={{
                backgroundColor:'black',
                width:'1px',
                height: '100px',
              }}
            />
            <h2
              style={{
                writingMode:'vertical-rl',
                textOrientation:'mixed'
              }}
            >
              終わり。
              <br/>
              The End.
            </h2>
          </div>
        </StaticGrid>
      </div>
    </div>
  )
}
