import React, {useState,useEffect, useContext} from 'react'
import Head from 'next/head'
import AlignItems from '../lib/alignment/AlignItems'
import PostThumbNail from '../lib/component/PostThumbNail'
import Button from '../lib/button/Button'

import { useRouter } from 'next/router'

import {db} from '../firebase'
import { DocumentData, QuerySnapshot, collection, getCountFromServer, getDocs } from "firebase/firestore";

import CreatePlaceForm from '../lib/landing-page/CreatePlaceForm'

import WelcomeHeader from '../lib/landing-page/WelcomeHeader'
import Grid from '../lib/alignment/Grid'
import Footer from '../lib/component/Footer'
import UniversalNav from '../lib/component/UniversalNav'
import Margin from '../lib/alignment/Margin'
import End from '../lib/End'
import { UserContext } from '../lib/util/UserContext'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { jsonParse } from '../lib/util/jsonParse'
import RadixSelect from '../lib/component/radix/Select'
import Image from 'next/image'
import mountainGreen from '../public/img/mountain-green.jpg'
import Rating from '../lib/Rating'

export default function Home({prefecD,placeCountData,placesData}) {
  const router = useRouter();
  const [placesCollection] = useState(placesData);

  const likesAverage:number = placesCollection.reduce((sum, element) => sum + element.data.likes.length, 0)/placeCountData;


  let accessAverage:number = 0;
  let dateAverage:number = 0;
  let managementAverage:number = 0;
  const addValues = (type:string, sumVariable:number) => {
    placesCollection.map((i:any) => {
      let rateValue = i?.data?.averageRating?.[type];
      if(rateValue != undefined) sumVariable = sumVariable + rateValue;
    });
  }

  addValues("access", accessAverage);
  addValues("date", dateAverage);
  addValues("management", managementAverage);

  console.log(
    accessAverage,
    dateAverage,
    managementAverage
  )

  const [prefectureInput, setPrefectureInput] = useState('東京都');  
  const [gettingStartedModalIsOpen, setGettingStartedModalIsOpen] = useState(false);

  // Auth & Firestore
  const userContextData = useContext(UserContext);
  const user = userContextData?.user;
  const userData = userContextData?.userData;

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

  const [filteredPlaceCollection,setFilteredPlaceCollection] = useState([]);
  useEffect(() => {
    let filteredArray:any = [];
    placesCollection?.map(doc => {
      if (doc.data.prefecture == prefectureInput) {
        filteredArray.push(doc)
      }
    })
    setFilteredPlaceCollection(filteredArray)
  }, [prefectureInput])


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
              <p>全ての場所</p>
              <p>{placesCollection.length}ヶ所</p>
            </AlignItems>
            <Grid grid={'quad'}>
              {placesCollection.map(doc => {
                return (
                  <PostThumbNail
                    key={doc.id}
                    id={doc.id}
                    data={doc.data}
                  />
                )
              })}
            </Grid>
          </Grid>

          {/* Filter Section */}
          <Grid gap={'small'}>
            <AlignItems spaceBetween>
              <p>県で絞る（{filteredPlaceCollection?.length}）</p>
              <RadixSelect
                placeholder={'都道府県を選択'}
                value={prefectureInput}
                onValueChange={setPrefectureInput}
              >
                {prefecD.map(obj => {
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
            <Grid grid={'quad'}>
              {filteredPlaceCollection?.length > 0 ? filteredPlaceCollection?.map(doc => {
                return (
                  <PostThumbNail
                    key={doc.id}
                    id={doc.id}
                    data={doc.data}
                  />
                )
              }):<h2>現在ありません。</h2>}
            </Grid>
          </Grid>

          <Image
            alt={'Mountain Image'}
            src={mountainGreen}
            placeholder='blur'
            // fill
            layout={"responsive"}
            style={{
              marginTop:'5em',
              borderRadius:10,
            }}
          />


          {likesAverage}

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
                <Rating
                  fill
                  rating={dateAverage}
                  description={'平均'}
                />
                <Grid>
                  {/* {placesCollection.map(doc => {
                    if (doc.data.likes.length > likesSum/placesCollection.length) {
                      return (
                        <PostThumbNail
                          key={doc.id}
                          id={doc.id}
                          data={doc.data}
                        />
                      )
                    }
                  })} */}
                </Grid>
              </Grid>
              <Grid gap={'small'}>
                <AlignItems spaceBetween>
                  <p>最寄り駅へのアクセス</p>
                </AlignItems>
                <Rating
                  fill
                  // rating={accessAverage}
                  description={'平均'}
                />
                <Grid>
                  {/* {placesCollection.map(doc => {
                    if (doc.data.likes.length > likesSum/placesCollection.length) {
                      return (
                        <PostThumbNail
                          key={doc.id}
                          id={doc.id}
                          data={doc.data}
                        />
                      )
                    }
                  })} */}
                </Grid>
              </Grid>
              <Grid gap={'small'}>
                <AlignItems spaceBetween>
                  <p>設備管理の状況</p>
                </AlignItems>
                <Rating
                  fill
                  rating={managementAverage}
                  description={'平均'}
                />
                <Grid>
                  {/* {placesCollection.map(doc => {
                    if (doc.data.likes.length > likesSum/placesCollection.length) {
                      return (
                        <PostThumbNail
                          key={doc.id}
                          id={doc.id}
                          data={doc.data}
                        />
                      )
                    }
                  })} */}
                </Grid>
              </Grid>
            </Grid>
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
  const res = await fetch(`https://raw.githubusercontent.com/piuccio/open-data-jp-prefectures/master/prefectures.json`)
  const prefecD = await res.json();

  const placeDataArray = [];
  const placeCollection = collection(db, `places`);
  const placesCollectionSnapshot: QuerySnapshot<DocumentData> = await getDocs(placeCollection);
  const placeCount = await getCountFromServer(placeCollection);
  
  for (const doc of placesCollectionSnapshot.docs) {
    placeDataArray.push({
      id:doc.id,
      data:doc.data()
    });
  }

  const placeCountData = jsonParse(placeCount.data().count)
  const placesData = jsonParse(placeDataArray);

  return {
    props: {
      prefecD,
      placeCountData,
      placesData
    }
  }
}
