import React, {useState,useEffect} from 'react'
import Head from 'next/head'
import AlignItems from '../lib/alignment/AlignItems'
import PostThumbNail from '../lib/component/PostThumbNail'
import Button from '../lib/button/Button'

import { useRouter } from 'next/router'

import {auth,db} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, collection, query, where, getDoc } from "firebase/firestore";

import CreatePlaceForm from '../lib/landing-page/CreatePlaceForm'
import DistortionCarousel from '../lib/landing-page/DistortionCarousel'
import { useCollection } from 'react-firebase-hooks/firestore';

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { signOut } from 'firebase/auth'
import Select from 'react-select'

import WelcomeHeader from '../lib/landing-page/WelcomeHeader'
import { FiInfo } from 'react-icons/fi'
import Container from '../lib/component/Container'
import { ClipLoader } from 'react-spinners'
import Grid from '../lib/alignment/Grid'
import PopularPlace from '../lib/landing-page/PopularPlace'
import ThisMonthPlace from '../lib/ThisMonthPlace'
import useSound from 'use-sound'
import Footer from '../lib/component/Footer'
import UniversalNav from '../lib/component/UniversalNav'
import Margin from '../lib/alignment/Margin'
import End from '../lib/End'
import { styled } from '../stitches.config'
import Selector from '../lib/component/Selector'
import useSWR from 'swr'

const Heading = styled('h2',{
  fontFamily:'$sgFont2'
})

export default function Home({prefecD}) {
  let masonaryGrid = {350: 1, 750: 2, 900: 3, 1200:4};

  console.log(prefecD)
  const router = useRouter();

  const [parent] = useAutoAnimate();
  const [progress, setProgress] = useState(0);  

  // Sound
  const [select1] = useSound('/sound/select-1-sg.mp3');
  const [alert1] = useSound('/sound/alert-1-sg.mp3');
  
  // Modal / Popup State
  const [gettingStartedModalIsOpen, setGettingStartedModalIsOpen] = useState(false);

  // Auth & Firestore
  const [user] = useAuthState(auth);
  const [placesCollection, placeCollectionLoading] = useCollection(collection(db, `places`))

  const [prefectureInput, setPrefectureInput] = useState('東京都');
  const userData = getDoc(doc(db, `users/${user && user.uid}`));

  useEffect(() => {
    if (
      user &&
      user.metadata.creationTime == user.metadata.lastSignInTime
    ){
      setGettingStartedModalIsOpen(true)
      if (localStorage.getItem('getStartedComplete')) {
        setGettingStartedModalIsOpen(false)
      }
    }
  }, [user])

  const [filteredPlaces,filteredPlacesLoading] = useCollection(query(collection(db, `places`),where("prefecture", "==",`${prefectureInput && prefectureInput}`)));

  return (
    <>
      <Head>
        <title>SEIRYO GROUND</title>
        <meta
          property="og:image"
          content="https://seiryo-ground.vercel.app/api/static"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      
      {/* <GettingStartedModal
        modalState={gettingStartedModalIsOpen}
        user={user}
        closeModal={()=>{
          setGettingStartedModalIsOpen(false);
          alert1();
        }}
      /> */}
      <Grid>
        <WelcomeHeader/>
        <DistortionCarousel
          images={[
            '/mountain-green.jpg',
            '/sg-mountain2.png',
            '/blue-sky.jpg',
            '/sg-mountain.png',
            '/open-nakameguro.jpg',
          ]}
          displacmentImage={'https://raw.githubusercontent.com/robin-dela/hover-effect/master/images/heightMap.png'}
          speed={0.8}
        />
      </Grid>
      <Margin>
        <Grid gap={'extraExtraLarge'}>
          {/* <Container>
            <Grid gap={'small'}>
              <AlignItems spaceBetween>
                <Grid>
                  <h2>Explore</h2>
                  <p>清涼広場で一番人気な場所です</p>
                </Grid>
              </AlignItems>
              <PopularPlace placeId={'0vfygL14nXcv0iSNgrt9'}/>
              <ThisMonthPlace placeId={'0vfygL14nXcv0iSNgrt9'}/>
            </Grid>
          </Container> */}

          <Container ref={parent}>
            <Grid gap={'small'}>
              <AlignItems spaceBetween>
                <Heading>Most Liked</Heading>
              </AlignItems>
              {placesCollection && <ResponsiveMasonry
                columnsCountBreakPoints={masonaryGrid}
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
              {placeCollectionLoading && 
                <Container
                  type='standard'
                  alignment='center'
                >
                  <ClipLoader color="black"/>
                </Container>
              }
            </Grid>
          </Container>

          {/* Filter Section */}
          <Container>
            <Grid gap={'small'}>
              <AlignItems spaceBetween>
                <Selector
                  placeholder={'都道府県を選択'}
                  value={prefectureInput}
                  onValueChange={setPrefectureInput}
                >
                  {prefecD.map(obj => {
                    return (
                      <Selector.Item
                        key={obj.iso}
                        value={obj.prefecture_kanji}
                      >
                        {obj.prefecture_kanji} / {obj.prefecture_romaji.toUpperCase()}
                      </Selector.Item>
                    )
                  })}
                </Selector>
                {filteredPlaces?.docs.length > 0 && <Heading>{filteredPlaces?.docs.length} Found</Heading>}
              </AlignItems>
              <div>
                {filteredPlaces && filteredPlaces.docs.length > 0 ?
                  <ResponsiveMasonry columnsCountBreakPoints={masonaryGrid}>
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
                      <Container
                        type='standard'
                        alignment='center'
                      >
                        <p>
                          ここにある場所は現在何も見つかりません。
                        </p>
                      </Container>
                    }
                  </>
                }
                {filteredPlacesLoading &&
                  <Container
                    type='standard'
                    alignment='center'
                  >
                    <ClipLoader color="black"/>
                  </Container>
                }
              </div>
            </Grid>
          </Container>

          {/* All Locations */}
          <Container>
            <Grid gap={'medium'}>
              <Heading>All Locations</Heading>
              {placesCollection && 
                <ResponsiveMasonry
                  columnsCountBreakPoints={masonaryGrid}
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
                </ResponsiveMasonry>
              }
              {placeCollectionLoading && 
                <Container
                  type='standard'
                  alignment='center'
                >
                  <ClipLoader color="black"/>
                </Container>
              }
            </Grid>
          </Container>
        </Grid>
      </Margin>
      <End>
        おわり。
        <br/>
        The End.
      </End>
      <Footer type={'blur'}/>
      <UniversalNav
        // animate={'scaleUp'}
        showInitially={false}
        scrollPop={true}
        popOnMount={false}
        minSize={'s'}
        maxSize={'l'}
        dynamicButton={user ? 
          <CreatePlaceForm
            user={user}
            prefecD={prefecD}
          />:
          <Button
            size={'small'}
            styleType={'transparent'}
            icon={<FiInfo/>}
            onClick={()=>router.push('/about')}
          />
        }
      />
    </>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://raw.githubusercontent.com/piuccio/open-data-jp-prefectures/master/prefectures.json`)
  const prefecD = await res.json()

  // Pass data to the page via props
  return { props: { prefecD } }
}
