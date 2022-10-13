import { useRouter } from 'next/router'
import React, { useState,useEffect } from 'react'
import AlignItems from '../../lib/alignment/AlignItems'
import TypeBadge from '../../lib/TypeBadge'

import { db,auth } from '../../firebase'
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import Rating from '../../lib/Rating'
import StaticGrid from '../../lib/alignment/StaticGrid'

import LoadingBar from 'react-top-loading-bar';
import Review from '../../lib/place-page/Review'
import Input from '../../lib/Input'
import TextArea from '../../lib/TextArea'
import End from '../../lib/End'

import Button from '../../lib/button/Button'
import TypeButton from '../../lib/button/TypeButton'

import moment from 'moment';
import 'moment/locale/ja'
import DisplayRatingInput from '../../lib/DisplayRatingInput'
import { isBrowser } from 'react-device-detect'

import {celebrationSound, notificationSound, selectSound, sliderSound, typeSound} from '../../lib/ux/audio'
import Head from 'next/head'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import Modal from '../../lib/component/Modal'
import { FiArrowLeft, FiEdit, FiHeart, FiPlus, FiRefreshCw, FiSave, FiUser, FiX } from 'react-icons/fi'
import { useDocument } from 'react-firebase-hooks/firestore'
import { ClipLoader } from 'react-spinners'
import Container from '../../lib/component/Container'
import MainBody from '../../lib/component/MainBody'
import CreateContainer from '../../lib/component/CreateContainer'

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
  // const [placeData, setPlaceData] = useState();
  const [rawPlaceData, loadingRawPlaceData] = useDocument(doc(db, `places/${placeId && placeId}`));
  let placeData = rawPlaceData && rawPlaceData.data();
  

  const [reviewData, setReviewData] = useState();

  const [averageOfDateRating, setAverageOfDateRating] = useState(0);
  const [averageOfAccessRating, setAverageOfAccessRating] = useState(0);
  const [averageOfManagementRating, setAverageOfManagementRating] = useState(0);
  
  const [liked, setLiked] = useState(false);
  const getDocument = async () =>{
    setProgress(0);
    if (placeId) {
      const docSnap = await getDoc(doc(db, `places/${placeId}`));
      if (docSnap.exists()) {
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
      getReviews();
      setProgress(100);
    }
  }


  const [placeInput, setPlaceInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [prefectureInput, setPrefectureInput] = useState();
  const [descriptionInput, setDescriptionInput] = useState('');
  const [typeInput, setTypeInput] = useState('');
  const [officialSiteInput, setOfficialSiteInput] = useState('');

  // const [published, setPublished] = useState(false);
  // const [newPlace, setNewPlace] = useState();

  const editThisPlace = async() => {
    await updateDoc(collection(db, "places"), {
      name: placeInput,
      location: locationInput,
      prefecture: prefectureInput,
      description: descriptionInput,
      editedBy:[{editedBy:user.uid}],
      type: typeInput,
      officialSite:officialSiteInput,
    });
    setPlaceInput('');
    setLocationInput('');
    setDescriptionInput('');
    setTypeInput('');
    // setPublished(true);
    // setNewPlace(docRef);
    notificationSound();
  }

  const reviewsCollectionRef = collection(db, `places/${placeId}/reviews`);
  
  const getReviews = async () => {
    let reviewsArray = [];
    const querySnapshot = await getDocs(reviewsCollectionRef)
    querySnapshot.forEach((doc) => {
      reviewsArray.push(doc);
      if (user && user.uid === doc.id) {
        setHasReviewed(true);
        setTitleRatingInput(doc.data().title);
        setDescriptionRatingInput(doc.data().description);
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

  const [titleRatingInput, setTitleRatingInput] = useState('');
  const [dateRatingInput, setDateRatingInput] = useState(0);
  const [accessRatingInput, setAccessRatingInput] = useState(0);
  const [managementRatingInput, setManagementRatingInput] = useState(0);
  const [descriptionRatingInput, setDescriptionRatingInput] = useState('');

  let timeNow = moment().format('MMMM Do YYYY, h:mm a');
  const typeButtonArray = ["green","blue","red","purple",]

  const publishReview = async() =>{
    await setDoc(doc(collection(db, `places/${placeId}/reviews/`), `${user && user.uid}`), {
      title: titleRatingInput,
      description: descriptionRatingInput,
      dateRating: dateRatingInput,
      accessRating: accessRatingInput,
      managementRating: managementRatingInput,
      lastUpdated:timeNow
    });
    notificationSound();
  }

  const updateReview = async() =>{    
    await updateDoc(doc(db, `places/${placeId}/reviews/${user && user.uid}`), {
      title: titleRatingInput,
      description: descriptionRatingInput,
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
        <meta
          name="description"
          content="Generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoadingBar
        color='black'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Modal
        modalState={modalIsOpen}
        onClickBackdrop={() => setModalIsOpen(false)}
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
          <Button icon={<FiSave/>} iconPosition={'left'}>変更を保存</Button>
        </AlignItems>
      </Modal>

      {loadingRawPlaceData && 
        <AlignItems justifyContent={'center'} height={'100vh'}>
          <ClipLoader color="black"/>
        </AlignItems>
      }

      {placeData &&
        <MainBody>
          <AlignItems spaceBetween={true} margin={'0.5em 0 0 0'}>
            <Button
              color='transparent'
              iconPosition={'left'}
              icon={<FiArrowLeft/>}
              onClick={()=> {router.push('/');}}
            >
              戻る
            </Button>
            {user &&
              <AlignItems>
                {/* <Button
                  onClick={()=> setModalIsOpen(true)}
                  iconPosition={'left'}
                  icon={<FiEdit/>}
                >
                  ページを編集
                </Button> */}
                <Button
                  color='transparent'
                  iconPosition={'left'}
                  icon={<FiHeart/>}
                  onClick={()=> {
                    !liked && celebrationSound();
                    liked ? removeLike():addLike()
                  }}
                >
                  {liked ? 'いいねを外す':'いいね'}
                </Button>
              </AlignItems>
            }
          </AlignItems>
          <StaticGrid>
            <h1
              style={{
                marginBottom:'0.5em',
                fontWeight: '500',
                letterSpacing: '-1.5px'
              }}
            >
              {placeData.name}
            </h1>
            <AlignItems spaceBetween={true}>
              <TypeBadge
                width={'long'}
                type={placeData.type}
              />
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
                    description={'いいね数'}
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
                        color='black'
                        iconPosition={'left'}
                        icon={openCreateReview ? <FiX/>:<>{hasReviewed ? <FiRefreshCw/>:<FiPlus/>}</>}
                        onClick={()=> {
                          openCreateReview ? setOpenCreateReview(false):setOpenCreateReview(true)
                        }}
                      >
                        {openCreateReview ? '閉じる':<>{hasReviewed ? '書いたレビューを編集':'レビューを書く'}</>}
                      </Button>
                    </AlignItems>:
                    <Container
                      type='standard'
                      alignment='center'
                    >
                      <h4>ログインされておりません。</h4>
                      <p>ログインしてアカウントを作成すると、レビューや場所を清涼広場上に投稿する事ができます！</p>
                      {isBrowser ? 
                        <Button
                          color='black'
                          onClick={()=>router.push('/')}
                        >
                          メインページから会員登録
                        </Button>:
                        <p>※モバイルからのログインは出来ないです。パソコンからアクセスして頂くとログインが可能となります。</p>
                      }
                    </Container>
                  }

                  <div ref={parent}>
                    {openCreateReview && 
                      <CreateContainer>
                        <StaticGrid gap={'0.25em'}>
                          <h3>{hasReviewed ? '内容を更新':'新規レビュー'}</h3>
                          <Input
                            value={titleRatingInput}
                            onChange={(e)=> {
                              typeSound();
                              setTitleRatingInput(e.target.value)
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
                            value={descriptionRatingInput}
                            onChange={(e)=> {
                              typeSound();
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
                                  color='black'
                                  iconPosition={'right'}
                                  icon={<FiSave/>}
                                  onClick={()=>{
                                    updateReview();
                                    setOpenCreateReview(false);
                                    getReviews();
                                  }}
                                >
                                  レビューの内容を更新
                                </Button>:
                                <Button
                                  color='black'
                                  iconPosition={'right'}
                                  icon={<FiSave/>}
                                  onClick={()=>{
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
                      </CreateContainer>
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
                </StaticGrid>
              </StaticGrid>
            </div>
          </div>
        </MainBody>
      }
    </>
  )
}
