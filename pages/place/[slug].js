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

    return (
        <main>
            <section className="grid-1fr-2fr">
                <div style={{display: 'flex', flexDirection: 'column', gap:'1em'}}>
                    <AlignItems spaceBetween={true}>
                        <Button onClick={()=> router.push('/')}>
                            戻る
                        </Button>
                        <a href="https://www.tokyo-park.or.jp/park/format/index030.html">公式サイト</a>
                    </AlignItems>
                    <iframe
                        src={`https://www.google.com/maps?output=embed&q=${pageDetails.fields.slug}`}
                        width="100%"
                        height="400px"
                        loading="lazy"
                    />
                </div>
                <div>
                    <AlignItems spaceBetween={true}>
                        <h1>{pageDetails.fields.title}</h1>
                        <AlignItems>
                            <TypeBadge type={pageDetails.fields.type}/>
                            <time>{pageDetails.fields.date.split('T')[0]}</time>
                        </AlignItems>
                    </AlignItems>
                    <p>{pageDetails.fields.description}</p>

                    <h3>写真</h3>
                    <p></p>
                    <h3>料金</h3>
                    <table>
                        <tr>
                            <td>大人・大学生</td>
                            <td>500円</td>
                        </tr>
                        <tr>
                            <td>子供</td>
                            <td>200円</td>
                        </tr>
                    </table>
                    <h3>同じ場所</h3>
                </div>
            </section>
        </main>
    )
}
