import React from 'react'
import { VscSquirrel } from 'react-icons/vsc'

export default function NoReviews() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1em',
        padding: '5% 0',
      }}
    >
      <div
        style={{
          backgroundColor:'gray',
          width:'1px',
          height: '50px',
        }}
      />
      <VscSquirrel/>
      <div
        style={{
          backgroundColor:'gray',
          width:'1px',
          height: '50px',
        }}
      />
      <h4
        style={{
          writingMode:'vertical-rl',
          textOrientation:'mixed'
        }}
      >
        レビューはありません。
        <br/>
        No reviews were written.
      </h4>
    </div>
  )
}
