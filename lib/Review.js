import React from 'react'
import AlignItems from './AlignItems'
import StaticGrid from './StaticGrid'

export default function Review(props) {
  return (
    <div
      style={{
        padding: '1em',
        borderRadius: '5px',
        backgroundColor: '#f0f0f0'
      }}
      className={'grid-2fr-1fr'}
    >
      <StaticGrid>
        <h3 style={{marginBottom: '0'}}>{props.title}</h3>
        {props.description && <p style={{margin: '0'}}>{props.description}</p>}
      </StaticGrid>
      <StaticGrid>
        <AlignItems><span style={{fontSize:'1.5em'}}>{props.dateRating}</span><span style={{fontSize:'0.8em'}}>/10：デートスポット適性</span></AlignItems>
        <AlignItems><span style={{fontSize:'1.5em'}}>{props.accessRating}</span><span style={{fontSize:'0.8em'}}>/10：最寄駅からのアクセス</span></AlignItems>
        <AlignItems><span style={{fontSize:'1.5em'}}>{props.managementRating}</span><span style={{fontSize:'0.8em'}}>/10：設備管理の状況</span></AlignItems>
      </StaticGrid>
    </div>
  )
}
