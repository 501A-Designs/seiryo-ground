import { useRouter } from 'next/router'
import React, { useState } from 'react'
import AlignItems from '../alignment/AlignItems';
import TypeBadge from '../TypeBadge';
import { styled } from '../../stitches.config';
import Grid from '../alignment/Grid';
import useSound from 'use-sound';
import { gradient } from '../ux/keyframes';
import { HeartIcon, TargetIcon } from '@radix-ui/react-icons';
import { round } from '../util/helper';

const PostThumbNailStyled = styled('div', {
  cursor:'pointer',
  // border:'1px solid transparent',
  height:'max-content',
  padding:'0.7em',
  borderRadius: '$r2',
  transition: '$speed1',
  border:'1px solid $gray4',
  backgroundColor:'$gray2',
  '&:hover':{
    zIndex: '100',
    backgroundColor:'$gray3',
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

const IconTextContainerStyled = styled('div',{
  display:'flex',
  alignItems:'center',
  gap:'$extraSmall',
  color:'$gray10',
  fontSize:'$9',
  whiteSpace:'nowrap',
  'svg':{
    width:12,
    height:12
  }
})

export default function PostThumbNail(props) {
  const router = useRouter();
  const data = props?.data;
  const averageRate = data?.averageRating;

  const overallScore:number = round(
    100*
    ((
      averageRate?.access + 
      averageRate?.date + 
      averageRate?.management
    )/3)/10
  );

  const [loadingState, setLoadingState] = useState(false);
  const [tap1] = useSound('/sound/tap-1-sg.mp3');

  return (
    <PostThumbNailStyled
      key={props.key}
      loading={loadingState}
      onClick={()=> {
        tap1();
        setLoadingState(true);
        router.push(`/place/${props.id}/`);
      }}
    >
      <Grid gap={'extraSmall'}>
        <AlignItems>
          <TypeBadge
            width={'small'}
            type={data?.type}
          />
          <h5>{data?.name}</h5>
        </AlignItems>
        <p>
          {data?.description}
        </p>
          {/* {reviewsCollection?.docs.length > 0 &&
            <>{reviewsCollection.docs.length + '_'}review | </>
          } */}
        <AlignItems
          spaceBetween
          margin={'0.5em 0 0 0'}
        >
          <AlignItems>
            {
              overallScore > 0 &&
              <IconTextContainerStyled>
                <TargetIcon/>
                {overallScore}%
              </IconTextContainerStyled>
            }
            {
              data?.likes?.length > 0 &&
              <IconTextContainerStyled>
                <HeartIcon/>
                {data?.likes?.length}
              </IconTextContainerStyled>
            }
          </AlignItems>
          <IconTextContainerStyled>
            {data?.prefecture}
          </IconTextContainerStyled>
        </AlignItems>
      </Grid>
    </PostThumbNailStyled>
  )
}
