import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState,useEffect } from 'react'
import AlignItems from '../../lib/AlignItems'
import Button from '../../lib/Button'
import TypeBadge from '../../lib/TypeBadge'

import { db,auth } from '../../firebase'
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import Rating from '../../lib/Rating'
import StaticGrid from '../../lib/StaticGrid'

import LoadingBar from 'react-top-loading-bar';
import Review from '../../lib/Review'
import Input from '../../lib/Input'
import TextArea from '../../lib/TextArea'
import { VscAccount, VscAdd, VscClose, VscEdit, VscHeart, VscRedo,VscSave } from 'react-icons/vsc'
import End from '../../lib/End'
import NoReviews from '../../lib/NoReviews'
import TypeButton from '../../lib/TypeButton'


import moment from 'moment';
import 'moment/locale/ja'
import DisplayRatingInput from '../../lib/DisplayRatingInput'
import { isBrowser } from 'react-device-detect'

import {buttonSound, celebrationSound, notificationSound, selectSound, sliderSound, typeSound} from '../../lib/sound/audio'
import Head from 'next/head'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import Modal from 'react-modal'

export default function PlaceName() {
  const router = useRouter();
  const placeId = router.query.slug;
  const [parent] = useAutoAnimate();
  const [progress, setProgress] = useState(0);

  let Parser = require('rss-parser');
  const parser = new Parser();
  // console.log(parser.parseURL("https://dev.to/feed/inezabonte").items);
  // let nitterParseUrl = 'https://cors-anywhere.herokuapp.com/https://nitter.it/eminent_gallery/rss';
  let nitterParseUrl = 'https://dev.to/feed/inezabonte';

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [openCreateReview, setOpenCreateReview] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  const [user] = useAuthState(auth);
  const [placeData, setPlaceData] = useState();
  const [reviewData, setReviewData] = useState();

  const [averageOfDateRating, setAverageOfDateRating] = useState(0);
  const [averageOfAccessRating, setAverageOfAccessRating] = useState(0);
  const [averageOfManagementRating, setAverageOfManagementRating] = useState(0);
  
  const [liked, setLiked] = useState(false);
  const getDocument = async () =>{
    setProgress(0);
    if (placeId) {
      const placeDocRef = doc(db, `places/${placeId}`);
      const docSnap = await getDoc(placeDocRef);
      if (docSnap.exists()) {
        setPlaceData(docSnap.data());
        docSnap.data().likes.map((uid) => {
          if (user && user.uid == uid) {
            setLiked(true);
          }
        })
        getReviews();
        setProgress(100);
      } else {
        alert("ページは見つかりませんでした");
      }
    }
  }

  const reviewsCollectionRef = collection(db, `places/${placeId}/reviews`);
  
  const getReviews = async () => {
    let reviewsArray = [];
    const querySnapshot = await getDocs(reviewsCollectionRef)
    querySnapshot.forEach((doc) => {
      reviewsArray.push(doc);
      if (user && user.uid === doc.id) {
        setHasReviewed(true);
        setTitleInput(doc.data().title);
        setDescriptionInput(doc.data().description);
        setDateRatingInput(doc.data().dateRating);
        setAccessRatingInput(doc.data().accessRating);
        setManagementRatingInput(doc.data().managementRating);
      }
    });
    setReviewData(reviewsArray);
    updateAverageRatings();
  }

  const updateAverageRatings = async　() => {
    let arrayOfDateRating = [];
    let arrayOfAccessRating = [];
    let arrayOfManagementRating = [];
    const querySnapshot = await getDocs(reviewsCollectionRef)
    querySnapshot.forEach((doc) => {
      arrayOfDateRating.push(parseInt(doc.data().dateRating));
      arrayOfAccessRating.push(parseInt(doc.data().accessRating));
      arrayOfManagementRating.push(parseInt(doc.data().managementRating));
    })
    setAverageOfDateRating(arrayOfDateRating.reduce((sum, element) => sum + element, 0)/arrayOfDateRating.length);
    setAverageOfAccessRating(arrayOfAccessRating.reduce((sum, element) => sum + element, 0)/arrayOfAccessRating.length);
    setAverageOfManagementRating(arrayOfManagementRating.reduce((sum, element) => sum + element, 0)/arrayOfManagementRating.length);
  }

  const [titleInput, setTitleInput] = useState('');
  const [dateRatingInput, setDateRatingInput] = useState(0);
  const [accessRatingInput, setAccessRatingInput] = useState(0);
  const [managementRatingInput, setManagementRatingInput] = useState(0);
  const [descriptionInput, setDescriptionInput] = useState('');

  let timeNow = moment().format('MMMM Do YYYY, h:mm a');
  const typeButtonArray = ["green","blue","red","purple",]

  const publishReview = async() =>{
    await setDoc(doc(collection(db, `places/${placeId}/reviews/`), `${user && user.uid}`), {
      title: titleInput,
      description: descriptionInput,
      dateRating: dateRatingInput,
      accessRating: accessRatingInput,
      managementRating: managementRatingInput,
      lastUpdated:timeNow
    });
    notificationSound();
  }

  const updateReview = async() =>{    
    await updateDoc(doc(db, `places/${placeId}/reviews/${user && user.uid}`), {
      title: titleInput,
      description: descriptionInput,
      dateRating: dateRatingInput,
      accessRating: accessRatingInput,
      managementRating: managementRatingInput,
      lastUpdated:timeNow
    });
    notificationSound();
  }

  const round = (number) =>{
    if (number == 10) {
      return 10
    }if (number == 0) {
      return 0
    }else{
      return (Math.round(number * 100) / 100).toFixed(1)
    }
  }

  const addLike = async() =>{
    await updateDoc(doc(db, `places/${placeId}/`), {
      likes: arrayUnion(user && user.uid)
    });
    await updateDoc(doc(db, `users/${user && user.uid}/`), {
      likes: arrayUnion(placeId)
    });
    setLiked(true);
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

  useEffect(() => {
    getDocument();
  }, [user,placeId])

  return (
    <>
      <Head>
        <title>{placeData && placeData.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoadingBar
        color='black'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Modal
        isOpen={modalIsOpen}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '2em',
            width:'60%',
            height:'fit-content',
            overflowY:'scroll',
            borderRadius: '20px',
            backgroundColor:'white',
            color: 'black',
            border:'1px solid var(--sgGray)',
            zIndex:2,
            boxShadow: '0px 0px 15px var(--sgLightGray)',
            animation: 'popOut 0.4s'
          },
          overlay: {
            background: 'linear-gradient(to bottom,rgba(255,255,255,0) 0%,white 100%)',
            backdropFilter:'blur(10px)',
            zIndex:20,
            cursor:'pointer',
            transition: '0.2s'
          }
        }}
        onRequestClose={()=>setModalIsOpen(false)}
      >
        <AlignItems justifyContent={'center'}>
          <h3>編集</h3>
        </AlignItems>
        <StaticGrid grid={'1fr 2fr'} gap={'0.5em'}>
          <StaticGrid>
            <StaticGrid gap={'0.25em'}>
              <Input
                placeholder={"場所の名前"}
                // value={placeInput}
                onChange={(e)=>{
                  typeSound();
                  // setPlaceInput(e.target.value)
                }}
              />
              <TextArea
                resize={'none'}
                placeholder={"概要"}
                // value={descriptionInput}
                onChange={(e)=>{
                  typeSound();
                  // setDescriptionInput(e.target.value)
                }}
              />
              <Input
                placeholder={"公式サイト（無い場合は空欄）"}
                // value={officialSiteInput}
                onChange={(e)=>{
                  typeSound();
                  // setOfficialSiteInput(e.target.value)
                }}
              />
            </StaticGrid>
            <StaticGrid>
              {typeButtonArray.map(color =>{
                return <TypeButton
                  key={color}
                  type={color}
                  onClick={()=>{
                    selectSound();
                    // setTypeInput(color);
                  }}
                  // selectedInput={typeInput}
                />
              })}
            </StaticGrid>
          </StaticGrid>
          <StaticGrid gap={'0.25em'}>
            <Input
              placeholder={"場所（スペース無し英語表記｜例：koishikawa-korakuen）"}
              // value={locationInput}
              onChange={(e)=>{
                typeSound();
                // setLocationInput(e.target.value)
              }}
            />
            <iframe
              // src={`https://www.google.com/maps?output=embed&q=${locationInput}`}
              width="100%"
              height="250px"
            />
          </StaticGrid>
        </StaticGrid>
        <AlignItems justifyContent={'center'}>
          <Button>変更を保存</Button>
        </AlignItems>
      </Modal>
      {placeData &&
        <div
          className="pagePadding"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap:'1em'
          }}
        >
          <AlignItems spaceBetween={true} margin={'0.5em 0 0 0'}>
            <Button
              onClick={()=> {
                buttonSound();
                router.push('/');
              }}
            >
              戻る
            </Button>
            {user &&
              <AlignItems>
                <Button
                  onClick={()=> {
                    buttonSound();
                    setModalIsOpen(true)
                  }}
                  iconPosition={'left'}
                  icon={<VscEdit/>}
                >
                  ページを編集
                </Button>
                <Button
                  onClick={()=> {
                    !liked && celebrationSound();
                    liked ? removeLike():addLike()
                  }}
                  iconPosition={'left'}
                  icon={<VscHeart/>}
                >
                  {liked ? 'いいねを外す':'いいね'}
                </Button>
              </AlignItems>
            }
          </AlignItems>
          <StaticGrid>
            <h2 style={{marginBottom:'0.5em'}}>{placeData.name}</h2>
            <AlignItems spaceBetween={true}>
              <TypeBadge type={placeData.type}/>
              {placeData.officialSite && 
                <a
                  href={placeData.officialSite}
                  target="_blank"
                  rel="noreferrer"
                >
                  公式サイト
                </a>
              }
            </AlignItems>
          </StaticGrid>
          <div className="grid-1fr-2fr">
            <div>
              <p>{placeData.description}</p>
              {reviewData && reviewData.length > 0 &&
                <StaticGrid grid={'1fr 1fr'}  gap={'0.25em'}>
                  <Rating
                    borderRadius={'10px 5px 5px 5px'}
                    rating={round(averageOfDateRating)}
                    description={'デートスポット適正'}
                  />
                  <Rating
                    borderRadius={'5px 10px 5px 5px'}
                    rating={round(averageOfAccessRating)}
                    description={'最寄駅からのアクセス'}
                  />
                  <Rating
                    borderRadius={'5px 5px 5px 10px'}
                    rating={round(averageOfManagementRating)}
                    description={'設備管理の状況'}
                  />
                  <Rating
                    borderRadius={'5px 5px 10px 5px'}
                    rating={placeData.likes ? placeData.likes.length:0}
                    description={'清涼広場上でのいいね数'}
                    hideMax={true}
                  />
                </StaticGrid>
              }
              <iframe
                src={`https://www.google.com/maps?output=embed&q=${placeData.location}`}
                width="100%"
                height="250px"
                style={{marginTop:'0.5em'}}
              />
            </div>
            <div style={{height:'fit-content'}}>
              <StaticGrid gap={'1em'}>
                <StaticGrid gap={'0.5em'}>
                  {user ? 
                    <AlignItems justifyContent={'center'}>
                      <Button
                        iconPosition={'left'}
                        icon={openCreateReview ? <VscClose/>:<>{hasReviewed ? <VscRedo/>:<VscAdd/>}</>}
                        onClick={()=> {
                          buttonSound();
                          openCreateReview ? setOpenCreateReview(false):setOpenCreateReview(true)
                        }}
                      >
                        {openCreateReview ? '閉じる':<>{hasReviewed ? '書いたレビューを編集':'レビューを書く'}</>}
                      </Button>
                    </AlignItems>:
                    <div
                      style={{
                        border: '1px solid var(--sgGray)',
                        boxShadow: '0px 0px 15px white',
                        padding: '1em',
                        borderRadius: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <div
                        style={{
                          fontSize: '1.5em',
                          padding: '0.5em 1em',
                        }}
                      >
                        <VscAccount/>
                      </div>
                      <h4>ログインされておりません。</h4>
                      <p>ログインしてアカウントを作成すると、レビューや場所を清涼広場上に投稿する事ができます！</p>
                      {isBrowser ? 
                        <Button
                          onClick={()=>{
                            buttonSound();
                            router.push('/');
                          }}
                        >
                          メインページから会員登録
                        </Button>:
                        <p>※モバイルからのログインは出来ないです。パソコンからアクセスして頂くとログインが可能となります。</p>
                      }
                    </div>
                  }
                  <div ref={parent}>
                    {openCreateReview &&                                     
                      <div
                        style={{
                          border: '1px solid var(--sgGray)',
                          padding: '1em',
                          boxShadow: '0px 0px 15px #f0f0f0',
                          borderRadius: '10px',
                          marginTop: '0.5em'
                        }}
                      >
                        <StaticGrid gap={'0.25em'}>
                          <h3>{hasReviewed ? '内容を更新':'新規レビュー'}</h3>
                          <Input
                            value={titleInput}
                            onChange={(e)=> {
                              typeSound();
                              setTitleInput(e.target.value)
                            }}
                            placeholder={'レビュータイトル'}
                          />
                          <StaticGrid grid={'1fr 1fr 1fr'} gap={'0.25em'}>
                            <DisplayRatingInput
                              value={dateRatingInput}
                              onChange={(e)=> {
                                sliderSound();
                                setDateRatingInput(e.target.value)
                              }}
                              maxValue={10}
                              minValue={0}
                              placeholder={'デートスポット適正'}
                            />
                            <DisplayRatingInput
                              value={accessRatingInput}
                              onChange={(e)=> {
                                sliderSound();
                                setAccessRatingInput(e.target.value)
                              }}
                              maxValue={10}
                              minValue={0}
                              placeholder={'最寄駅からのアクセス'}
                            />
                            <DisplayRatingInput
                              value={managementRatingInput}
                              onChange={(e)=> {
                                sliderSound();
                                setManagementRatingInput(e.target.value)
                              }}
                              maxValue={10}
                              minValue={0}
                              placeholder={'設備管理の状況'}
                            />
                          </StaticGrid>
                          <TextArea
                            value={descriptionInput}
                            onChange={(e)=> {
                              typeSound();
                              setDescriptionInput(e.target.value)
                            }}
                            placeholder={'行って感じた事、評価項目に写らない場所の良さ等。'}
                          />
                          {titleInput && descriptionInput &&
                            <AlignItems justifyContent={'center'}>
                              {hasReviewed ?
                                <Button
                                  iconPosition={'right'}
                                  icon={<VscSave/>}
                                  onClick={()=>{
                                    buttonSound();
                                    updateReview();
                                    setOpenCreateReview(false);
                                    getReviews();
                                  }}
                                >
                                  レビューの内容を更新
                                </Button>:
                                <Button
                                  iconPosition={'right'}
                                  icon={<VscSave/>}
                                  onClick={()=>{
                                    buttonSound();
                                    publishReview();
                                    setOpenCreateReview(false);
                                    getReviews();
                                  }}
                                >
                                  レビューを公開
                                </Button>
                              }
                            </AlignItems>
                          }
                        </StaticGrid>
                      </div>
                    }
                  </div>
                  {reviewData && reviewData.length > 0 && reviewData.map((review) =>{
                    return (
                      <Review
                        key={review.id}
                        title={review.data().title}
                        dateRating={review.data().dateRating}
                        accessRating={review.data().accessRating}
                        managementRating={review.data().managementRating}
                        description={review.data().description && review.data().description}
                      />
                    )
                  })}
                  {reviewData && reviewData.length > 0 ? 
                    <End/>:
                    <NoReviews/>
                  }
                </StaticGrid>
              </StaticGrid>
            </div>
          </div>
        </div>
      }
    </>
  )
}
