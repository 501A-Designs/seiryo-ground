import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState,useEffect } from 'react'
import AlignItems from '../../lib/AlignItems'
import Button from '../../lib/Button'
import TypeBadge from '../../lib/TypeBadge'

import { db,auth } from '../../firebase'
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function PlaceName() {
    const router = useRouter();
    const placeId = router.query.slug;

    const [user, loading, error] = useAuthState(auth);
    const [placeData, setPlaceData] = useState()
    
    const getDocument = async () =>{
        if (placeId) {            
            const docRef = doc(db, "places", placeId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log(docSnap.data());
                setPlaceData(docSnap.data());
            } else {
                alert("ページは見つかりませんでした");
            }
        }
    }

    useEffect(() => {
        getDocument();
    }, [placeId])
    

    return (
        <>
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
                    <h1 style={{marginBottom:0}}>{placeData.name}</h1>
                    <TypeBadge type={placeData.type}/>
                    <div className="grid-1fr-2fr">
                        <p>{placeData.description}</p>
                        <iframe
                            src={`https://www.google.com/maps?output=embed&q=${placeData.location}`}
                            width="100%"
                            height="250px"
                        />
                    </div>
                    <h2>レビュー</h2>
                </div>
            }
        </>
    )
}
