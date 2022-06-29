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
    const placeId = router.query.id;

    const [user, loading, error] = useAuthState(auth);

    const [placeData, setPlaceData] = useState()

    const getDocument = async() =>{
        if (placeId != '') {            
            const docRef = doc(db, "places", placeId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPlaceData(docSnap.data());
            } else {
                alert("ページは見つかりませんでした");
            }
        }
    }

    useEffect(() => {
        getDocument();
    }, [user])
    

    return (
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

                {/* {pageDetails.fields.officialSite && 
                    <a href={pageDetails.fields.officialSite} target="_blank">
                        公式サイト
                    </a>
                } */}
            </AlignItems>
            <div className="grid-1fr-2fr">
                <div>
                    <h1>{placeData && placeData.name}</h1>
                    <AlignItems>
                        {/* <TypeBadge type={pageDetails.fields.type}/>
                        <time>{pageDetails.fields.date.split('T')[0]}</time> */}
                    </AlignItems>
                    {/* <p>{pageDetails.fields.description}</p>
                    {pageDetails.fields.pricing == undefined ?
                        <p>無料です。</p>:
                        <table>
                            {pageDetails.fields.pricing.pricing.map(data =>{
                                return (
                                    <tr>
                                        {
                                            data.map(detailData =>{
                                                return <td>{detailData}</td>
                                            })
                                        }
                                    </tr>
                                )
                            })}
                        </table>
                    } */}
                </div>
            </div>
        </div>
    )
}
