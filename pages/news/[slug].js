import React from 'react'
import { createClient } from 'contentful'
import { useRouter } from 'next/router'
import Button from '../../lib/Button'

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
            newsDetails:items[0]
        }
    }
}

export default function IndivisualNewsArticle({newsDetails}) {
  let newsDetailsData = newsDetails.fields;
  const router = useRouter();

  return (
    <div className={'pagePadding'}>
      <Button onClick={()=> router.push('/news/')}>SG News ページに戻る</Button>
      <h1>{newsDetailsData.title}</h1>
      <time>{newsDetailsData.date}</time>
      <p>
        {newsDetailsData.description}
      </p>
    </div>
  )
}
