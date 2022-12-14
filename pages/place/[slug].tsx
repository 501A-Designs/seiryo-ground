import { useRouter } from 'next/router'
import React, { useState,useEffect } from 'react'
import AlignItems from '../../lib/alignment/AlignItems'
import TypeBadge from '../../lib/TypeBadge'

import { db,auth } from '../../firebase'
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, increment, setDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
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

import { useAutoAnimate } from '@formkit/auto-animate/react'
// import Modal from '../../lib/component/Modal'
import { FiArrowLeft, FiCheck, FiCreditCard, FiDollarSign, FiEdit, FiExternalLink, FiHeart, FiHome, FiLock, FiMaximize2, FiPlus, FiRefreshCw, FiSave, FiSmartphone, FiUserCheck, FiUserX, FiX } from 'react-icons/fi'
import { useDocument } from 'react-firebase-hooks/firestore'
import { ClipLoader } from 'react-spinners'
import Container from '../../lib/component/Container'
import MainBody from '../../lib/alignment/Margin'
import CreateContainer from '../../lib/component/CreateContainer'
import Grid from '../../lib/alignment/Grid'
import SizeSelectContainer, { SizeSelect } from '../../lib/button/SizeSelectContainer'
import BinaryToggleContainer, { BinaryToggle } from '../../lib/button/BinaryToggleContainer'
import { costButtonArray, sizeButtonArray, typeButtonArray } from '../../lib/button/buttonData'
import CheckBox from '../../lib/button/CheckBox'
import useSound from 'use-sound'
import Footer from '../../lib/component/Footer'
import Dialog from '../../lib/component/Dialog'
import AccordionContainer, { AccordionItem } from '../../lib/component/AccordionContainer'
import Link from 'next/link'
import UniversalNav from '../../lib/component/UniversalNav'

export default function PlaceName() {
  const router = useRouter();
  const placeId = router.query.slug;
  const [parent] = useAutoAnimate();
  const [progress, setProgress] = useState(0);

  // Sound
  const [tap1] = useSound('/sound/tap-1-sg.mp3');
  const [tap2] = useSound('/sound/tap-2-sg.mp3');
  const [tap3] = useSound('/sound/tap-3-sg.mp3');
  const [select1] = useSound('/sound/select-1-sg.mp3');
  const [select2] = useSound('/sound/select-2-sg.mp3');
  const [action1] = useSound('/sound/action-1-sg.mp3');
  const [load1] = useSound('/sound/load-1-sg.mp3');
  const [celebrate1] = useSound('/sound/celebrate-1-sg.mp3');
  const [celebrate2] = useSound('/sound/celebrate-2-sg.mp3');

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [openCreateReview, setOpenCreateReview] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  const [user] = useAuthState(auth);
  // const [placeData, setPlaceData] = useState();
  const [rawPlaceData, loadingRawPlaceData] = useDocument(doc(db, `places/${placeId && placeId}`));
  let placeData = rawPlaceData && rawPlaceData.data();

  // const [currentUserLevel, setCurrentUserLevel] = useState('0')
  const [userData] = useDocument(doc(db, `users/${user && user.uid}`));
  
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

  console.log()

  const [placeInput, setPlaceInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [officialSiteInput, setOfficialSiteInput] = useState('');

  const [sizeSelect, setSizeSelect] = useState('medium');
  const [binaryToggle, setBinaryToggle] = useState(false)
  const [typeInput, setTypeInput] = useState('');
  const [costCheckBox, setCostCheckBox] = useState(['free']);

  useEffect(() => {
    if (placeData) {      
      setPlaceInput(placeData.name);
      setLocationInput(placeData.location);
      setDescriptionInput(placeData.description);
      setOfficialSiteInput(placeData.officialSite);
      setSizeSelect(placeData.size);
      setBinaryToggle(placeData.toilet);
      setTypeInput(placeData.type);
      setCostCheckBox(placeData.cost);
    }
  },[modalIsOpen])
  // const [published, setPublished] = useState(false);
  // const [newPlace, setNewPlace] = useState();

  const editThisPlace = async() => {
    setModalIsOpen(false);
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
    await updateDoc(doc(db, `places/${placeId}/reviews/${user && user.uid}`), {
      title: titleRatingInput,
      description: descriptionRatingInput,
      dateRating: dateRatingInput,
      accessRating: accessRatingInput,
      managementRating: managementRatingInput,
      lastUpdated:timeNow
    });
    celebrate1();
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

  const closeCreateReviewContainer = () =>{
    setOpenCreateReview(false);
    tap1();
  }

  const openCreateReviewContainer = () =>{
    setOpenCreateReview(true);
    action1();
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
        color='black'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {loadingRawPlaceData && 
        <AlignItems justifyContent={'center'} height={'100vh'}>
          <ClipLoader color="black"/>
        </AlignItems>
      }

      {placeData && 
        <>
        <MainBody>
          <Grid>
            <h1
              style={{
                marginBottom:'0.5em',
                fontWeight: '500',
                letterSpacing: '-1.5px'
              }}
            >
              {placeData.name}
            </h1>
            <TypeBadge
              width={'long'}
              type={placeData.type}
            />
          </Grid>
          <Grid grid={'oneTwo'} gap={'large'}>
            <Grid gap={'small'}>
              <p>{placeData.description}</p>
              {reviewData && reviewData.length > 0 &&
                <Grid grid={'duo'} gap={'extraSmall'}>
                  <Rating
                    borderRadius={'topLeft'}
                    rating={round(averageOfDateRating)}
                    description={'デートスポット適正'}
                  />
                  <Rating
                    borderRadius={'topRight'}
                    rating={round(averageOfAccessRating)}
                    description={'最寄駅からのアクセス'}
                  />
                  <Rating
                    borderRadius={'bottomLeft'}
                    rating={round(averageOfManagementRating)}
                    description={'設備管理の状況'}
                  />
                  <Rating
                    borderRadius={'bottomRight'}
                    rating={placeData.likes ? placeData.likes.length:0}
                    description={'いいね数'}
                    hideMax={true}
                  />
                </Grid>
              }

              <Container type="white">
                <Grid grid={'duo'} gap={'medium'}>
                  <h5>基本情報</h5>
                  <Grid gap={'small'}>
                    {placeData.officialSite && 
                      <AlignItems gap={'0.5em'}>
                        <FiExternalLink/>
                        <h5>
                          <Link
                            href={placeData.officialSite}
                            target="_blank"
                            rel="noreferrer"
                          >
                            公式サイト
                          </Link>
                        </h5>
                      </AlignItems>
                    }
                    <AlignItems gap={'0.5em'}>
                      {placeData.toilet ?
                        <>
                          <FiUserCheck/>
                          <h5>トイレ有</h5>
                        </>:
                        <>
                          <FiUserX/>
                          <h5>トイレ無</h5>
                        </>
                      }
                    </AlignItems>
                    <AlignItems gap={'0.5em'}>
                      <FiMaximize2/>
                      {placeData.size == 'small' && <h5>小さい</h5>}
                      {placeData.size == 'medium' && <h5>普通</h5>}
                      {placeData.size == 'large' && <h5>大きい</h5>}
                    </AlignItems>
                  </Grid>
                  <h5>料金</h5>
                  <Grid gap={'small'}>
                    {placeData.cost.map(name =>{
                      return <AlignItems gap={'0.5em'}
                        key={name}
                      >
                        {name === 'free' && 
                          <>
                            <FiCheck/>
                            <h5>無料</h5>
                          </>
                        }
                        {name === 'cash' &&
                          <>
                            <FiDollarSign/>
                            <h5>現金</h5>
                          </>
                        }
                        {name === 'credit' &&
                          <>
                            <FiCreditCard/>
                            <h5>クレジットカード</h5>
                          </>
                        }
                        {name === 'digitalMoney' &&
                          <>
                            <FiSmartphone/>
                            <h5>電子マネー</h5>
                          </>
                        }
                      </AlignItems>
                    })
                    }
                  </Grid>
                </Grid>
              </Container>

              <iframe
                src={`https://www.google.com/maps?output=embed&q=${placeData.location}`}
                width="100%"
                height="250px"
              />
            </Grid>
            <Grid gap={'small'}>
              {user ? 
                <AlignItems justifyContent={'center'}>
                  <Button
                    styleType={'black'}
                    icon={openCreateReview ? <FiX/>:<>{hasReviewed ? <FiRefreshCw/>:<FiPlus/>}</>}
                    onClick={()=>{openCreateReview ? 
                      closeCreateReviewContainer():
                      openCreateReviewContainer()
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
                      iconPosition={'left'}
                      icon={<FiHome/>}
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
                    <Grid gap={'extraSmall'}>
                      <h3>{hasReviewed ? '内容を更新':'新規レビュー'}</h3>
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
                              styleType={'black'}
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
                    </Grid>
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
            </Grid>
          </Grid>
          <Footer type={'blur'}/>
        </MainBody>
        <UniversalNav
          size={user ? 'xl':'l'}
          hideInitially={false}
          dynamicButton={
            <>
              <Button
                size={'small'}
                styleType={'transparent'}
                icon={<FiArrowLeft/>}
                onClick={()=> {router.push('/')}}
              />
              {user &&
                <>
                  {userData.data().level > 1 &&
                    <Dialog
                      title={'この場所を編集'}
                      size={'large'}
                      trigger={
                        <Button
                          size={'small'}
                          styleType={'transparent'}
                          onClick={()=> {
                            action1();
                            setModalIsOpen(true);
                          }}
                          iconPosition={'left'}
                          icon={<FiEdit/>}
                        />
                      }
                    >
                      <AlignItems justifyContent={'center'}>
                        <Button
                          color={'black'}
                          iconPosition={'left'}
                          icon={<FiSave/>}
                          onClick={()=> editThisPlace()}
                        >
                          変更を保存
                        </Button>
                      </AlignItems>
                      {userData && userData.data() &&
                        <Grid gap={'small'}>
                          {userData.data().level < 5 &&
                            <Container
                              type="standard"
                              alignment="center"
                            >
                              <AlignItems>
                                <FiLock/>
                                <h5>報告</h5>
                              </AlignItems>
                              <p>全ての編集機能をアクセスするにはカードをアップグレードする必要があります。</p>
                            </Container>
                          }
                          {/* PLACE NAME */}
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

                          {/* PLACE DESCRIPTION */}
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

                          {/* SITE */}
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

                          {/* PLACE DESCRIPTION */}
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
                            <iframe
                              src={`https://www.google.com/maps?output=embed&q=${locationInput}`}
                              width="100%"
                              height="250px"
                            />
                          </>
                          }
                          <AccordionContainer>
                            {userData.data().level > 1 &&
                              <AccordionItem
                                number={'1'}
                                name={'トイレの有無'}
                              >
                                <Container type="standard">
                                  <BinaryToggleContainer>
                                    <BinaryToggle
                                      currentState={binaryToggle}
                                      selected={binaryToggle === true}
                                      onClick={()=>{
                                        select1();
                                        setBinaryToggle(true)
                                      }}
                                    >
                                      有
                                    </BinaryToggle>
                                    <BinaryToggle
                                      currentState={binaryToggle}
                                      selected={binaryToggle === false}
                                      onClick={()=>{
                                        select2();
                                        setBinaryToggle(false)
                                      }}
                                    >
                                      無
                                    </BinaryToggle>
                                  </BinaryToggleContainer>
                                </Container>
                              </AccordionItem>                          
                            }
                            <AccordionItem
                              number={'2'}
                              name={'種類'}
                            >
                              {userData.data().level > 3 &&
                                <Grid gap={'extraSmall'}>
                                  {typeButtonArray.map(color =>{
                                    return <TypeButton
                                      key={color}
                                      type={color}
                                      onClick={()=>{
                                        select1();
                                        setTypeInput(color);
                                      }}
                                      selectedInput={typeInput}
                                    />
                                  })}
                                </Grid>
                              }
                            </AccordionItem>
                            {userData.data().level > 2 &&
                              <>
                                <AccordionItem
                                  number={'3'}
                                  name={'値段'}
                                >
                                  <Grid gap={'extraSmall'}>
                                    {costButtonArray.map(name =>{
                                      return(
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
                                      )
                                    })}
                                  </Grid>
                                </AccordionItem>
                                <AccordionItem
                                  number={'4'}
                                  name={'大きさ'}
                                >   
                                  <SizeSelectContainer
                                    hide
                                    currentState={sizeSelect}
                                  >
                                    {sizeButtonArray.map(size=>{
                                      return <SizeSelect
                                        name={size}
                                        key={size}
                                        currentState={sizeSelect}
                                        onClick={()=> {
                                          select1();
                                          setSizeSelect(size);
                                        }}
                                      />
                                    })}
                                  </SizeSelectContainer>
                                </AccordionItem>
                              </>
                            }
                          </AccordionContainer>
                        </Grid>
                      }
                    </Dialog>
                  }
                  <Button
                    size={'small'}
                    styleType={'transparent'}
                    icon={<FiHeart/>}
                    onClick={()=> {
                      !liked && celebrate2();
                      liked ? removeLike():addLike()
                    }}
                  />
                </>
              }
            </>
          }
        >
        </UniversalNav>
        </>
      }
    </>
  )
}