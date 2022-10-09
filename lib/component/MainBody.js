import React from 'react'
import { popOut } from '../ux/keyframes'

export default function MainBody(props) {
  return (
    <div
      className={'pagePadding'}
      style={{
        animation: `${popOut} 0.8s`,
      }}
    >
      {props.children}
    </div>
  )
}
