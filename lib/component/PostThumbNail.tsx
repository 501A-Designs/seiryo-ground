import { useRouter } from 'next/router'
import React from 'react'
import AlignItems from '../alignment/AlignItems';
import TypeBadge from '../TypeBadge';
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
  height:'max-content',
  padding:'1em',
  borderRadius: '$r2',
  transition: '$speed1',
  '&:hover':{
    zIndex: '100',
    animation:`${gradient} linear 0.3s`,
    border:'1px solid $gray6',
  },
  'h4':{
    margin:'0',
    fontWeight: '500',
    color:'$gray12',
  },
  'p':{
    color:'$gray11',
    margin:'0',
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
        router.push(`/place/${props.id}/`);
        action1();
      }}
    >
      <Grid gap={'medium'}>
        <AlignItems>
          <h4>{props.title}</h4>
        </AlignItems>
        <AlignItems justifyContent={'space-between'}>
          <TypeBadge
            width={'mini'}
            type={props.type}
          />
          <p>
            {reviewsCollection?.docs.length > 0 ? 
              <>{reviewsCollection.docs.length}件</>:
              <>:(</>
            }
          </p>
        </AlignItems>
      </Grid>
    </PostThumbNailStyled>
  )
}
