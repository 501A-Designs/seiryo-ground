import React from 'react'
import { useRouter } from 'next/router'
import { createClient } from 'contentful'
import NewsThumbnail from '../../lib/component/NewsThumbNail'
import Button from '../../lib/button/Button'
import AlignItems from '../../lib/alignment/AlignItems'
import { FiArrowLeft } from 'react-icons/fi'
import MainBody from '../../lib/alignment/Margin'
import Grid from '../../lib/alignment/Grid'

export async function getStaticProps(){
  const client = createClient({
    space:process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken:process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
  })
  const res = await client.getEntries({
    content_type:'sgPage'
  })
  return{
    props:{
      sgPosts:res.items
    }
  }
}

export default function News({sgPosts}) {
  const router = useRouter();

  return (
    <MainBody>
      <AlignItems spaceBetween={true} margin={'0.5em 0 0 0'}>
        <Button
          color={'transparent'}
          iconPosition={'left'}
          icon={<FiArrowLeft/>}
          onClick={()=> {router.push('/')}}
        >
          メインに戻る
        </Button>
      </AlignItems>
      <Grid
        grid={'oneTwo'}
      >
        <Grid>
          <h1>清涼 NEWS</h1>
          <p>清涼広場に関する新情報を徹底的に更新していきたいと思います。作成者は501Aです。</p>
        </Grid>
        <Grid>
          {sgPosts.map(data =>{
            return(
              <NewsThumbnail
                key={data.sys.id}
                slug={data.fields.slug}
                title={data.fields.title}
                date={data.fields.date.split('T')[0]}
              />
            )
          })}
        </Grid>
      </Grid>
    </MainBody>
  )
}
