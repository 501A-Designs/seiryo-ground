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
import { VscAccount, VscAdd, VscClose, VscEdit, VscHeart, VscRedo, VscRocket, VscSave, VscSaveAs } from 'react-icons/vsc'
import End from '../../lib/End'
import NoReviews from '../../lib/NoReviews'


import moment from 'moment';
import 'moment/locale/ja'
import DisplayRatingInput from '../../lib/DisplayRatingInput'
import { isBrowser } from 'react-device-detect'

export default function PlaceName() {
    const router = useRouter();
    const placeId = router.query.slug;
    const [progress, setProgress] = useState(0);


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
                    if (user.uid == uid) {
                        setLiked(true);
                    }
                })
                getReviews();
                setProgress(100);
            } else {
                alert("??????????????????????????????????????????");
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

    const updateAverageRatings = async???() => {
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

    const publishReview = async() =>{
        await setDoc(doc(collection(db, `places/${placeId}/reviews/`), `${user && user.uid}`), {
            title: titleInput,
            description: descriptionInput,
            dateRating: dateRatingInput,
            accessRating: accessRatingInput,
            managementRating: managementRatingInput,
            lastUpdated:timeNow
        });
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
                            ??????
                        </Button>
                        {user &&
                            <AlignItems>
                                <Button
                                    // onClick={()=> }
                                    iconPosition={'left'}
                                    icon={<VscEdit/>}
                                >
                                    ??????????????????
                                </Button>
                                <Button
                                    onClick={()=> {liked ? removeLike():addLike()}}
                                    iconPosition={'left'}
                                    icon={<VscHeart/>}
                                >
                                    {liked ? '??????????????????':'?????????'}
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
                                    ???????????????
                                </a>
                            }
                        </AlignItems>
                    </StaticGrid>
                    <div className="grid-1fr-2fr">
                        <div>
                            <p>{placeData.description}</p>
                            {reviewData && reviewData.length > 0 &&
                                <StaticGrid grid={'1fr 1fr'}  gap={'0.25em'}>
                                    <Rating rating={round(averageOfDateRating)} description={'???????????????????????????'}/>
                                    <Rating rating={round(averageOfAccessRating)} description={'??????????????????????????????'}/>
                                    <Rating rating={round(averageOfManagementRating)} description={'?????????????????????'}/>
                                    <Rating rating={placeData.likes ? placeData.likes.length:0} description={'?????????????????????????????????'} hideMax={true}/>
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
                                                onClick={()=> {openCreateReview ? setOpenCreateReview(false):setOpenCreateReview(true)}}
                                            >
                                                {openCreateReview ? '?????????':<>{hasReviewed ? '??????????????????????????????':'?????????????????????'}</>}
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
                                            <h4>???????????????????????????????????????</h4>
                                            <p>?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</p>
                                            {isBrowser ? 
                                                <Button onClick={()=>router.push('/')}>????????????????????????????????????</Button>:
                                                <p>????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</p>
                                            }
                                        </div>
                                    }
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
                                                <h3>
                                                    {hasReviewed ?
                                                        '???????????????':'??????????????????'
                                                    }
                                                </h3>
                                                <Input
                                                    value={titleInput}
                                                    onChange={(e)=> setTitleInput(e.target.value)}
                                                    placeholder={'????????????????????????'}
                                                />
                                                <StaticGrid grid={'1fr 1fr 1fr'} gap={'0.25em'}>
                                                    <DisplayRatingInput
                                                        value={dateRatingInput}
                                                        onChange={(e)=> setDateRatingInput(e.target.value)}
                                                        maxValue={10}
                                                        minValue={0}
                                                        placeholder={'???????????????????????????'}
                                                    />
                                                    <DisplayRatingInput
                                                        value={accessRatingInput}
                                                        onChange={(e)=> setAccessRatingInput(e.target.value)}
                                                        maxValue={10}
                                                        minValue={0}
                                                        placeholder={'??????????????????????????????'}
                                                    />
                                                    <DisplayRatingInput
                                                        value={managementRatingInput}
                                                        onChange={(e)=> setManagementRatingInput(e.target.value)}
                                                        maxValue={10}
                                                        minValue={0}
                                                        placeholder={'?????????????????????'}
                                                    />
                                                </StaticGrid>
                                                <TextArea
                                                    value={descriptionInput}
                                                    onChange={(e)=> setDescriptionInput(e.target.value)}
                                                    placeholder={'????????????????????????????????????????????????????????????????????????'}
                                                />
                                                {titleInput && descriptionInput &&
                                                    <AlignItems justifyContent={'center'}>
                                                        {hasReviewed ?
                                                            <Button
                                                                iconPosition={'right'}
                                                                icon={<VscSave/>}
                                                                onClick={()=>{
                                                                    updateReview();
                                                                    setOpenCreateReview(false);
                                                                    getReviews();
                                                                }}
                                                            >
                                                                ??????????????????????????????
                                                            </Button>:
                                                            <Button
                                                                iconPosition={'right'}
                                                                icon={<VscSave/>}
                                                                onClick={()=>{
                                                                    publishReview();
                                                                    setOpenCreateReview(false);
                                                                    getReviews();
                                                                }}
                                                            >
                                                                ?????????????????????
                                                            </Button>
                                                        }
                                                    </AlignItems>
                                                }
                                            </StaticGrid>
                                        </div>
                                    }
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
