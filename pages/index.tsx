import React, {useState,useEffect, useContext} from 'react'
import Head from 'next/head'
import AlignItems from '../lib/alignment/AlignItems'
import PostThumbNail from '../lib/component/PostThumbNail'
import Button from '../lib/button/Button'

import { useRouter } from 'next/router'

import {db} from '../firebase'
import { collection, query, where } from "firebase/firestore";

import CreatePlaceForm from '../lib/landing-page/CreatePlaceForm'
import { useCollection } from 'react-firebase-hooks/firestore';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import WelcomeHeader from '../lib/landing-page/WelcomeHeader'
import Container from '../lib/component/Container'
import { ClipLoader } from 'react-spinners'
import Grid from '../lib/alignment/Grid'
import useSound from 'use-sound'
import Footer from '../lib/component/Footer'
import UniversalNav from '../lib/component/UniversalNav'
import Margin from '../lib/alignment/Margin'
import End from '../lib/End'
import Selector from '../lib/component/Selector'
import { UserContext } from '../lib/util/UserContext'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Heading } from '../lib/landing-page/Heading'

export default function Home({prefecD}) {
  let masonaryGrid = {350: 1, 750: 2, 900: 3, 1200:4};
  const router = useRouter();
  
  const [placesCollection,placeCollectionLoading] = useCollection(collection(db, `places`));
  
  // Modal / Popup State
  const [gettingStartedModalIsOpen, setGettingStartedModalIsOpen] = useState(false);

  // Auth & Firestore
  const userContextData = useContext(UserContext);
  const user = userContextData?.user;
  const userData = userContextData?.userData;

  const [prefectureInput, setPrefectureInput] = useState('東京都');

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
      <Margin>
        <Grid gap={'extraExtraLarge'}>
          <WelcomeHeader/>

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

          {/* Filter Section */}
          <Grid gap={'small'}>
            <AlignItems spaceBetween>
              <Heading>Filter Spots ({filteredPlaces?.docs.length})</Heading>
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
                      {obj.prefecture_kanji}
                    </Selector.Item>
                  )
                })}
              </Selector>
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

          {/* All Locations */}
          <Grid gap={'small'}>
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
        </Grid>
        <End>
          おわり。
          <br/>
          The End.
        </End>
      </Margin>
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
            icon={<InfoCircledIcon/>}
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
  const prefecD = await res.json();  

  // Pass data to the page via props
  return {
    props: {
      prefecD
    }
  }
}
