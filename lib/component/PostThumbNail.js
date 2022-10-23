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

const PostThumbNailStyled = styled('div', {
  cursor:'pointer',
  // backgroundColor:'$sgGray1',
  background:'linear-gradient(217deg, $sgGray2, $sgGray1)',
  border: '1px solid $sgGray2',
  color:'black',
  height:'max-content',
  padding:'1em',
  borderRadius: '$r2',
  transition: '$speed1',
  '&:hover':{
    background:'linear-gradient(217deg, #404040, black)',
    borderRadius:'$r3',
    zIndex: '100',
    color:'white',
    transform:'scale(1.05) perspective(200px) rotateX(2deg) rotateY(0deg)',
    boxShadow: '0px 10px 10px $sgGray2',
  },
  'h3':{
    fontSize:'$5',
    marginTop: '0.5em'
  },
  'span':{
    fontSize:'$7',
  }
})

export default function PostThumbNail(props) {
  const router = useRouter();
  const [reviewsCollection] = useCollection(collection(db, `places/${props.id}/reviews/`));
  const [hovered, setHovered] = useState(false);

  // Sount
  const [action1] = useSound('/sound/action-1-sg.mp3',{playbackRate:1.1});

  return (
    <PostThumbNailStyled
      onMouseEnter={()=>{setHovered(true)}}
      onMouseLeave={()=> setHovered(false)}
      key={props.key}
      onClick={()=> {
        action1();
        router.push(`/place/${props.id}/`);
      }}
    >
      <Grid gap={'medium'}>
        <AlignItems>
          <h3>{props.title}</h3>
          <AlignItems>
            {props.like && <VscHeart/>}
          </AlignItems>
        </AlignItems>
        <AlignItems justifyContent={'space-between'}>
          <TypeBadge
            width={hovered ? 'short':'mini'}
            type={props.type}
          />
          {reviewsCollection && reviewsCollection.docs.length > 0 && 
            <span style={{margin: 0}}>{reviewsCollection.docs.length}件</span>
          }
        </AlignItems>
      </Grid>
    </PostThumbNailStyled>
  )
}
