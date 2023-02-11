import React from 'react'
import { styled } from '../../stitches.config';
import AlignItems from '../alignment/AlignItems'
import Grid from '../alignment/Grid';

const ReviewStyled = styled('div', {
  padding: '1em',
  borderRadius: '$r2',
  backgroundColor: '$gray2',
  border:'1px solid $gray5',
  cursor: 'pointer',
  userSelect: 'none',
  transition: '$speed2',
  'h3':{
    marginBottom: '0'
  },
  'p':{
    marginBottom: '0',
    fontSize: '$8'
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
  fontWeight:'bold',
  fontFamily:'$sgFont2',
})
const ReviewNumberTextStyled = styled('span',{
  fontSize:'$8',
  color:'gray'
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
  return (
    <ReviewStyled key={props.key}>
      <Grid grid={'twoOne'} gap={'medium'}>
        <Grid>
          <h3>{data.title}</h3>
          <p>{data.description}</p>
        </Grid>
        <Grid>
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
      </Grid>
    </ReviewStyled>
  )
}
