import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState,useEffect } from 'react'
import AlignItems from '../../lib/AlignItems'
import Button from '../../lib/Button'
import TypeBadge from '../../lib/TypeBadge'

import { db,auth } from '../../firebase'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import Rating from '../../lib/Rating'
import StaticGrid from '../../lib/StaticGrid'

import LoadingBar from 'react-top-loading-bar';
import Review from '../../lib/Review'
import Input from '../../lib/Input'
import TextArea from '../../lib/TextArea'
import { VscAccount, VscAdd, VscClose, VscEdit, VscHeart, VscRedo, VscRocket, VscSave, VscSaveAs } from 'react-icons/vsc'
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
    const [thisReview, setThisReview] = useState({})

    const [user, loading, error] = useAuthState(auth);
    const [placeData, setPlaceData] = useState();

    // let arrayOfDateRating = [];
    // let arrayOfAccessRating = [];
    // let arrayOfManagementRating = [];

    const [arrayOfDateRating, setArrayOfDateRating] = useState([])
    const [arrayOfAccessRating, setArrayOfAccessRating] = useState([])
    const [arrayOfManagementRating, setArrayOfManagementRating] = useState([])
    
    const getDocument = async () =>{
        setProgress(0);
        if (placeId) {            
            const docRef = doc(db, "places", placeId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPlaceData(docSnap.data());
                if (docSnap.data().reviews) {            
                    docSnap.data().reviews.map((review) =>{
                        if (user && review.authorUid === user.uid) {
                            setHasReviewed(true);
                            setThisReview(review)
                            setTitleInput(review.title);
                            setDescriptionInput(review.description);
                            setDateRatingInput(review.rating.dateRating);
                            setAccessRatingInput(review.rating.accessRating);
                            setManagementRatingInput(review.rating.managementRating);
                        }
                        setArrayOfDateRating([ ...arrayOfDateRating, parseInt(review.rating.dateRating)]);
                        setArrayOfAccessRating([ ...arrayOfAccessRating, parseInt(review.rating.accessRating)]);
                        setArrayOfManagementRating([ ...arrayOfManagementRating, parseInt(review.rating.managementRating)]);
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

    let timeNow = moment().format('MMMM Do YYYY, h:mm a');
    const publishReview = async() =>{
        if (placeId && user) {
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
        setCreateReview(false);
    }

    const removeReview = async() =>{
        if (placeId && user) {
            setArrayOfDateRating([]);
            setArrayOfAccessRating([]);
            setArrayOfManagementRating([]);
            await updateDoc(doc(db, "places", placeId), {
                reviews: arrayRemove({
                    authorUid:user.uid,
                    title:thisReview.title,
                    description: thisReview.description,
                    rating: {
                        dateRating: thisReview.rating.dateRating,
                        accessRating: thisReview.rating.accessRating,
                        managementRating: thisReview.rating.managementRating,
                    },
                    lastUpdated:thisReview.lastUpdated
                })
            });
        }
        setCreateReview(true)
    }

    const updateReview = async() =>{
        if (placeId && user) {
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
        setCreateReview(false);
        getDocument();
    }

    useEffect(() => {
        getDocument();
    }, [placeId,hasReviewed])

    console.log(arrayOfDateRating)

    // let sumOfArrayOfDateRating = arrayOfDateRating.reduce((sum, element) => sum + element, 0);
    // let sumOfArrayOfAccessRating = arrayOfAccessRating.reduce((sum, element) => sum + element, 0);
    // let sumOfArrayOfManagementRating = arrayOfManagementRating.reduce((sum, element) => sum + element, 0);

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
                                    <Rating rating={arrayOfDateRating.reduce((sum, element) => sum + element, 0)/arrayOfDateRating.length} description={'デートスポット適正'}/>
                                    <Rating rating={arrayOfAccessRating.reduce((sum, element) => sum + element, 0)/arrayOfAccessRating.length} description={'最寄駅からのアクセス'}/>
                                    <Rating rating={arrayOfManagementRating.reduce((sum, element) => sum + element, 0)/arrayOfManagementRating.length} description={'設備管理の状況'}/>
                                    <Rating rating={placeData.likes ? placeData.likes:0} description={'清涼広場上でのいいね数'} hideMax={true}/>
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
                                                    onClick={()=> {createReview ? updateReview():removeReview()}}
                                                    iconPosition={'left'}
                                                    icon={createReview ? <VscClose/>:<VscRedo/>}
                                                >
                                                    {createReview ? '保存して閉じる':'書いたレビューを編集'}
                                                </Button>:
                                                <Button
                                                    onClick={()=> {createReview ? setCreateReview(false):setCreateReview(true)}}
                                                    iconPosition={'left'}
                                                    icon={createReview ? <VscClose/>:<VscAdd/>}
                                                >
                                                    {createReview ? '閉じる':'レビューを書く'}
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
                                                <h3>
                                                    {hasReviewed ?
                                                        '内容を更新':'新規レビュー'
                                                    }
                                                </h3>
                                                <Input
                                                    value={titleInput}
                                                    onChange={(e)=> setTitleInput(e.target.value)}
                                                    placeholder={'レビュータイトル'}
                                                />
                                                <StaticGrid grid={'1fr 1fr 1fr'} gap={'0.25em'}>
                                                    <DisplayRatingInput
                                                        value={dateRatingInput}
                                                        onChange={(e)=> setDateRatingInput(e.target.value)}
                                                        maxValue={10}
                                                        minValue={0}
                                                        placeholder={'デートスポット適正'}
                                                    />
                                                    <DisplayRatingInput
                                                        value={accessRatingInput}
                                                        onChange={(e)=> setAccessRatingInput(e.target.value)}
                                                        maxValue={10}
                                                        minValue={0}
                                                        placeholder={'最寄駅からのアクセス'}
                                                    />
                                                    <DisplayRatingInput
                                                        value={managementRatingInput}
                                                        onChange={(e)=> setManagementRatingInput(e.target.value)}
                                                        maxValue={10}
                                                        minValue={0}
                                                        placeholder={'設備管理の状況'}
                                                    />
                                                </StaticGrid>
                                                <TextArea
                                                    value={descriptionInput}
                                                    onChange={(e)=> setDescriptionInput(e.target.value)}
                                                    placeholder={'行って感じた事、評価項目に写らない場所の良さ等。'}
                                                />
                                                {titleInput && descriptionInput &&
                                                    <AlignItems justifyContent={'center'}>
                                                        {!hasReviewed &&
                                                            <Button
                                                                iconPosition={'right'}
                                                                icon={<VscSave/>}
                                                                onClick={()=>publishReview()}
                                                            >
                                                                レビューを公開
                                                            </Button>
                                                        }
                                                    </AlignItems>
                                                }
                                            </StaticGrid>
                                        </div>
                                    }
                                    {placeData.reviews && placeData.reviews.map((review) =>{
                                        return (
                                            <Review
                                                key={review.title+review.rating.dateRating}
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
