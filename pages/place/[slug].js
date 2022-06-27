import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import AlignItems from '../../lib/AlignItems'
import Button from '../../lib/Button'
import TypeBadge from '../../lib/TypeBadge'

export default function PlaceName() {
    const router = useRouter();

    return (
        <div
            className="pageCenter"
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
                {pageDetails.fields.officialSite && 
                    <a href={pageDetails.fields.officialSite} target="_blank">
                        公式サイト
                    </a>
                }
            </AlignItems>
            <div className="grid-1fr-2fr">
                <div>
                    <h1>{pageDetails.fields.title}</h1>
                    <AlignItems>
                        <TypeBadge type={pageDetails.fields.type}/>
                        <time>{pageDetails.fields.date.split('T')[0]}</time>
                    </AlignItems>
                    <p>{pageDetails.fields.description}</p>
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
                    }
                </div>
                <iframe
                    src={`https://www.google.com/maps?output=embed&q=${pageDetails.fields.slug}`}
                    width="100%"
                    height="400px"
                />
            </div>
        </div>
    )
}
