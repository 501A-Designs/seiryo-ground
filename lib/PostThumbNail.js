import { useRouter } from 'next/router'
import React from 'react'
import AlignItems from './AlignItems';
import TypeBadge from './TypeBadge';
import { VscHeart } from 'react-icons/vsc';

import {buttonSound,tapSound} from '../lib/sound/audio'
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../firebase';
import { styled } from '@stitches/react';

export default function PostThumbNail(props) {
  const router = useRouter();
  const [reviewsCollection] = useCollection(collection(db, `places/${props.id}/reviews/`))

  const PostThumbNail = styled('div', {
    cursor:'pointer',
    backgroundColor:'var(--sgLightGray)',
    color:'black',
    height:'max-content',
    padding:'1em',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '10px',
    transition: '0.2s',
    // transform: `translateX(${}) translateY(${})`,
    '&:hover':{
      borderRadius:'15px',
      zIndex: '100',
      color:'gray',
      backgroundColor:'black',
      color:'white',
      transform:'scale(1.05) perspective(200px) rotateX(2deg) rotateY(0deg)',
      boxShadow: '0px 10px 10px var(--sgGray)'
    },
    'h1':{
      margin:0
    }
  })

    

  return (
    <PostThumbNail
      onMouseEnter={()=>tapSound()}
      key={props.key}
      onClick={()=> {
        buttonSound();
        router.push(`/place/${props.id}/`);
      }}
    >
      <AlignItems>
        <h3 style={{marginTop: '0.5em'}}>{props.title}</h3>
        <AlignItems>
          {props.like && <VscHeart/>}
        </AlignItems>
      </AlignItems>
      <AlignItems justifyContent={'space-between'}>
        <TypeBadge type={props.type} short/>
        {reviewsCollection && reviewsCollection.docs.length > 0 && 
          <p style={{margin: 0}}>{reviewsCollection.docs.length}件</p>
        }
      </AlignItems>
    </PostThumbNail>
  )
}
