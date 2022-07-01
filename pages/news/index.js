import React from 'react'
import { createClient } from 'contentful'
import UpdatePostThumbNail from '../../lib/UpdatePostThumbNail'
import Button from '../../lib/Button'
import { VscChevronLeft } from 'react-icons/vsc'
import { useRouter } from 'next/router'
import { isBrowser } from 'react-device-detect';
import StaticGrid from '../../lib/StaticGrid'

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
      <div className={'stickySide'}>
        <div
          style={{
            maxWidth:`${isBrowser ? '300px':'400px'}`,
            position: 'sticky',
            top: '0px',
            height: 'fit-content',
            flexDirection: 'column',
            justifyContent:'space-between',
            backdropFilter: 'blur(16px)',
            background: 'radial-gradient(86.36% 107.55% at 6.49% 12.32%,white 0%,rgba(255, 255, 255, 0.5) 100%)',
            zIndex:10
          }}
        >
          <h1 style={{margin:'1em 0 0 0'}}>SG News</h1>
          <h3 style={{margin:0}}>SEIRYO GROUND NEWS</h3>
          <p>清涼広場に関する新情報を徹底的に更新していきたいと思います。作成者は501Aです。</p>
        </div>
        <StaticGrid>
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
        </StaticGrid>
      </div>
    </div>
  )
}
