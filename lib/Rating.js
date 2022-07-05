import React from 'react'
import AlignItems from './AlignItems'

export default function Rating(props) {
  return (
    <div
      style={{
        backgroundColor: 'black',
        padding: '1em',
        borderTop: '1px solid white',
        borderRight: '1px solid white',
        borderRadius: `${props.borderRadius}`
      }}
    >
      <AlignItems>
        <h1 style={{margin:0, color: 'white'}}>{props.rating}</h1>
        {!props.hideMax && <h3 style={{margin:0, color: 'white'}}>/10</h3>}
      </AlignItems>
      <p style={{margin:0, color: 'white'}}>{props.description}</p>
    </div>
  )
}
