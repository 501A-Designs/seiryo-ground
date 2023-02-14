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
  // border:'1px solid $gray4',
  border:'1px solid transparent',

  height:'max-content',
  padding:'0.7em',
  borderRadius: '$r2',
  transition: '$speed1',
  '&:hover':{
    background: 'linear-gradient(45deg,$gray1 0%,$gray3 50%,$gray1 100%)',
    backgroundSize: '200% 200%',

    zIndex: '100',
    animation:`${gradient} linear 0.3s`,
    border:'1px solid $gray3',
    boxShadow:'0 0 10px $gray1'
  },
  'h5':{
    margin:'0',
    color:'$gray12',
    fontWeight:'500'
  },
  'p':{
    color:'$gray11',
    fontSize:'$9',
    margin:'0',
  }
})

export default function PostThumbNail(props) {
  const router = useRouter();
  const [reviewsCollection] = useCollection(collection(db, `places/${props.id}/reviews/`));

  // Sound
  const [action1] = useSound('/sound/action-1-sg.mp3',{playbackRate:1.1});

  const data = props?.data;

  return (
    <PostThumbNailStyled
      onClick={()=> {
        router.push(`/place/${props.id}/`);
        action1();
      }}
    >
      <AlignItems>
        <TypeBadge
          width={'small'}
          type={data?.type}
        />
        <Grid gap={'extraSmall'}>
          <h5>{data?.name}</h5>
          <p>
            {reviewsCollection?.docs.length > 0 &&
              <>{reviewsCollection.docs.length + '_'}review | </>
            }
            {data?.likes?.length + '_'}heart
          </p>
        </Grid>
      </AlignItems>
    </PostThumbNailStyled>
  )
}
