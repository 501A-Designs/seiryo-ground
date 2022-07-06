import React from 'react'
import AlignItems from './AlignItems'

export default function Rating(props) {
  return (
    <div
      style={{
        backgroundColor: 'black',
        color: 'white',
        padding: '1em',
        borderRadius: '5px'
      }}
    >
      <AlignItems>
        <h2 style={{margin:0}}>{props.rating}</h2>
        {!props.hideMax && <h4 style={{margin:0}}>/10</h4>}
      </AlignItems>
      <p style={{margin:0}}>{props.description}</p>
    </div>
  )
}
