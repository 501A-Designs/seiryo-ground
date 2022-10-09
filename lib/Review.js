import { useAutoAnimate } from '@formkit/auto-animate/react';
import { styled } from '@stitches/react';
import React from 'react'
import AlignItems from './alignment/AlignItems'
import StaticGrid from './alignment/StaticGrid'
import { tapSound } from './ux/audio';

export default function Review(props) {

  const Review = styled('div', {
    padding: '1em',
    borderRadius: '10px',
    backgroundColor: 'var(--sgLightGray)',
    border:'1px solid var(--sgMediumGray)',
    cursor: 'pointer',
    userSelect: 'none',
    transition: '0.2s',
    'h3':{
      marginBottom: '0'
    },
    'p':{
      marginBottom: '0'
    },
    '&:hover':{
      transform: 'scale(1.02)',
    }
  })
  return (
    <Review
      key={props.key}
      className={'grid-2fr-1fr'}
      onMouseEnter={()=> tapSound()}
    >
      <StaticGrid>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </StaticGrid>
      <StaticGrid>
        <AlignItems><span style={{fontSize:'1.5em'}}>{props.dateRating}</span><span style={{fontSize:'0.8em'}}>/10：デートスポット適性</span></AlignItems>
        <AlignItems><span style={{fontSize:'1.5em'}}>{props.accessRating}</span><span style={{fontSize:'0.8em'}}>/10：最寄駅からのアクセス</span></AlignItems>
        <AlignItems><span style={{fontSize:'1.5em'}}>{props.managementRating}</span><span style={{fontSize:'0.8em'}}>/10：設備管理の状況</span></AlignItems>
      </StaticGrid>
    </Review>
  )
}
