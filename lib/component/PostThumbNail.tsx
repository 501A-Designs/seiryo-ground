import { useRouter } from 'next/router'
import React, { useState } from 'react'
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
  border:'1px solid transparent',
  height:'max-content',
  padding:'0.7em',
  borderRadius: '$r2',
  transition: '$speed1',
  '&:hover':{
    zIndex: '100',
    border:'1px solid $gray5',
    boxShadow:'0 0 10px $gray1'
  },
  'h5':{
    margin:'0',
    color:'$gray12',
  },
  'p':{
    fontSize:'$9',
    margin:'0',
  },
  variants:{
    loading:{
      true:{
        background: 'linear-gradient(45deg,$gray1 0%,$gray5 50%,$gray1 100%)',
        backgroundSize: '200% 200%',
        animation:`${gradient} linear 0.3s infinite`,
      }
    }
  }
})

export default function PostThumbNail(props) {
  const router = useRouter();
  // const [reviewsCollection] = useCollection(collection(db, `places/${props.id}/reviews/`));

  const data = props?.data;

  const [loadingState, setLoadingState] = useState(false);

  return (
    <PostThumbNailStyled
      key={props.key}
      loading={loadingState}
      onClick={()=> {
        setLoadingState(true)
        router.push(`/place/${props.id}/`);
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
            {/* {reviewsCollection?.docs.length > 0 &&
              <>{reviewsCollection.docs.length + '_'}review | </>
            } */}
            {data?.likes?.length + '_'}heart
          </p>
        </Grid>
      </AlignItems>
    </PostThumbNailStyled>
  )
}
