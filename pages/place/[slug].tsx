import { useRouter } from 'next/router'
import React, { useState,useEffect, useContext } from 'react'
import AlignItems from '../../lib/alignment/AlignItems'
import TypeBadge from '../../lib/TypeBadge'

import { db } from '../../firebase'
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, increment, setDoc, updateDoc } from "firebase/firestore";
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
import CreateContainer from '../../lib/component/CreateContainer'
import Grid from '../../lib/alignment/Grid'
import { costButtonArray, sizeButtonArray, typeButtonArray } from '../../lib/button/buttonData'
import CheckBox from '../../lib/button/CheckBox'
import useSound from 'use-sound'
import Footer from '../../lib/component/Footer'
import Link from 'next/link'
import UniversalNav from '../../lib/component/UniversalNav'
import Map from '../../lib/component/Map'
import BinaryToggle from '../../lib/button/BinaryToggle'
import SizeSelect from '../../lib/button/SizeSelect'
import Dropdown from '../../lib/component/Dropdown'
import { popOut } from '../../lib/ux/keyframes'
import { jsonParse } from '../../lib/util/jsonParse'
import { UserContext } from '../../lib/util/UserContext'
import { ArrowLeftIcon, AspectRatioIcon, CardStackIcon, CheckIcon, Cross1Icon, CrumpledPaperIcon, ExternalLinkIcon, FaceIcon, HeartFilledIcon, HeartIcon, HomeIcon, LockClosedIcon, MobileIcon, Pencil1Icon, PlusIcon, ReloadIcon, UpdateIcon } from '@radix-ui/react-icons'
import Margin from '../../lib/alignment/Margin'
import Header from '../../lib/component/Header'
import Dialog from '../../lib/component/Dialog'

export default function PlaceName({
  locationDataSnap,
  reviewsData
}) {
  const router = useRouter();
  const placeId = router.query.slug;
  const [progress, setProgress] = useState(0);

  const userContextData = useContext(UserContext);
  const user = userContextData?.user;
  const userData = userContextData?.userData;

  // Sound
  const [tap1] = useSound('/sound/tap-1-sg.mp3');
  // const [tap2] = useSound('/sound/tap-2-sg.mp3');
  const [tap3] = useSound('/sound/tap-3-sg.mp3');
  const [select1] = useSound('/sound/select-1-sg.mp3');
  const [select2] = useSound('/sound/select-2-sg.mp3');
  // const [action1] = useSound('/sound/action-1-sg.mp3');
  const [load1] = useSound('/sound/load-1-sg.mp3');
  const [celebrate1] = useSound('/sound/celebrate-1-sg.mp3');
  const [celebrate2] = useSound('/sound/celebrate-2-sg.mp3');

  const [hasReviewed, setHasReviewed] = useState(false);

  const [placeData] = useState(locationDataSnap);
  const [reviewsCollection] = useState(reviewsData);
  
  const [averageOfDateRating, setAverageOfDateRating] = useState(0);
  const [averageOfAccessRating, setAverageOfAccessRating] = useState(0);
  const [averageOfManagementRating, setAverageOfManagementRating] = useState(0);
  
  const [liked, setLiked] = useState(false);

  const [placeInput, setPlaceInput] = useState(placeData.name ? placeData.name:'');
  const [locationInput, setLocationInput] = useState(placeData.location ? placeData.location:'');
  const [descriptionInput, setDescriptionInput] = useState(placeData.description ? placeData.description:'');
  const [officialSiteInput, setOfficialSiteInput] = useState(placeData.officialSite ? placeData.officialSite:'');

  const [sizeSelect, setSizeSelect] = useState(placeData.size ? placeData.size:'medium');
  const [binaryToggle, setBinaryToggle] = useState(placeData.toilet ? placeData.toilet:false)
  const [typeInput, setTypeInput] = useState(placeData.type ? placeData.type:'');
  const [costCheckBox, setCostCheckBox] = useState(placeData.cost ? placeData.cost:['free']);

  useEffect(()=>{
    placeData.likes.map((uid) => {
      if (user && user.uid == uid) {
        setLiked(true);
      }
    });
    reviewsCollection?.forEach((doc) => {
      if (user?.uid === doc.id) {
        setHasReviewed(true);
        setTitleRatingInput(doc.data.title);
        setDescriptionRatingInput(doc.data.description);
        setDateRatingInput(doc.data.dateRating);
        setAccessRatingInput(doc.data.accessRating);
        setManagementRatingInput(doc.data.managementRating);
      }
    });
    updateAverageRatings();
  },[user]);

  const editThisPlace = async() => {
    load1();
    await updateDoc(doc(db, `places/${placeId}`), {
      name: placeInput,
      location: locationInput,
      description: descriptionInput,
      toilet: binaryToggle,
      type: typeInput,
      cost: costCheckBox,
      size: sizeSelect,
      officialSite:officialSiteInput,
    });
    setPlaceInput('');
    setLocationInput('');
    setDescriptionInput('');
    setTypeInput('');
    celebrate1();
  }

  const updateAverageRatings = async　() => {
    let arrayOfDateRating = [];
    let arrayOfAccessRating = [];
    let arrayOfManagementRating = [];
    reviewsCollection?.forEach((doc) => {
      arrayOfDateRating.push(parseInt(doc.data.dateRating));
      arrayOfAccessRating.push(parseInt(doc.data.accessRating));
      arrayOfManagementRating.push(parseInt(doc.data.managementRating));
    })
    setAverageOfDateRating(arrayOfDateRating.reduce((sum, element) => sum + element, 0)/arrayOfDateRating.length);
    setAverageOfAccessRating(arrayOfAccessRating.reduce((sum, element) => sum + element, 0)/arrayOfAccessRating.length);
    setAverageOfManagementRating(arrayOfManagementRating.reduce((sum, element) => sum + element, 0)/arrayOfManagementRating.length);
  }

  const [titleRatingInput, setTitleRatingInput] = useState('');
  const [dateRatingInput, setDateRatingInput] = useState(0);
  const [accessRatingInput, setAccessRatingInput] = useState(0);
  const [managementRatingInput, setManagementRatingInput] = useState(0);
  const [descriptionRatingInput, setDescriptionRatingInput] = useState('');

  let timeNow = moment().format('MMMM Do YYYY, h:mm a');

  const publishReview = async() =>{
    load1();
    if (user) {      
      await setDoc(doc(collection(db, `places/${placeId}/reviews/`), `${user.uid}`), {
        title: titleRatingInput,
        description: descriptionRatingInput,
        dateRating: dateRatingInput,
        accessRating: accessRatingInput,
        managementRating: managementRatingInput,
        lastUpdated:timeNow
      });
      await updateDoc(doc(db,`users/${user.uid}`), {
        reviewCount: increment(1)
      });
    }
    celebrate1();
  }

  const updateReview = async() =>{
    load1();
    setProgress(10)
    await updateDoc(doc(db, `places/${placeId}/reviews/${user && user.uid}`), {
      title: titleRatingInput,
      description: descriptionRatingInput,
      dateRating: dateRatingInput,
      accessRating: accessRatingInput,
      managementRating: managementRatingInput,
      lastUpdated:timeNow
    });
    setProgress(100)
    celebrate1();
  }

  const round = (number) =>{
    if (number == 10) return 10;
    if (number == 0) return 0;
    else return (Math.round(number * 100) / 100).toFixed(1);
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
              <Dialog
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
                topCenterComponent={
                  <Button
                    styleType={'black'}
                    icon={<CheckIcon/>}
                    onClick={()=> editThisPlace()}
                  >
                    変更を保存
                  </Button>
                }
              >
                {userData && userData.data() &&
                  <Grid
                    gap={'small'}
                    grid={'oneTwo'}
                  >
                    <Grid gap={'extraSmall'}>
                      <Dropdown>
                        {userData.data().level > 1 &&
                          <Dropdown.Item
                            number={'1'}
                            name={'トイレの有無'}
                          >
                            <BinaryToggle>
                              <BinaryToggle.Item
                                currentState={binaryToggle}
                                selected={binaryToggle === true}
                                onClick={()=>{
                                  select1();
                                  setBinaryToggle(true)
                                }}
                                name={'有'}
                              />
                              <BinaryToggle.Item
                                currentState={binaryToggle}
                                selected={binaryToggle === false}
                                onClick={()=>{
                                  select2();
                                  setBinaryToggle(false)
                                }}
                                name={'無'}
                              />
                            </BinaryToggle>
                          </Dropdown.Item>                          
                        }
                        {userData.data().level > 3 &&
                          <Dropdown.Item
                            number={'2'}
                            name={'種類'}
                          >
                            <Grid gap={'extraSmall'}>
                              {typeButtonArray.map(color =>(
                                <TypeButton
                                  key={color}
                                  type={color}
                                  onClick={()=>{
                                    select1();
                                    setTypeInput(color);
                                  }}
                                  selectedInput={typeInput}
                                />
                              ))}
                            </Grid>
                          </Dropdown.Item>
                        }
                        {userData.data().level > 2 &&
                          <>
                            <Dropdown.Item
                              number={'3'}
                              name={'値段'}
                            >
                              <Grid gap={'extraSmall'}>
                                {costButtonArray.map(name =>(
                                  <CheckBox
                                    key={name}
                                    checked={costCheckBox.some(element => element === name)}
                                    name={name}
                                    onClick={()=>
                                      {
                                        tap1();
                                        costCheckBox.some(element => element === name) ?
                                        setCostCheckBox(prev => prev.filter(element => element !== name )):
                                        setCostCheckBox([...costCheckBox, name]);
                                      }
                                    }
                                  >
                                    {name}
                                  </CheckBox>
                                ))}
                              </Grid>
                            </Dropdown.Item>
                            <Dropdown.Item
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
                                    currentState={sizeSelect}
                                    onClick={()=> {
                                      select1();
                                      setSizeSelect(size);
                                    }}
                                  />
                                ))}
                              </SizeSelect>
                            </Dropdown.Item>
                          </>
                        }
                      </Dropdown>
                    </Grid>
                    <Grid gap={'extraSmall'}>
                      {userData.data().level > 4 &&
                        <Input
                          placeholder={"場所の名前"}
                          value={placeInput}
                          onChange={(e)=>{
                            tap3();
                            setPlaceInput(e.target.value)
                          }}
                        />
                      }

                      {userData.data().level > 3 &&
                      <TextArea
                        placeholder={"概要"}
                        value={descriptionInput}
                        onChange={(e)=>{
                          tap3();
                          setDescriptionInput(e.target.value)
                        }}
                      />
                      }

                      {userData.data().level > 1 &&
                        <Input
                          placeholder={"公式サイト（無い場合は空欄）"}
                          value={officialSiteInput}
                          onChange={(e)=>{
                            tap3();
                            setOfficialSiteInput(e.target.value)
                          }}
                        />
                      }

                      {userData.data().level > 3 &&
                      <>
                        <Input
                          placeholder={"場所（スペース無し英語表記｜例：koishikawa-korakuen）"}
                          value={locationInput}
                          onChange={(e)=>{
                            tap3();
                            setLocationInput(e.target.value)
                          }}
                        />
                        {/* <Map
                          location={locationInput}
                        /> */}
                      </>
                      }
                    </Grid>
                  </Grid>
                }
              </Dialog>
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
              {reviewsData?.map((review) =>(
                  <Review
                    key={review.id}
                    data={review.data}
                  />
                )
              )}
              {reviewsData?.length > 0 ? 
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
            <Map location={placeData.location}/>
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
              onClick={()=> {router.back()}}
            />
            {user &&
              <>
                <Dialog
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
                >
                  <Grid gap={'extraSmall'}>
                    <Input
                      value={titleRatingInput}
                      onChange={(e)=> {
                        tap3();
                        setTitleRatingInput(e.target.value)
                      }}
                      placeholder={'レビュータイトル'}
                    />
                    <Grid grid={'tri'} gap={'extraSmall'}>
                      <DisplayRatingInput
                        value={dateRatingInput}
                        onChange={(e)=> {
                          tap3();
                          setDateRatingInput(e.target.value)
                        }}
                        maxValue={10}
                        minValue={0}
                        placeholder={'デートスポット適正'}
                      />
                      <DisplayRatingInput
                        value={accessRatingInput}
                        onChange={(e)=> {
                          tap3();
                          setAccessRatingInput(e.target.value)
                        }}
                        maxValue={10}
                        minValue={0}
                        placeholder={'最寄駅からのアクセス'}
                      />
                      <DisplayRatingInput
                        value={managementRatingInput}
                        onChange={(e)=> {
                          tap3();
                          setManagementRatingInput(e.target.value)
                        }}
                        maxValue={10}
                        minValue={0}
                        placeholder={'設備管理の状況'}
                      />
                    </Grid>
                    <TextArea
                      value={descriptionRatingInput}
                      onChange={(e)=> {
                        tap3();
                        setDescriptionRatingInput(e.target.value)
                      }}
                      placeholder={'行って感じた事、評価項目に写らない場所の良さ等。'}
                    />
                    {titleRatingInput && descriptionRatingInput &&
                      <AlignItems
                        justifyContent={'center'}
                        margin={'1em 0 0 0'}
                      >
                        {hasReviewed ?
                          <Button
                            styleType={'black'}
                            icon={<UpdateIcon/>}
                            onClick={()=>updateReview()}
                          >
                            レビューの内容を更新
                          </Button>:
                          <Button
                            styleType={'black'}
                            icon={<CheckIcon/>}
                            onClick={()=>publishReview()}
                          >
                            レビューを公開
                          </Button>
                        }
                      </AlignItems>
                    }
                  </Grid>
                </Dialog>

                <Button
                  size={'small'}
                  styleType={liked ? 'red':'transparent'}
                  css={{animation:liked ? `${popOut} 0.5s`:'none'}}
                  icon={liked ? <HeartFilledIcon/>:<HeartIcon/>}
                  onClick={()=> {
                    !liked && celebrate2();
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