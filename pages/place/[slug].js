import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState,useEffect } from 'react'
import AlignItems from '../../lib/AlignItems'
import Button from '../../lib/Button'
import TypeBadge from '../../lib/TypeBadge'

import { db,auth } from '../../firebase'
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import Rating from '../../lib/Rating'
import StaticGrid from '../../lib/StaticGrid'

import LoadingBar from 'react-top-loading-bar';
import Review from '../../lib/Review'
import Input from '../../lib/Input'
import TextArea from '../../lib/TextArea'
import { VscAccount, VscAdd, VscClose, VscEdit, VscHeart, VscRedo } from 'react-icons/vsc'
import End from '../../lib/End'
import NoReviews from '../../lib/NoReviews'


import moment from 'moment';
import 'moment/locale/ja'
import DisplayRatingInput from '../../lib/DisplayRatingInput'

export default function PlaceName() {
    const router = useRouter();
    const placeId = router.query.slug;
    const [progress, setProgress] = useState(0);


    const [createReview, setCreateReview] = useState(false);
    const [hasReviewed, setHasReviewed] = useState(false);

    const [user, loading, error] = useAuthState(auth);
    const [placeData, setPlaceData] = useState();
    
    const getDocument = async () =>{
        setProgress(0);
        if (placeId && user) {            
            const docRef = doc(db, "places", placeId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log(docSnap.data());
                setPlaceData(docSnap.data());
                if (docSnap.data().reviews) {                    
                    docSnap.data().reviews.map((review) =>{
                        if (review.authorUid == user.uid) {
                            setHasReviewed(true)
                        }
                    })
                }
                setProgress(100);
            } else {
                alert("ページは見つかりませんでした");
            }
        }
    }


    const [titleInput, setTitleInput] = useState('');
    const [dateRatingInput, setDateRatingInput] = useState(0);
    const [accessRatingInput, setAccessRatingInput] = useState(0);
    const [managementRatingInput, setManagementRatingInput] = useState(0);
    const [descriptionInput, setDescriptionInput] = useState('');

    const publishReview = async() =>{
        if (placeId && user) {
            let timeNow = moment().format('MMMM Do YYYY, h:mm a');
            await updateDoc(doc(db, "places", placeId), {
                reviews: arrayUnion({
                    authorUid:user.uid,
                    title:titleInput,
                    description: descriptionInput,
                    rating: {
                        dateRating:dateRatingInput,
                        accessRating:accessRatingInput,
                        managementRating:managementRatingInput,
                    },
                    lastUpdated:timeNow
                })
            });
        }
        setHasReviewed(true);
    }

    useEffect(() => {
        getDocument();
    }, [placeId])

    let arrayOfDateRating = [];
    let arrayOfAccessRating = [];
    let arrayOfManagementRating = [];

    if (placeData && placeData.reviews) {
        placeData.reviews.map((review) =>{
            arrayOfDateRating.push(review.rating.dateRating);
            arrayOfAccessRating.push(review.rating.accessRating);
            arrayOfManagementRating.push(review.rating.managementRating);
        })
        console.log('bruh')
    }

    let sumOfArrayOfDateRating = arrayOfDateRating.reduce((sum, element) => sum + element, 0);
    let sumOfArrayOfAccessRating = arrayOfAccessRating.reduce((sum, element) => sum + element, 0);
    let sumOfArrayOfManagementRating = arrayOfManagementRating.reduce((sum, element) => sum + element, 0);
    

    return (
        <>
            <LoadingBar
                color='black'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            {placeData &&             
                <div
                    className="pagePadding"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap:'1em'
                    }}
                >
                    <AlignItems spaceBetween={true}>
                        <Button onClick={()=> router.push('/')}>
                            戻る
                        </Button>
                        {user &&
                            <AlignItems>
                                <Button
                                    onClick={()=> setCreateReview(true)}
                                    iconPosition={'left'}
                                    icon={<VscEdit/>}
                                >
                                    ページを編集
                                </Button>
                                <Button
                                    onClick={()=> setCreateReview(true)}
                                    iconPosition={'left'}
                                    icon={<VscHeart/>}
                                >
                                    いいね
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
                            {placeData.reviews && placeData.reviews.length > 0 &&
                                <StaticGrid grid={'1fr 1fr'}  gap={'0.25em'}>
                                    <Rating rating={sumOfArrayOfDateRating/placeData.reviews.length} description={'デートスポット適正'}/>
                                    <Rating rating={sumOfArrayOfAccessRating/placeData.reviews.length} description={'最寄駅からのアクセス'}/>
                                    <Rating rating={sumOfArrayOfManagementRating/placeData.reviews.length} description={'設備管理の状況'}/>
                                    <Rating rating={placeData.likes} description={'清涼広場上でのいいね数'} hideMax={true}/>
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
                                            {hasReviewed ?
                                                <Button
                                                    onClick={()=> setCreateReview(true)}
                                                    iconPosition={'left'}
                                                    icon={<VscRedo/>}
                                                >
                                                    書いたレビューを編集
                                                </Button>:
                                                <Button
                                                    onClick={()=> setCreateReview(true)}
                                                    iconPosition={'left'}
                                                    icon={<VscAdd/>}
                                                >
                                                    レビューを書く
                                                </Button>
                                            }
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
                                            <Button onClick={()=>router.push('/')}>メインページから会員登録</Button>
                                        </div>
                                    }
                                    {createReview &&                                     
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
                                                <AlignItems spaceBetween={true}>
                                                    <h3>新規レビュー</h3>
                                                    <Button
                                                        iconPosition={'left'}
                                                        icon={<VscClose/>}
                                                        onClick={()=> setCreateReview(false)}
                                                    />
                                                </AlignItems>
                                                <Input
                                                    value={titleInput}
                                                    onChange={(e)=> setTitleInput(e.target.value)}
                                                    placeHolder={'レビュータイトル'}
                                                />
                                                <StaticGrid grid={'1fr 1fr 1fr'} gap={'0.25em'}>
                                                    <DisplayRatingInput
                                                        value={dateRatingInput}
                                                        onChange={(e)=> setDateRatingInput(e.target.value)}
                                                        maxValue={10}
                                                        minValue={0}
                                                        placeHolder={'デートスポット適正'}
                                                    />
                                                    <DisplayRatingInput
                                                        value={accessRatingInput}
                                                        onChange={(e)=> setAccessRatingInput(e.target.value)}
                                                        maxValue={10}
                                                        minValue={0}
                                                        placeHolder={'最寄駅からのアクセス'}
                                                    />
                                                    <DisplayRatingInput
                                                        value={managementRatingInput}
                                                        onChange={(e)=> setManagementRatingInput(e.target.value)}
                                                        maxValue={10}
                                                        minValue={0}
                                                        placeHolder={'設備管理の状況'}
                                                    />
                                                </StaticGrid>
                                                <TextArea
                                                    value={descriptionInput}
                                                    onChange={(e)=> setDescriptionInput(e.target.value)}
                                                    placeHolder={'行って感じた事、評価項目に写らない場所の良さ等。'}
                                                />
                                                {titleInput && descriptionInput &&
                                                    <Button onClick={()=>publishReview()}>レビューを追加</Button>
                                                }
                                            </StaticGrid>
                                        </div>
                                    }
                                    {placeData.reviews && placeData.reviews.map((review) =>{
                                        return (
                                            <Review
                                                title={review.title}
                                                dateRating={review.rating.dateRating}
                                                accessRating={review.rating.accessRating}
                                                managementRating={review.rating.managementRating}
                                                description={review.description && review.description}
                                            />
                                        )
                                    })}
                                    {placeData.reviews && placeData.reviews.length > 0 ? 
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
