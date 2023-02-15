import React, {useState,useEffect, useContext} from 'react'
import Head from 'next/head'
import AlignItems from '../lib/alignment/AlignItems'
import PostThumbNail from '../lib/component/PostThumbNail'
import Button from '../lib/button/Button'

import { useRouter } from 'next/router'

import {db} from '../firebase'
import { collection, getDocs, query, where } from "firebase/firestore";

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
import { jsonParse } from '../lib/util/jsonParse'

export default function Home({prefecD,placesData}) {
  let masonaryGrid = {350: 1, 750: 2, 900: 3, 1200:4};
  const router = useRouter();
  
  // const [placesCollection,placeCollectionLoading] = useCollection(collection(db, `places`));

  const [placesCollection] = useState(placesData);
  console.log(placesCollection)
  
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
              <p>Most Liked</p>
            </AlignItems>
            {placesCollection && <ResponsiveMasonry
              columnsCountBreakPoints={masonaryGrid}
            >
              <Masonry gutter={'0.25em'}>
                {placesCollection.map(doc => {
                  if (doc.data.likes.length > 0) {
                    return (
                      <PostThumbNail
                        key={doc.id}
                        id={doc.id}
                        data={doc.data}
                      />
                    )
                  }
                })}
              </Masonry>
            </ResponsiveMasonry>}
          </Grid>

          {/* Filter Section */}
          {/* <Grid gap={'small'}>
            <AlignItems spaceBetween>
              <p>Filter Spots ({placesCollection?.length})</p>
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
              {placesCollection && <ResponsiveMasonry columnsCountBreakPoints={masonaryGrid}>
                  <Masonry gutter={'0.25em'}>
                    {placesCollection.map(doc => {
                      if (doc.data.likes.length > 0) {
                        return (
                          <PostThumbNail
                            key={doc.id}
                            id={doc.id}
                            data={doc.data}
                          />
                        )
                      }
                    })}
                  </Masonry>
                </ResponsiveMasonry>
              }
            </div>
          </Grid> */}

          {/* All Locations */}
          <Grid gap={'small'}>
            <p>All Locations</p>
            {placesCollection && 
              <ResponsiveMasonry
                columnsCountBreakPoints={masonaryGrid}
              >
                <Masonry
                  gutter={'0.25em'}
                  columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200:4,1500:6}}
                >
                  {placesCollection.map(doc => {
                    return (
                      <PostThumbNail
                        key={doc.id}
                        id={doc.id}
                        data={doc.data}
                      />
                    )
                  })}
                </Masonry>
              </ResponsiveMasonry>
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

  const placeDataArray = [];
  const placesCollectionSnapshot = await getDocs(collection(db, `places`));
  placesCollectionSnapshot.forEach((doc) => {
    placeDataArray.push(
      {
        id:doc.id,
        data:doc.data()
      }
    );
  });


  const placesData = jsonParse(placeDataArray);

  // Pass data to the page via props
  return {
    props: {
      prefecD,
      placesData
    }
  }
}
