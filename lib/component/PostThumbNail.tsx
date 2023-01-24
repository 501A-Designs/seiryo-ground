import { useRouter } from 'next/router'
import React, { useState}from 'react'
import AlignItems from '../alignment/AlignItems';
import TypeBadge from '../TypeBadge';
import { VscHeart } from 'react-icons/vsc';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { styled } from '../../stitches.config';
import Grid from '../alignment/Grid';
import useSound from 'use-sound';
import { gradient } from '../ux/keyframes';

const PostThumbNailStyled = styled('div', {
  cursor:'pointer',
  border:'1px solid $gray4',
  background: 'linear-gradient(45deg,white 0%,$gray4 50%,white 100%)',
  backgroundSize: '200% 200%',
  color:'black',
  height:'max-content',
  padding:'1em',
  borderRadius: '$r2',
  transition: '$speed1',
  '&:hover':{
    zIndex: '100',
    animation:`${gradient} linear 0.3s`,
    transform:'scale(0.95)',
  },
  'h3':{
    fontSize:'$5',
    marginTop: '0.5em',
    fontWeight: '500'
  },
  'span':{
    fontSize:'$7',
  }
})

export default function PostThumbNail(props) {
  const router = useRouter();
  const [reviewsCollection] = useCollection(collection(db, `places/${props.id}/reviews/`));

  // Sound
  const [action1] = useSound('/sound/action-1-sg.mp3',{playbackRate:1.1});

  return (
    <PostThumbNailStyled
      onClick={()=> {
        action1();
        router.push(`/place/${props.id}/`);
      }}
    >
      <Grid gap={'medium'}>
        <AlignItems>
          <h3>{props.title}</h3>
        </AlignItems>
        <AlignItems justifyContent={'space-between'}>
          <TypeBadge
            width={'mini'}
            type={props.type}
          />
          {reviewsCollection && reviewsCollection.docs.length > 0 && 
            <span style={{margin: 0}}>
              {reviewsCollection.docs.length}件
            </span>
          }
        </AlignItems>
      </Grid>
    </PostThumbNailStyled>
  )
}
