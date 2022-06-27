import React from 'react'
import { createClient } from 'contentful'
import UpdatePostThumbNail from '../../lib/UpdatePostThumbNail'
import Button from '../../lib/Button'
import { VscChevronLeft } from 'react-icons/vsc'
import { useRouter } from 'next/router'

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
    <div
      className={'pagePadding'}
    >
      <Button
        iconPosition={'left'}
        icon={<VscChevronLeft/>}
        onClick={()=> router.push('/')}
      >
        戻る
      </Button>
      <div style={{display: 'grid', gridTemplateColumns:'1fr 2fr',gap:'1em'}}>
        <div>
          <div
            style={{
              display:'grid',
              gridTemplateColumns:'1fr',
              margin:'2em 0'
            }}
          >
            <h1 style={{margin:0}}>SG News</h1>
            <h3 style={{margin:0}}>SEIRYO GROUND NEWS</h3>
          </div>
          <p>清涼広場に関する新情報を徹底的に更新していきたいと思います。作成者は501Aです。</p>
        </div>
        <div style={{display: 'grid', gridTemplateColumns:'1fr', height:'fit-content'}}>
          {sgPosts.map(data =>{
            return(
              <UpdatePostThumbNail
                key={data.sys.id}
                slug={data.fields.slug}
                title={data.fields.title}
                date={data.fields.date.split('T')[0]}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
