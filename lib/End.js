import React from 'react'

export default function End() {
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
          backgroundColor:'black',
          width:'1px',
          height: '100px',
          borderRadius: '5px'
        }}
      />
      <h4
        style={{
          writingMode:'vertical-rl',
          textOrientation:'mixed'
        }}
      >
        終わり。
        <br/>
        The End.
      </h4>
    </div>
  )
}
