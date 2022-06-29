import React from 'react'

export default function StaticGrid(props) {
  return (
    <div
      style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: `${props.grid ? props.grid:'1fr'}`,
        gap:`${props.gap ? props.gap:'0em'}`
      }}
    >
      {props.children}
    </div>
  )
}
