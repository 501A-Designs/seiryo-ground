import React from 'react'
import { styled } from '../../stitches.config';
import AlignItems from '../alignment/AlignItems'
import Grid from '../alignment/Grid';

const ReviewStyled = styled('div', {
  padding: '1em',
  borderRadius: '$r2',
  // backgroundColor: '$gray2',
  background: "linear-gradient($gray1 80%, $gray2 100%)",
  border:'1px solid $gray5',
  cursor: 'pointer',
  userSelect: 'none',
  transition: '$speed2',
  'h3':{
    marginBottom: '0',
    fontWeight:'500',
  },
  'p':{
    marginBottom: '0',
    color:'$gray11'
  },
  // '&:hover':{
  //   borderRadius: '$r3',
  //   transform: 'scale(1.02)',
  //   boxShadow:'$shadow1',
  //   backgroundColor:'$gray1'
  // }
})

const ReviewNumberStyled = styled('span',{
  fontSize:'$3',
  fontWeight:'500',
  color:'$gray12',
})
const ReviewNumberTextStyled = styled('span',{
  fontSize:'$8',
  color:'$gray11'
})


function ReviewValue(reviewValueProps) {
  return (
    <AlignItems>
      <ReviewNumberStyled>
        {reviewValueProps.children}
      </ReviewNumberStyled>
      <ReviewNumberTextStyled>
        {reviewValueProps.text}
      </ReviewNumberTextStyled>
    </AlignItems>
  )
}

export default function Review(props) {
  const data = props.data;
  return (
    <ReviewStyled key={props.key}>
      <Grid
        css={{
          marginBottom:'1em'
        }}
      >
        <h3>{data.title}</h3>
        <p>{data.description}</p>
      </Grid>
      <hr/>
      <Grid
        css={{
          marginTop:'1em'
        }}
      >
        <ReviewValue text='デートスポット適性'>
          {data.dateRating}
        </ReviewValue>
        <ReviewValue text='最寄駅のアクセス'>
          {data.accessRating}
        </ReviewValue>
        <ReviewValue text='設備管理の状況'>
          {data.managementRating}
        </ReviewValue>
      </Grid>
    </ReviewStyled>
  )
}
