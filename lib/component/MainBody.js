import { styled } from '@stitches/react'
import React from 'react'
import { popOut } from '../ux/keyframes'



export default function MainBody(props) {
  const MainBody = styled('div',{
    animation: `${popOut} 0.8s`,
    variant: {
      responsivePadding:{
        mobile: {
          padding: '0% 2.5%'
        },
        tablet: {
          padding: '0% 10%'
        },
        computer: {
          padding: '0% 15%'
        }
      }
    }
  })
  return (
    <MainBody
      // className={'pagePadding'}
      // style={{
      //   animation: `${popOut} 0.8s`,
      // }}
      // responsivePadding={{
      //   'b1':'mobile'
      // }}
    >
      {props.children}
    </MainBody>
  )
}
