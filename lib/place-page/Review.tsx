import React from 'react'
import { styled } from '../../stitches.config';
import AlignItems from '../alignment/AlignItems'
import Grid from '../alignment/Grid';

const ReviewStyled = styled('div', {
  padding: '0 1em',
  borderRadius: '$r2',
  
  // background: "linear-gradient($gray1 80%, $gray2 100%)",
  border:'1px solid $gray4',
  backgroundColor: '$gray2',

  cursor: 'pointer',
  userSelect: 'none',
  transition: '$speed2',
  'h4':{
    marginBottom: '0',
    fontWeight:'500',
  },
  'p':{
    marginBottom: '0',
    fontSize:'$9'
  },
  // '&:hover':{
  //   borderRadius: '$r3',
  //   transform: 'scale(1.02)',
  //   boxShadow:'$shadow1',
  // }
})

const ReviewNumberStyled = styled('span',{
  fontSize:'$4',
  fontWeight:'500',
  color:'$gray12',
})
const ReviewNumberTextStyled = styled('span',{
  fontSize:'$9',
  color:'$gray11'
})


function ReviewValue(reviewValueProps) {
  return (
    <AlignItems>
      <ReviewNumberStyled>
        {reviewValueProps.children}
      </ReviewNumberStyled>
      <ReviewNumberTextStyled>
        /10：{reviewValueProps.text}
      </ReviewNumberTextStyled>
    </AlignItems>
  )
}

export default function Review(props) {
  const data = props.data;
  const ratingData = data.rating;
  return (
    <ReviewStyled key={props.key}>
      {/* <hr/> */}
      <Grid
        css={{
          marginBottom:'1em'
        }}
      >
        <h4>{data.title}</h4>
        <p>{data.description}</p>
      </Grid>
      <Grid
        css={{
          marginBottom:'1em'
        }}
      >
        <ReviewValue text='最寄駅のアクセス'>
          {ratingData.access}
        </ReviewValue>
        <ReviewValue text='デートスポット適性'>
          {ratingData.date}
        </ReviewValue>
        <ReviewValue text='設備管理の状況'>
          {ratingData.management}
        </ReviewValue>
      </Grid>
    </ReviewStyled>
  )
}
