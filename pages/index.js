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

import { VscChevronRight,VscAccount,VscLinkExternal,VscAdd,VscHeart,VscBook,VscSignOut,VscSignIn, VscSave, VscClose, VscRocket, VscMenu, VscFold, VscGithubAlt, VscComment } from "react-icons/vsc";

import {app,analytics,auth,db} from '../firebase'
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { doc, addDoc, collection, query, where, getDocs,getDoc } from "firebase/firestore";

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


import Modal from 'react-modal';
import FetchSinglePlace from '../lib/FetchSinglePlace'

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"


const customStyles = {
  content: {
    top: '5%',
    left: '80%',
    bottom: 'auto',
    padding: '0',
    width:'20%',
    maxHeight:'85%',
    overflowY:'scroll',
    borderRadius: '5px 0 0 5px',
    boxShadow: '0px 0px 15px #f0f0f0',
    zIndex:2,
  },
  overlay: {
    background: 'linear-gradient(to right,rgba(255,255,255,0) 0%,white 100%)',
    // backdropFilter: `blur(3px)`,
    zIndex:20,
    cursor:'pointer'
  }
};

export default function Home() {
  const router = useRouter();
  let scroll = Scroll.animateScroll;

  const [modalIsOpen, setModalIsOpen] = useState(0);

  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);
  const [progress, setProgress] = useState(0);
  const [likesArray, setLikesArray] = useState();

  let placesArray = [];
  const [fetchedData, setFetchedData] = useState();

  const fetchData = async () => {
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
    setProgress(60);

    const userDocRef = doc(db, `users/${user && user.uid}`);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      setLikesArray(docSnap.data().likes);
    }
    setProgress(100)
  }
  
  useEffect(() => {
    fetchData();
  }, [user])

  const [createNew, setCreateNew] = useState(false);
  const createNewRef = useRef();
  
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

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={()=>setModalIsOpen(false)}
      >
        <div
          style={{
            backgroundColor: 'black',
            color: 'white',
          }}
        >
          <AlignItems justifyContent={'center'}>
            <h5>好きな場所一覧</h5>
          </AlignItems>
        </div>
        <StaticGrid grid={'1fr'} gap={'0'}>
          {likesArray && likesArray.length > 0 &&
            <>
              {likesArray.map((likes)=>{
                return(
                  <FetchSinglePlace
                    key={likes}
                    documentId={likes}
                  />
                )
              })
              }
            </>
          }
        </StaticGrid>
      </Modal>

      <div className={'stickySide'}>
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
            zIndex:1
          }}
        >
          <h2
            style={{
              minWidth:'max-content',
              margin:0,
              marginTop: '1em',
              padding:0,
              writingMode:'vertical-lr',
              textOrientation:'mixed'
            }}
          >
            SEIRYO GROUND
            <br/>
            清涼広場
          </h2>
          <StaticGrid>
            <StaticGrid>
              {!user &&
                <Button
                  iconPosition={'left'}
                  icon={<VscSignIn/>}
                  onClick={()=>signInWithGoogle()}
                >
                  Googleでログイン
                </Button>
              }
              <Button
                iconPosition={'left'}
                icon={<VscComment/>}
                onClick={()=>router.push('/news')}
              >
                ニュース
              </Button>
              <Button
                iconPosition={'left'}
                icon={<VscBook/>}
                onClick={()=>router.push('/about')}
              >
                清涼広場について
              </Button>
              <Button
                iconPosition={'left'}
                icon={<VscGithubAlt/>}
                onClick={()=>router.push('https://github.com/501A-Designs/seiryo-ground')}
              >
                GitHubを開く
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
            </StaticGrid>
            <Footer></Footer>
          </StaticGrid>
        </section>


        <StaticGrid gap={'0.5em'}>
          {user &&          
            <AlignItems spaceBetween margin={'1.5em 0 0 0'}>
              <AlignItems>
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
                  onClick={()=>setModalIsOpen(true)}
                >
                  好きな場所
                </Button>
              </AlignItems>
              <div style={{padding:'0em',backgroundColor: 'white'}}>
                <AlignItems gap={'0.5em'}>
                  <img src={user.photoURL} width="20" height="20" style={{borderRadius: '50px'}}/>
                  <h4 style={{color:'black',minWidth:'max-content',}}>{user.displayName}</h4>
                </AlignItems>
              </div>
            </AlignItems>
          }
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
              <div
                style={{
                  minHeight: '20vh',
                  textAlign:'right',
                  display: 'flex',
                  justifyContent: 'right'
                }}
              >
                <div
                  style={{
                    alignSelf: 'flex-end'
                  }}
                >
                  <p>Photo By <Link href="https://twitter.com/EyesObsolete"><a>@EyesObsolete</a></Link></p>
                  <h3 style={{ margin:0}}>
                    清涼広場へようこそ
                  </h3>
                  <p style={{ margin:0}}>
                    DMS Lat: 35° 39' 10.1952''N
                    DMS Long: 139° 50' 22.1208''E
                  </p>
                </div>
              </div>
              <DistortionCarousel
                images={[
                  '/sg-mountain.png',
                  '/sg-mountain2.png',
                ]}
                displacmentImage={'https://raw.githubusercontent.com/robin-dela/hover-effect/master/images/heightMap.png'}
                speed={5}
              />
            </>
          }

          <h2 style={{marginBottom:'0.1em'}}>Recent</h2>
          <ResponsiveMasonry
            columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200:4}}
          >
            <Masonry
              gutter={'0.25em'}
            >
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
            </Masonry>
          </ResponsiveMasonry>

          <h2 style={{marginBottom:'0.1em'}}>In Tokyo</h2>
          <ResponsiveMasonry
            columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200:4}}
          >
            <Masonry
              gutter={'0.25em'}
            >
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
            </Masonry>
          </ResponsiveMasonry>

          <h2 style={{marginBottom:'0.1em'}}>All Location</h2>
          <ResponsiveMasonry
            columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200:4}}
          >
            <Masonry
              gutter={'0.25em'}
            >
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
            </Masonry>
          </ResponsiveMasonry>
          {/* <StaticGrid grid={isBrowser ? '1fr 1fr 1fr':'1fr'} gap={'0.25em'}>
          </StaticGrid> */}
          <End/>
        </StaticGrid>
      </div>
    </div>
  )
}
