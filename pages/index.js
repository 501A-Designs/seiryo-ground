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

import { VscChevronRight,VscAccount,VscLinkExternal,VscAdd,VscHeart,VscLocation,VscMegaphone,VscBook,VscSignOut,VscSignIn, VscSave, VscClose, VscRocket, VscMenu, VscFold, VscGithubAlt, VscComment } from "react-icons/vsc";

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
import Link from 'next/link'
import End from '../lib/End'


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
            minWidth:`${isBrowser ? '200px':'200px'}`,
            position: 'sticky',
            top: '0px',
            display: 'flex',
            height: `${isBrowser ? '100vh':'fit-content'}`,
            flexDirection: 'column',
            justifyContent:'space-between',
            background: 'linear-gradient(to top, rgba(255, 255, 255, 0.9) 0%,white 100%)',
            zIndex:10
          }}
        >
          <StaticGrid>
            <div
              style={{
                padding:'1.5em 0'
              }}
            >
              <AlignItems spaceBetween={true} justifyContent={'space-between'}>
                <h3
                  className="seiryoGroundFont"
                  style={{
                    letterSpacing:'-1.5px',
                    fontWeight:'normal',
                    lineHeight:'0.9em',
                    minWidth:'max-content',
                    margin:0
                  }}
                >
                  SEIRYO GROUND
                </h3>
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
                          iconPosition={'left'}
                          icon={<VscAdd/>}
                          onClick={()=>{
                            scroll.scrollToTop();
                            setCreateNew(true);
                          }}
                        >
                          場所を追加
                        </Button>
                        <Button
                          iconPosition={'left'}
                          icon={<VscHeart/>}
                          onClick={()=>router.push('/like')}
                        >
                          好きな場所
                        </Button>
                      </>:
                      <Button
                        iconPosition={'left'}
                        icon={<VscSignIn/>}
                        onClick={()=>signInWithGoogle()}
                      >
                        GOOGLEでログイン
                      </Button>
                    }
                  </>
                }
                <Button
                  iconPosition={'left'}
                  icon={<VscComment/>}
                  onClick={()=>router.push('/news')}
                >
                  SG NEWS
                </Button>
                <Button
                  iconPosition={'left'}
                  icon={<VscBook/>}
                  onClick={()=>router.push('/about')}
                >
                  SGについて
                </Button>
                <Button
                  iconPosition={'left'}
                  icon={<VscGithubAlt/>}
                  onClick={()=>router.push('https://github.com/501A-Designs/seiryo-ground')}
                >
                  GITHUBを開く
                </Button>
                {user && 
                  <Button
                    iconPosition={'left'}
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
                    <img src={user.photoURL} width="40" height="40" style={{borderRadius: '10px'}}/>
                    <h3 style={{color:'black',minWidth:'max-content',}}>{user.displayName}</h3>
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
                  '/sg-mountain.png',
                  '/sg-mountain2.png',
                  // '/seiryo-green.png',
                  // '/seiryo-blue.png',
                  // '/seiryo-red.png',
                  // '/seiryo-purple.png',
                ]}
                displacmentImage={'https://raw.githubusercontent.com/robin-dela/hover-effect/master/images/heightMap.png'}
                speed={5}
              />
              <div style={{minHeight: '20vh', textAlign:'right'}}>
                <p>Photo By <Link href="https://twitter.com/EyesObsolete"><a>@EyesObsolete</a></Link></p>
                <h3>
                  Welcome to Seiryo Ground<br/>清涼広場へようこそ
                </h3>
              </div>
            </>
          }
          {newPostNumber > 0 && <p>新しい場所追加：{newPostNumber}個</p>}
          <StaticGrid grid={isBrowser ? '1fr 1fr':'1fr'}>
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
          </StaticGrid>
          <End/>
        </StaticGrid>
      </div>
    </div>
  )
}
