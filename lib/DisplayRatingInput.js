import React from 'react'

export default function DisplayRatingInput(props) {
  return (
    <div
        style={{
            display: 'grid',
            gridTemplateColumns:'1fr',
            backgroundColor:'#f0f0f0',
            padding: '1em 1em 0.5em 1em',
            gap:'1em',
            borderRadius: '5px'
        }}
    >
      <h2 style={{margin: '0',textAlign: 'center'}}>{props.value}</h2>
      <input
        max={props.maxValue}
        min={props.minValue}
        type={"range"}
        value={props.value}
        onChange={props.onChange}
      />
      <p style={{textAlign: 'center'}}>{props.placeholder}</p>
    </div>
  )
}