import { useAutoAnimate } from '@formkit/auto-animate/react'
import React from 'react'

export default function StaticGrid(props) {
  const [parent] = useAutoAnimate();
  return (
    <div
      style={{
        width: '100%',
        height: 'fit-content',
        display: 'grid',
        gridTemplateColumns: `${props.grid ? props.grid:'1fr'}`,
        gap:`${props.gap ? props.gap:'0em'}`,
      }}
      ref={props.animate && parent}
    >
      {props.children}
    </div>
  )
}
