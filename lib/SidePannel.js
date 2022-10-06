import React from 'react'
import AlignItems from './alignment/AlignItems'

export default function SidePannel(props) {
  return (
    <div
      ref={props.ref}
      style={{
        position: 'sticky',
        top: 0,
        left: '50px',
        // top: '5%',
        // right: '10%',
        padding: '0 0 1em 0',
        width:'500px',
        minHeight: 'fit-content',
        background: 'radial-gradient(86.36% 107.55% at 6.49% 12.32%,rgba(255, 255, 255, 0.5) 0%,rgba(255, 255, 255, 0.5) 100%)',
        backdropFilter: 'blur(15px)',
        maxHeight:'90vh',
        overflowY:'scroll',
        borderRadius: '20px',
        boxShadow: '0px 0px 15px #f0f0f0',
        zIndex:10,
      }}
    >
      <div
        style={{
          backgroundColor: 'black',
          color: 'white',
          marginBottom:'0.5em'
        }}
      >
        <AlignItems justifyContent={'center'}>
          <h5>好きな場所一覧</h5>
        </AlignItems>
      </div>
      {props.children}
    </div>
  )
}
