import { useRouter } from 'next/router'
import React, { useState,useEffect, useContext } from 'react'
import AlignItems from '../../lib/alignment/AlignItems'
import TypeBadge from '../../lib/TypeBadge'

import { auth, db } from '../../firebase'
import { DocumentData, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, increment, setDoc, updateDoc } from "firebase/firestore";
import Rating from '../../lib/Rating'

import LoadingBar from 'react-top-loading-bar';
import Review from '../../lib/place-page/Review'
import Input from '../../lib/Input'
import TextArea from '../../lib/TextArea'
import End from '../../lib/End'

import Button from '../../lib/button/Button'
import TypeButton from '../../lib/button/TypeButton'

import moment from 'moment';
import 'moment/locale/ja'
import DisplayRatingInput from '../../lib/place-page/DisplayRatingInput'
import { isBrowser } from 'react-device-detect'

import Head from 'next/head'

import Container from '../../lib/component/Container'
import Grid from '../../lib/alignment/Grid'
import { costButtonArray, sizeButtonArray, typeButtonArray } from '../../lib/button/buttonData'
import CheckBox from '../../lib/button/CheckBox'
import useSound from 'use-sound'
import Footer from '../../lib/component/Footer'
import Link from 'next/link'
import UniversalNav from '../../lib/component/UniversalNav'
import BinaryToggle from '../../lib/button/BinaryToggle'
import SizeSelect from '../../lib/button/SizeSelect'
import { popOut } from '../../lib/ux/keyframes'
import { jsonParse } from '../../lib/util/jsonParse'
import { ArrowLeftIcon, AspectRatioIcon, CardStackIcon, CheckIcon, Cross1Icon, CrumpledPaperIcon, ExternalLinkIcon, FaceIcon, HeartFilledIcon, HeartIcon, HomeIcon, LockClosedIcon, MobileIcon, Pencil1Icon, PlusIcon, ReloadIcon, UpdateIcon } from '@radix-ui/react-icons'
import Margin from '../../lib/alignment/Margin'
import Header from '../../lib/component/Header'

// RADIX
import RadixDialog from '../../lib/component/radix/Dialog'
import RadixAccordion from '../../lib/component/radix/Accordion'
import { round } from '../../lib/util/helper'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocument } from 'react-firebase-hooks/firestore'

export default function PlaceName({
  locationDataSnap,
  reviewsData
}) {
  const [user] = useAuthState(auth);
  const [userData] = useDocument<DocumentData>(doc(db, `users/${user && user.uid}`));

  const router = useRouter();
  const placeId = router.query.slug;
  const [progress, setProgress] = useState(0);

  // Sound
  const [tap1] = useSound('/sound/tap-1-sg.mp3',{playbackRate:1.1});
  const [load1] = useSound('/sound/load-1-sg.mp3');
  const [celebrate1] = useSound('/sound/celebrate-1-sg.mp3');
  const [celebrate2] = useSound('/sound/celebrate-2-sg.mp3');

  const [hasReviewed, setHasReviewed] = useState(false);

  const [placeData, setPlaceData] = useState(locationDataSnap);
  const [reviewsCollection, setReviewsCollection] = useState(reviewsData);
  
  const [averageOfDateRating, setAverageOfDateRating] = useState(0);
  const [averageOfAccessRating, setAverageOfAccessRating] = useState(0);
  const [averageOfManagementRating, setAverageOfManagementRating] = useState(0);
  
  const [liked, setLiked] = useState(false);

  const [placeInput, setPlaceInput] = useState(placeData.name ? placeData.name:'');
  const [descriptionInput, setDescriptionInput] = useState(placeData.description ? placeData.description:'');
  const [officialSiteInput, setOfficialSiteInput] = useState(placeData.officialSite ? placeData.officialSite:'');

  const [sizeSelect, setSizeSelect] = useState(placeData.size ? placeData.size:'medium');
  const [binaryToggle, setBinaryToggle] = useState(placeData.toilet ? placeData.toilet:false)
  const [typeInput, setTypeInput] = useState(placeData.type ? placeData.type:'');
  const [costCheckBox, setCostCheckBox] = useState(placeData.cost ? placeData.cost:['free']);


  const [currentReviewData, setCurrentReviewData] = useState<any>();
  const [currentPlaceData, setCurrentPlaceData] = useState(locationDataSnap);

  useEffect(()=>{
    placeData.likes.map((uid) => {
      if (user && user.uid == uid) {
        setLiked(true);
      }
    });
    reviewsCollection?.forEach((doc) => {
      if (user?.uid === doc.id) {
        setHasReviewed(true);
        setCurrentReviewData(doc.data)
        setTitleRatingInput(doc.data.title);
        setDescriptionRatingInput(doc.data.description);

        setDateRatingInput(doc.data.rating.date);
        setAccessRatingInput(doc.data.rating.access);
        setManagementRatingInput(doc.data.rating.management);
      }
    });
    updateAverageRatings();
  },[user]);

  const editThisPlace = async() => {
    load1();
    setProgress(10)
    const updatedContent = {
      name: placeInput,
      description: descriptionInput,
      toilet: binaryToggle,
      type: typeInput,
      cost: costCheckBox,
      size: sizeSelect,
      officialSite:officialSiteInput,
    }
    await updateDoc(doc(db, `places/${placeId}`), updatedContent);
    setCurrentPlaceData(updatedContent);
    setPlaceData(updatedContent);
    setProgress(100);
    celebrate1();
  }

  const updateAverageRatings = async　() => {
    let arrayOfDateRating = [];
    let arrayOfAccessRating = [];
    let arrayOfManagementRating = [];
    reviewsCollection?.forEach((doc) => {
      arrayOfDateRating.push(doc.data.rating.date);
      arrayOfAccessRating.push(doc.data.rating.access);
      arrayOfManagementRating.push(doc.data.rating.management);
    })
    const averageDate = arrayOfDateRating.reduce((sum, element) => sum + element, 0)/arrayOfDateRating.length;
    const averageAccess = arrayOfAccessRating.reduce((sum, element) => sum + element, 0)/arrayOfAccessRating.length;
    const averageManagement = arrayOfManagementRating.reduce((sum, element) => sum + element, 0)/arrayOfManagementRating.length;
    setAverageOfDateRating(averageDate);
    setAverageOfAccessRating(averageAccess);
    setAverageOfManagementRating(averageManagement);

    if (
      averageDate &&
      averageAccess &&
      averageManagement &&
      user
    ) {
      await updateDoc(doc(db,`places/${placeId}/`), {
        averageRating:{
          date: averageDate,
          access: averageAccess,
          management: averageManagement,
        },
      });
    }
  }

  const [titleRatingInput, setTitleRatingInput] = useState('');
  const [descriptionRatingInput, setDescriptionRatingInput] = useState('');

  const [dateRatingInput, setDateRatingInput] = useState<number>(0);
  const [accessRatingInput, setAccessRatingInput] = useState<number>(0);
  const [managementRatingInput, setManagementRatingInput] = useState<number>(0);
  let timeNow = moment().format('MMMM Do YYYY, h:mm a');

  const publishReview = async () =>{
    load1();
    if (user) {
      await setDoc(doc(collection(db, `places/${placeId}/reviews/`), `${user.uid}`), {
        title: titleRatingInput,
        description: descriptionRatingInput,
        lastUpdated:timeNow,
        rating:{
          date: dateRatingInput,
          access: accessRatingInput,
          management: managementRatingInput,
        },
      });
      updateAverageRatings();
      await updateDoc(doc(db,`users/${user.uid}`), {
        reviewCount: increment(1)
      });
    }
    celebrate1();
  }

  const updateReview = async() =>{
    load1();
    setProgress(10);
    const updatedReviewData = {
      title: titleRatingInput,
      description: descriptionRatingInput,
      lastUpdated:timeNow,
      rating:{
        date: dateRatingInput,
        access: accessRatingInput,
        management: managementRatingInput,
      },
    }
    await updateDoc(doc(db, `places/${placeId}/reviews/${user && user.uid}`), updatedReviewData);
    setCurrentReviewData(updatedReviewData);
    const tempReviewsCollection = [...reviewsCollection];
    const newReviewData = tempReviewsCollection.find(obj => obj.id === user.uid);
    newReviewData.data = updatedReviewData;

    setReviewsCollection(tempReviewsCollection);
    updateAverageRatings();
    setProgress(100);
    celebrate1();
  }

  const addLike = async() =>{
    setLiked(true);
    await updateDoc(doc(db, `places/${placeId}/`), {
      likes: arrayUnion(user && user.uid)
    });
    await updateDoc(doc(db, `users/${user && user.uid}/`), {
      likes: arrayUnion(placeId)
    });
  }
  const removeLike = async() =>{
    await updateDoc(doc(db, `places/${placeId}/`), {
      likes: arrayRemove(user && user.uid)
    });
    await updateDoc(doc(db, `users/${user && user.uid}/`), {
      likes: arrayRemove(placeId)
    });
    setLiked(false);
  }

  return (
    <>
      <Head>
        <title>{placeData && placeData.name}</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoadingBar
        color={'gray'}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {user ?
        <>
          {userData?.data().level > 1 &&
            <Header
              type={'header'}
              title={`Level ${userData?.data().level} ユーザーとして編集可能`}
            >
              <RadixDialog
                title={'編集'}
                size={'large'}
                trigger={
                  <Button
                    styleType={'black'}
                    icon={<Pencil1Icon/>}
                  >
                    このページを編集
                  </Button>
                }
                banner={
                  userData.data().level < 5 &&
                  <AlignItems justifyContent={'center'}>
                    <LockClosedIcon/>
                    <p>全ての編集機能をアクセスするにはカードをアップグレードする必要があります。</p>
                  </AlignItems>
                }
                saveClose={
                  currentPlaceData.name != placeInput ||
                  currentPlaceData.description != descriptionInput ||
                  currentPlaceData.toilet != binaryToggle ||
                  currentPlaceData.type != typeInput ||
                  currentPlaceData.cost != costCheckBox ||
                  currentPlaceData.size != sizeSelect ||
                  currentPlaceData.officialSite != officialSiteInput
                   ?
                  <Button
                    styleType={'black'}
                    icon={<UpdateIcon/>}
                    onClick={()=>editThisPlace()}
                  >
                    レビューの内容を更新
                  </Button>:
                  false
                }
              >
                {userData && userData.data() &&
                  <Grid
                    gap={'small'}
                    grid={'oneTwo'}
                  >
                    <Grid gap={'extraSmall'}>
                      <RadixAccordion>
                        {userData.data().level > 1 &&
                          <RadixAccordion.Item
                            number={'1'}
                            name={'トイレの有無'}
                          >
                            <BinaryToggle
                              state={binaryToggle}
                              onClick={()=>setBinaryToggle(!binaryToggle)}
                            />
                          </RadixAccordion.Item>                          
                        }
                        {userData.data().level > 3 &&
                          <RadixAccordion.Item
                            number={'2'}
                            name={'種類'}
                          >
                            <TypeButton>
                              {typeButtonArray.map(color =>(
                                <TypeButton.Item
                                  key={color}
                                  type={color}
                                  onClick={()=>setTypeInput(color)}
                                  selectedInput={typeInput}
                                />
                              ))}
                            </TypeButton>
                          </RadixAccordion.Item>
                        }
                        {userData.data().level > 2 &&
                          <>
                            <RadixAccordion.Item
                              number={'3'}
                              name={'値段'}
                            >
                              <CheckBox>
                                {costButtonArray.map(name =>(
                                  <CheckBox.Item
                                    key={name}
                                    checked={costCheckBox.some(element => element === name)}
                                    name={name}
                                    onClick={()=>
                                      {
                                        costCheckBox.some(element => element === name) ?
                                        setCostCheckBox(prev => prev.filter(element => element !== name )):
                                        setCostCheckBox([...costCheckBox, name]);
                                      }
                                    }
                                  >
                                    {name}
                                  </CheckBox.Item>
                                ))}
                              </CheckBox>
                            </RadixAccordion.Item>
                            <RadixAccordion.Item
                              number={'4'}
                              name={'大きさ'}
                            >   
                              <SizeSelect
                                hide
                                currentState={sizeSelect}
                              >
                                {sizeButtonArray.map(size=> (
                                  <SizeSelect.Item
                                    name={size}
                                    key={size}
                                    state={sizeSelect}
                                    onClick={()=> setSizeSelect(size)}
                                  />
                                ))}
                              </SizeSelect>
                            </RadixAccordion.Item>
                          </>
                        }
                      </RadixAccordion>
                    </Grid>
                    <Grid gap={'extraSmall'}>
                      {userData.data().level > 4 &&
                        <Input
                          placeholder={"場所の名前"}
                          value={placeInput}
                          onChange={(e)=>
                            setPlaceInput(e.target.value)
                          }
                        />
                      }

                      {userData.data().level > 3 &&
                      <TextArea
                        placeholder={"概要"}
                        value={descriptionInput}
                        onChange={(e)=>setDescriptionInput(e.target.value)}
                      />
                      }

                      {userData.data().level > 1 &&
                        <Input
                          placeholder={"公式サイト（無い場合は空欄）"}
                          value={officialSiteInput}
                          onChange={(e)=>setOfficialSiteInput(e.target.value)}
                        />
                      }
                    </Grid>
                  </Grid>
                }
              </RadixDialog>
            </Header>
          }
        </>:
        <Header
          type={'header'}
          title={isBrowser && 'ログインされておりません。'}
        >
          {isBrowser ?       
            <Button
              styleType={'black'}
              onClick={()=>router.push('/')}
              iconPosition={'left'}
              icon={<HomeIcon/>}
            >
              メイン
            </Button>:
            <p>※モバイルからのログインは出来ないです。パソコンからアクセスして頂くとログインが可能となります。</p>
          }
        </Header>
      }

      <Margin>
        <Grid
          gap={'large'}
          grid={'twoOne'}
        >
          <Grid>
            <AlignItems>
              <TypeBadge
                width={'large'}
                type={placeData.type}
              />
              <h2
                style={{
                  fontWeight:'500'
                }}
              >
                {placeData.name}
              </h2>
            </AlignItems>
            <p>{placeData.description}</p>
            <Grid gap={'small'}>
              {reviewsCollection?.map((review) =>(
                  <Review
                    key={review.id}
                    data={review.data}
                  />
                )
              )}
              {reviewsCollection?.length > 0 ? 
                <End>
                  おわり。
                  <br/>
                  The End.
                </End>:
                <End>
                  レビューはありません。
                  <br/>
                  No reviews were written.
                </End>
              }
            </Grid>
          </Grid>
          <Grid
            gap={'small'}
            css={{
              marginTop:'1.5em'
            }}
          >
            {reviewsData?.length > 0 &&
              <Grid
                css={{
                  marginBottom:'0.5em'
                }}
              >
                <Rating
                  rating={
                    round(
                      100*
                      ((
                        averageOfDateRating + 
                        averageOfAccessRating + 
                        averageOfManagementRating
                      )/3)/10
                    )
                  }
                  description={'%：総合点数'}
                  hideMax={true}
                />
                <Rating
                  rating={round(averageOfDateRating)}
                  description={'デートスポット適正'}
                />
                <Rating
                  rating={round(averageOfAccessRating)}
                  description={'最寄駅のアクセス'}
                />
                <Rating
                  rating={round(averageOfManagementRating)}
                  description={'設備管理の状況'}
                />
                <Rating
                  rating={placeData.likes ? placeData.likes.length:0}
                  description={'いいね数'}
                  hideMax={true}
                />
              </Grid>
            }
            <Container
              styleType={'white'}
            >
              <Grid
                grid={'oneTwo'}
                gap={'medium'}
              >
                <h5>基本情報</h5>
                <Grid
                  gap={'small'}
                >
                  {placeData.officialSite && 
                    <AlignItems gap={'0.5em'}>
                      <ExternalLinkIcon/>
                      <p>
                        <Link
                          href={placeData.officialSite}
                          target="_blank"
                          rel="noreferrer"
                        >
                          公式サイト
                        </Link>
                      </p>
                    </AlignItems>
                  }
                  <AlignItems gap={'0.5em'}>
                    <FaceIcon/>
                    <p>トイレ{placeData.toilet ? '有':'無'}</p>
                  </AlignItems>
                  <AlignItems gap={'0.5em'}>
                    <AspectRatioIcon/>
                    {placeData.size == 'small' && <p>小さい</p>}
                    {placeData.size == 'medium' && <p>普通</p>}
                    {placeData.size == 'large' && <p>大きい</p>}
                  </AlignItems>
                </Grid>
                <h5>料金</h5>
                <Grid
                  gap={'small'}
                >
                  {placeData.cost.map(name =>(
                    <AlignItems gap={'0.5em'}
                      key={name}
                    >
                      {name === 'free' && 
                        <>
                          <CheckIcon/>
                          <p>無料</p>
                        </>
                      }
                      {name === 'cash' &&
                        <>
                          <CrumpledPaperIcon/>
                          <p>現金</p>
                        </>
                      }
                      {name === 'credit' &&
                        <>
                          <CardStackIcon/>
                          <p>クレジットカード</p>
                        </>
                      }
                      {name === 'digitalMoney' &&
                        <>
                          <MobileIcon/>
                          <p>電子マネー</p>
                        </>
                      }
                    </AlignItems>
                  ))
                  }
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
        <Footer type={'blur'}/>
      </Margin>
      <UniversalNav
        showInitially={true}
        scrollPop={true}
        popOnMount={true}
        mount={userData?.data()?.level > 1 ? true:false}
        minSize={user ? 'l':'s'}
        maxSize={user ? 'l':'m'}
        dynamicButton={
          <>
            <Button
              size={'small'}
              styleType={'transparent'}
              icon={<ArrowLeftIcon/>}
              onClick={()=> {
                setProgress(10);
                router.back();
                setProgress(100);
              }}
            />
            {user &&
              <>
                <RadixDialog
                  title={hasReviewed ? '内容を更新':'新規レビュー'}
                  size={'medium'}
                  trigger={
                    <Button
                      styleType={'transparent'}
                      size={'small'}
                      icon={hasReviewed ? <ReloadIcon/>:<PlusIcon/>}
                      title={hasReviewed ? '書いたレビューを編集':'レビューを書く'}
                    />
                  }
                  saveClose={
                    hasReviewed && currentReviewData ?
                      currentReviewData?.title != titleRatingInput ||
                      currentReviewData?.description != descriptionRatingInput ||
                      currentReviewData?.rating.date != dateRatingInput ||
                      currentReviewData?.rating.access != accessRatingInput ||
                      currentReviewData?.rating.management != managementRatingInput ?
                        <Button
                          styleType={'black'}
                          icon={<UpdateIcon/>}
                          onClick={()=>updateReview()}
                        >
                          レビューの内容を更新
                        </Button>:false:
                      titleRatingInput && descriptionRatingInput ?
                      <Button
                        styleType={'black'}
                        icon={<CheckIcon/>}
                        onClick={()=>publishReview()}
                      >
                        レビューを公開
                      </Button>:
                      false
                  }
                >
                  <Grid gap={'extraSmall'}>
                    <Input
                      value={titleRatingInput}
                      onChange={(e)=> setTitleRatingInput(e.target.value)
                      }
                      placeholder={'レビュータイトル'}
                    />
                    <Grid grid={'tri'} gap={'extraSmall'}>
                      <DisplayRatingInput
                        value={dateRatingInput}
                        onChange={(e)=> setDateRatingInput(parseInt(e.target.value))
                        }
                        maxValue={10}
                        minValue={0}
                        placeholder={'デートスポット適正'}
                      />
                      <DisplayRatingInput
                        value={accessRatingInput}
                        onChange={(e)=> setAccessRatingInput(parseInt(e.target.value))
                        }
                        maxValue={10}
                        minValue={0}
                        placeholder={'最寄駅からのアクセス'}
                      />
                      <DisplayRatingInput
                        value={managementRatingInput}
                        onChange={(e)=> setManagementRatingInput(parseInt(e.target.value))
                        }
                        maxValue={10}
                        minValue={0}
                        placeholder={'設備管理の状況'}
                      />
                    </Grid>
                    <TextArea
                      value={descriptionRatingInput}
                      onChange={(e)=> setDescriptionRatingInput(e.target.value)
                      }
                      placeholder={'行って感じた事、評価項目に写らない場所の良さ等。'}
                    />
                  </Grid>
                </RadixDialog>

                <Button
                  size={'small'}
                  styleType={liked ? 'red':'transparent'}
                  css={{animation:liked ? `${popOut} 0.5s`:'none'}}
                  icon={liked ? <HeartFilledIcon/>:<HeartIcon/>}
                  overRideSound={()=>!liked ? celebrate2():tap1()}
                  onClick={()=> {
                    liked ? removeLike():addLike()
                  }}
                />
              </>
            }
          </>
        }
      />
    </>
  )
}


export async function getServerSideProps({params}){
  const placeInfoDocSnap = await getDoc(doc(db, `places/${params.slug}`));
  const reviewsDataArray = [];
  const reviewsSnap = await getDocs(collection(db, `places/${params.slug}/reviews/`));
  const locationDataSnap = jsonParse(placeInfoDocSnap.data());

  reviewsSnap.forEach((doc) => {
    reviewsDataArray.push(
      {
        id:doc.id,
        data:doc.data()
      }
    );
  });

  const reviewsData = jsonParse(reviewsDataArray);
  return {
    props:{
      locationDataSnap,
      reviewsData
    }
  }
}