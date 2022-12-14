import React from 'react'
import { createClient } from 'contentful'
import { useRouter } from 'next/router'
import Button from '../../lib/button/Button'
import AlignItems from '../../lib/alignment/AlignItems'
import MainBody from '../../lib/alignment/Margin'
import { FiArrowLeft } from 'react-icons/fi'
import Grid from '../../lib/alignment/Grid'

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
    <MainBody>
      <AlignItems spaceBetween={true} margin={'0.5em 0 0 0'}>
        <Button
          color={'transparent'}
          iconPosition={'left'}
          icon={<FiArrowLeft/>}
          onClick={()=> {router.push('/news/')}}
        >
          ニュースページに戻る
        </Button>
      </AlignItems>
      <Grid>
        <h1>{newsDetailsData.title}</h1>
        <time>{newsDetailsData.date}</time>
        <p>
          {newsDetailsData.description}
        </p>
      </Grid>
    </MainBody>
  )
}
