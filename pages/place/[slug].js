import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import AlignItems from '../../lib/AlignItems'
import Button from '../../lib/Button'
import TypeBadge from '../../lib/TypeBadge'
import { createClient } from 'contentful'

const client = createClient({
  space:process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken:process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
})

export async function getStaticPaths(){
    const res = await client.getEntries({
        content_type:'sgPage'
    })
    const paths = res.items.map(item => {
        return{
            params: {
                slug: item.fields.slug
            }
        }
    })

  return{
    paths,
    fallback:false
  }
}

export async function getStaticProps({params}) {
    const { items } = await client.getEntries({
        content_type:'sgPage',
        'fields.slug':params.slug
    })
    return{
        props:{
            pageDetails:items[0]
        }
    }
}

export default function PlaceName({pageDetails}) {
    const router = useRouter();
    console.log(pageDetails)
    let title = '小石川後楽園'
    let slug = 'koishikawakorakuen'
    let img = 'https://s3-ap-northeast-1.amazonaws.com/thegate/2020/09/07/15/19/22/koishikawakorakuen.jpg'

    console.log(pageDetails.fields.pricing)

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
