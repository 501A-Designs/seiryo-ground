import { useAutoAnimate } from '@formkit/auto-animate/react';
import React from 'react'
import { styled } from '../../stitches.config';
import AlignItems from '../alignment/AlignItems'
import StaticGrid from '../alignment/StaticGrid'
import { tapSound } from '../ux/audio';

const ReviewStyled = styled('div', {
  padding: '1em',
  borderRadius: '$r2',
  backgroundColor: '$sgGray1',
  border:'1px solid $sgGray2',
  cursor: 'pointer',
  userSelect: 'none',
  fontFamily: '$sgFont1',
  transition: '$speed1',
  'h3':{
    marginBottom: '0'
  },
  'p':{
    marginBottom: '0',
    fontSize: '$8'
  },
  '&:hover':{
    transform: 'scale(1.02)',
  }
})

const ReviewNumberStyled = styled('span',{
  fontSize:'$3',
  fontWeight:'bold',
})
const ReviewNumberTextStyled = styled('span',{
  fontSize:'$8',
  color:'gray'
})


function ReviewValue(props) {
  return (
    <AlignItems>
      <ReviewNumberStyled>
        {props.children}
      </ReviewNumberStyled>
      <ReviewNumberTextStyled>
        /10：{props.text}
      </ReviewNumberTextStyled>
    </AlignItems>
  )
}


export default function Review(props) {
  return (
    <ReviewStyled
      key={props.key}
      className={'grid-2fr-1fr'}
      onMouseEnter={()=> tapSound()}
    >
      <StaticGrid>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </StaticGrid>
      <StaticGrid>
        <ReviewValue text='デートスポット適性'>{props.dateRating}</ReviewValue>
        <ReviewValue text='最寄駅からのアクセス'>{props.accessRating}</ReviewValue>
        <ReviewValue text='設備管理の状況'>{props.managementRating}</ReviewValue>
      </StaticGrid>
    </ReviewStyled>
  )
}
