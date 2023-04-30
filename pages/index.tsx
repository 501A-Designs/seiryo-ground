import React, { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import AlignItems from '../lib/alignment/AlignItems'
import PostThumbNail from '../lib/component/PostThumbNail'
import Button from '../lib/component/button/Button'

import { useRouter } from 'next/router'

import { auth, db } from '../firebase'
import { DocumentData, QuerySnapshot, collection, getCountFromServer, getDocs, limit, orderBy, query, where } from "firebase/firestore";

import CreatePlaceForm from '../lib/landing-page/CreatePlaceForm'

import WelcomeHeader from '../lib/landing-page/WelcomeHeader'
import Grid from '../lib/alignment/Grid'
import Footer from '../lib/component/Footer'
import UniversalNav from '../lib/component/UniversalNav'
import Margin from '../lib/alignment/Margin'
import End from '../lib/End'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { jsonParse } from '../lib/util/jsonParse'
import RadixSelect from '../lib/component/radix/Select'
import Image from 'next/image'
import mountainGreen from '../public/img/mountain-green.jpg'
import Rating from '../lib/Rating'
import { useAuthState } from 'react-firebase-hooks/auth'
import { round } from '../lib/util/helper'
import { GetServerSideProps } from 'next'
import { useCollection } from 'react-firebase-hooks/firestore'

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import useLocale from '../lib/util/useLocale'

export const getServerSideProps = async () => {
  const res = await fetch(`https://raw.githubusercontent.com/piuccio/open-data-jp-prefectures/master/prefectures.json`)
  const prefectureData = await res.json();

  // const placeDataArray = [];
  // const placeCollection = collection(db, `places`);
  // const placesCollectionSnapshot: QuerySnapshot<DocumentData> = await getDocs(query(placeCollection, limit(25)));
  // const placesCollectionMostLikedSnapshot: QuerySnapshot<DocumentData> = await getDocs(query(placeCollection, orderBy('likes', 'desc'), limit(25)));
  // const placeCount = await getCountFromServer(placeCollection);

  // const topFiveAccess = query(placeCollection, orderBy(`averageRating.access`), limit(5));
  // const topFiveDate = query(placeCollection, orderBy(`averageRating.date`), limit(5));
  // const topFiveManagement = query(placeCollection, orderBy(`averageRating.management`), limit(5));

  // const placesCollectionSnapshot: QuerySnapshot<DocumentData> = await getDocs(placeCollection);

  // let likesSum:number = 0;
  // let accessRatingSum:number = 0;
  // let dateRatingSum:number = 0;
  // let managementRatingSum:number = 0;

  // for (const doc of placesCollectionSnapshot.docs) {
  //   const docData = doc.data();
  //   likesSum += docData.likes?.length != undefined ? docData.likes.length:0;
  //   accessRatingSum += docData.averageRating?.access != undefined ? docData.averageRating.access:0;
  //   dateRatingSum += docData.averageRating?.date != undefined ? docData.averageRating.date:0;
  //   managementRatingSum += docData.averageRating?.management != undefined ? docData.averageRating.management:0;

  //   // Generate custom array of places
  //   placeDataArray.push({
  //     id:doc.id,
  //     data:doc.data()
  //   });
  // }

  // const placeCountData = jsonParse(placeCount.data().count);
  // const likesAverage = round(likesSum/placeCountDataRaw);
  // const accessRatingAverage = round(accessRatingSum/placeCountDataRaw);
  // const dateRatingAverage = round(dateRatingSum/placeCountDataRaw);
  // const managementRatingAverage = round(managementRatingSum/placeCountDataRaw);
  // const placesData = jsonParse(placeDataArray);
  // const accessRanking = jsonParse(topFiveAccess);
  // const dateRanking = jsonParse(topFiveDate);
  // const managementRanking = jsonParse(topFiveManagement);

  return {
    props: {
      prefectureData
    }
  }
}

export default function Home({ prefectureData }) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const { t } = useLocale();
  const tLABEL = t.LABEL;
  const tINPUT = t.INPUT;
  const tBUTTON = t.BUTTON;

  const modifiedPrefectureData = [
    {
      iso: '00',
      prefecture_kanji: '全て表示',
      prefecture_romaji: 'All',
    },
    ...prefectureData
  ];
  const [prefectureInput, setPrefectureInput] = useState('全て表示');

  const placesCollectionRef = collection(db, `places`);
  const [placesCollection, placeCollectionLoading] = useCollection(
    query(
      placesCollectionRef,
      limit(25)
    )
  );
  const [filteredPlaceCollection, filteredPlaceCollectionLoading] = useCollection(
    query(
      placesCollectionRef,
      where("prefecture", "==", prefectureInput),
      limit(25)
    )
  );


  const [gettingStartedModalIsOpen, setGettingStartedModalIsOpen] = useState(false);

  useEffect(() => {
    if (
      user &&
      user.metadata.creationTime == user.metadata.lastSignInTime
    ) {
      setGettingStartedModalIsOpen(true)
      if (localStorage.getItem('getStartedComplete')) {
        setGettingStartedModalIsOpen(false)
      }
    }
  }, [user])

  // useEffect(() => {
  //   let filteredArray:any = [];
  //   placesCollection?.map(doc => {
  //     if (doc.data.prefecture == prefectureInput) {
  //       filteredArray.push(doc)
  //     }
  //   })
  //   setFilteredPlaceCollection(filteredArray)
  // }, [prefectureInput])

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
          <WelcomeHeader />


          <Grid gap={'small'}>
            <AlignItems justifyContent={'spaceBetween'}>
              <p>Explore</p>
              <RadixSelect
                placeholder={'都道府県を選択'}
                value={prefectureInput}
                onValueChange={setPrefectureInput}
              >
                {modifiedPrefectureData.map(obj => {
                  return (
                    <RadixSelect.Item
                      key={obj.iso}
                      value={obj.prefecture_kanji}
                    >
                      {obj.prefecture_kanji}
                    </RadixSelect.Item>
                  )
                })}
              </RadixSelect>
            </AlignItems>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry
                gutter={'0.5em'}
              >
                {
                  prefectureInput == "全て表示" ?
                    placesCollection?.docs?.map(doc => <PostThumbNail
                      key={doc.id}
                      id={doc.id}
                      data={doc.data()}
                    />
                    ) : filteredPlaceCollection?.docs?.map(doc => <PostThumbNail
                      key={doc.id}
                      id={doc.id}
                      data={doc.data()}
                    />
                    )
                }
              </Masonry>
            </ResponsiveMasonry>
          </Grid>

          {/*
          {averages.likes}

          <Grid gap={'small'}>
            <AlignItems justifyContent={'center'}>
              <h4>項目別ランク</h4>
            </AlignItems>
            <Grid
              grid={'tri'}
              gap={'small'}
            >
              <Grid gap={'small'}>
                <AlignItems spaceBetween>
                  <p>デートスボット適正</p>
                </AlignItems>
                <Grid>
                  {placesCollection.map(doc => {
                    if (doc.data.likes.length > likesSum/placesCollection.length) {
                      return (
                        <PostThumbNail
                          key={doc.id}
                          id={doc.id}
                          data={doc.data}
                        />
                      )
                    }
                  })}
                </Grid>
                <Rating
                  fill
                  rating={averages.date}
                  description={'平均'}
                />
              </Grid>
              <Grid gap={'small'}>
                <AlignItems spaceBetween>
                  <p>最寄り駅へのアクセス</p>
                </AlignItems>

                <Grid>
                  {placesCollection.map(doc => {
                    if (doc.data.likes.length > likesSum/placesCollection.length) {
                      return (
                        <PostThumbNail
                          key={doc.id}
                          id={doc.id}
                          data={doc.data}
                        />
                      )
                    }
                  })}
                </Grid>
                <Rating
                  fill
                  rating={averages.access}
                  description={'平均'}
                />
              </Grid>
              <Grid gap={'small'}>
                <AlignItems spaceBetween>
                  <p>設備管理の状況</p>
                </AlignItems>
                <Grid>
                  {placesCollection.map(doc => {
                    if (doc.data.likes.length > likesSum/placesCollection.length) {
                      return (
                        <PostThumbNail
                          key={doc.id}
                          id={doc.id}
                          data={doc.data}
                        />
                      )
                    }
                  })}
                </Grid>
                <Rating
                  fill
                  rating={averages.management}
                  description={'平均'}
                />
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>

        <End>{t.END_FOOTER.END}</End>

      </Margin>
      <Footer type={'blur'} />
      <UniversalNav
        showInitially={false}
        scrollPop={true}
        popOnMount={false}
        minSize={'s'}
        maxSize={'l'}
        dynamicButton={user ?
          <CreatePlaceForm
            user={user}
            prefecD={prefectureData}
          /> :
          <Button
            size={'small'}
            styleType={'transparent'}
            icon={<InfoCircledIcon />}
            onClick={() => router.push('/about')}
          />
        }
      />
    </>
  )
}
