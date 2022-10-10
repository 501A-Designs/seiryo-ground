import React, {useState,useEffect} from 'react'
import Head from 'next/head'
import AlignItems from '../lib/alignment/AlignItems'
import styles from '../styles/Home.module.css'
import logo from '../public/sg-banner-logo.png'
import PostThumbNail from '../lib/PostThumbNail'
import Button from '../lib/button/Button'

import { useRouter } from 'next/router'

import {app,analytics,auth,db} from '../firebase'
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { doc, collection, query, where } from "firebase/firestore";

import LoadingBar from 'react-top-loading-bar';

import StaticGrid from '../lib/alignment/StaticGrid'

import CreatePlaceForm from '../lib/landing-page/CreatePlaceForm'
import DistortionCarousel from '../lib/landing-page/DistortionCarousel'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

import End from '../lib/End'

import FetchSinglePlace from '../lib/FetchSinglePlace'

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import { useAutoAnimate } from '@formkit/auto-animate/react'
import {notificationSound, selectSound, tapSound} from '../lib/ux/audio'
import { signOut } from 'firebase/auth'
import Select from 'react-select'
import { prefectureData } from '../prefectureData'
import ThisMonthPlace from '../lib/ThisMonthPlace'

import LeftPannel from '../lib/landing-page/LeftPannel'
import WelcomeHeader from '../lib/landing-page/WelcomeHeader'
import CreatePlaceFormContainer from '../lib/landing-page/CreatePlaceFormContainer'
import { scroll } from '../lib/ux/scroll'
import { FiCheckCircle, FiCornerLeftUp, FiGithub, FiInfo, FiLogIn, FiLogOut } from 'react-icons/fi'
import NoneFound from '../lib/component/Container'
import Container from '../lib/component/Container'
import { ClipLoader } from 'react-spinners'
import { popOut } from '../lib/ux/keyframes'
import MainBody from '../lib/component/MainBody'
import GettingStartedModal from '../lib/landing-page/GettingStartedModal'
import StickyAlign from '../lib/alignment/StickyAlign'
import RightPannel from '../lib/landing-page/RightPannel'

export default function Home() {
  const router = useRouter();

  const [parent] = useAutoAnimate();
  const [progress, setProgress] = useState(0);  
  
  // Modal / Popup State
  const [gettingStartedModalIsOpen, setGettingStartedModalIsOpen] = useState(false);

  // Auth & Firestore
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);
  const [placesCollection, placeCollectionLoading] = useCollection(collection(db, `places`))

  const [prefectureInput, setPrefectureInput] = useState('東京都');
  const [userLikesArray] = useDocument(doc(db, `users/${user && user.uid}`));

  useEffect(() => {
    if (user && user.metadata.creationTime == user.metadata.lastSignInTime && userLikesArray !== undefined) {
      // console.log(user.metadata.creationTime,user.metadata.lastSignInTime)
      setGettingStartedModalIsOpen(true)
    }
  }, [user])

  const [filteredPlaces,filteredPlacesLoading] = useCollection(query(collection(db, `places`),where("prefecture", "==",`${prefectureInput && prefectureInput}`)));

  const selectStyle = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'black' : 'white',
      color: state.isSelected ? 'white' : 'black',
      padding: '0.5em 1em',
      "&:hover": {
        cursor: 'pointer',
        background: "var(--sgLightGray)",
        color:'black',
      }
    }),
    control: base => ({
      ...base,
      // none of react-select's styles are passed to <Control />
      width: '100%',
      borderRadius:'5px 5px 0px 0px',
      border:'none',
      borderBottom: '1px solid var(--sgGray)',
      padding:'0em',
      fontSize: '1.6em',
      outline: 'none',
      color: 'black',
      boxShadow: 'none',
      width:'fit-content',
      "&:hover": {
        backgroundColor: 'var(--sgLightGray)',
        cursor: 'pointer',
        // borderColor: "var(--sgLightGray)"
      }
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    }
  }
  


  return (
    <MainBody>
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
      
      <GettingStartedModal
        modalState={gettingStartedModalIsOpen}
        user={user}
        closeModal={()=>{
          setGettingStartedModalIsOpen(false);
          notificationSound();
        }}
      />

      <StickyAlign>
        <LeftPannel user={user}>
          {!user &&
            <Button
              iconPosition={'left'}
              icon={<FiLogIn/>}
              onClick={()=>{
                signInWithGoogle();
              }}
            >
              Googleでログイン
            </Button>
          }
          <Button
            iconPosition={'left'}
            icon={<FiCheckCircle/>}
            onClick={()=>{
              router.push('/news');
            }}
          >
            ニュース
          </Button>
          <Button
            iconPosition={'left'}
            icon={<FiInfo/>}
            onClick={()=>{
              router.push('/about');
            }}
          >
            清涼広場について
          </Button>
          <Button
            iconPosition={'left'}
            icon={<FiGithub/>}
            onClick={()=>{
              router.push('https://github.com/501A-Designs/seiryo-ground');
            }}
          >
            GitHubを開く
          </Button>
          {user &&
            <Button
              iconPosition={'left'}
              icon={<FiLogOut/>}
              onClick={()=>{
                signOut(auth)
              }}
            >
              ログアウト
            </Button>
          }
        </LeftPannel>

        <RightPannel>
          <StaticGrid gap={'3em'}>
            <StaticGrid>
              <WelcomeHeader/>
              <DistortionCarousel
                images={[
                  '/blue-sky.jpg',
                  '/mountain-green.jpg',
                  '/sg-mountain.png',
                  '/open-nakameguro.jpg',
                  '/sg-mountain2.png',
                ]}
                displacmentImage={'https://raw.githubusercontent.com/robin-dela/hover-effect/master/images/heightMap.png'}
                speed={0.8}
              />
            </StaticGrid>

            {user &&
              <CreatePlaceFormContainer>
                <CreatePlaceForm user={user}/>
              </CreatePlaceFormContainer>
            }

            <StaticGrid gap={'0.7em'}>
              <AlignItems spaceBetween>
                <h2 style={{margin:'0', width:'fit-content'}}>
                  More than 0 likes
                </h2>
              </AlignItems>
              <div ref={parent}>
                {placesCollection && <ResponsiveMasonry
                  columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200:4,1500:6}}
                >
                  <Masonry gutter={'0.25em'}>
                    {placesCollection.docs.map(doc => {
                      if (doc.data().likes.length > 0) {
                        return (
                          <PostThumbNail
                            key={doc.id}
                            id={doc.id}
                            title={doc.data().name}
                            type={doc.data().type}
                          />
                        )
                      }
                    })}
                  </Masonry>
                </ResponsiveMasonry>}
                {placeCollectionLoading && <Container><ClipLoader color="black"/></Container>}
              </div>
            </StaticGrid>

            {/* <h3 style={{margin:'0 0.2em 0 0'}}>他の場所</h3> */}
            {/* Filter Section */}
            <StaticGrid gap={'0.7em'}>
              <AlignItems spaceBetween>
                <AlignItems gap={'0.5em'}>
                  <h2 style={{margin:'0 0.2em 0 0'}}>Filter: </h2>
                  <Select
                    styles={selectStyle}
                    options={prefectureData}
                    components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                    onChange={(e)=>{
                      selectSound();
                      setPrefectureInput(e.value);
                    }}
                    placeholder={prefectureInput ? prefectureInput:'都道府県を選択'}
                  />
                </AlignItems>
                {filteredPlaces && filteredPlaces.docs.length > 0 && <h3 style={{margin:0}}>合計{filteredPlaces.docs.length}カ所</h3>}
              </AlignItems>
              <div ref={parent}>
                {filteredPlaces && filteredPlaces.docs.length > 0 ?
                  <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200:4,1500:6}}>
                    <Masonry gutter={'0.25em'}>
                      {filteredPlaces.docs.map(doc => {
                        return (
                          <PostThumbNail
                            key={doc.id}
                            id={doc.id}
                            title={doc.data().name}
                            type={doc.data().type}
                          />
                        )
                      })}
                    </Masonry>
                  </ResponsiveMasonry>:
                  <>
                    {!filteredPlacesLoading &&
                      <Container>
                        <p>{prefectureInput}にある場所は現在何も見つかりません。</p>
                      </Container>
                    }
                  </>
                }
                {filteredPlacesLoading && <Container><ClipLoader color="black"/></Container>}
              </div>
            </StaticGrid>

            {/* All Locations */}
            <StaticGrid gap={'0.7em'}>
              <AlignItems spaceBetween>
                <h2 style={{margin:'0', width:'fit-content'}}>
                  All Locations
                </h2>
                {/* <Button
                  onClick={()=> {
                    buttonSound();
                    router.push('/fullmap')
                  }}
                >
                  地図で探す
                </Button> */}
              </AlignItems>
              <div ref={parent}>
                {placesCollection && <ResponsiveMasonry
                  columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200:4,1500:6}}
                >
                  <Masonry
                    gutter={'0.25em'}
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200:4,1500:6}}
                  >
                    {placesCollection.docs.map(doc => {
                      return (
                        <PostThumbNail
                          key={doc.id}
                          id={doc.id}
                          title={doc.data().name}
                          type={doc.data().type}
                        />
                      )
                    })}
                  </Masonry>
                </ResponsiveMasonry>}
                {placeCollectionLoading && <Container><ClipLoader color="black"/></Container>}
              </div>
            </StaticGrid>

            <Button
              iconPosition={'left'}
              icon={<FiCornerLeftUp/>}
              onClick={()=>{scroll.scrollToTop();}}
            >
              上へ戻る
            </Button>
            <End/>
          </StaticGrid>
        </RightPannel>
      </StickyAlign>


    </MainBody>
  )
}
