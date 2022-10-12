import { styled } from '@stitches/react'
import Link from 'next/link'
import React from 'react'
import { topSlideIn } from '../ux/keyframes'

let WelcomeHeaderStyled = styled('section', {
  textAlign:'right',
  display: 'flex',
  justifyContent: 'right',
  margin: '1em 0',
  animation: `${topSlideIn} 0.5s`,
  'div':{
    alignSelf: 'flex-end',
    fontFamily: '$sgFont2',
    'h1':{
      margin:'0.5em 0',
    },
    'p':{
      margin:0,
    }
  }
})

export default function WelcomeHeader() {
  return (
    <WelcomeHeaderStyled>
      <div>
        <h1>ゆたかなしぜんへ</h1>
        <p>Find places where you can truly relax.</p>
        <p>Photo By <Link href="https://twitter.com/EyesObsolete"><a>@EyesObsolete</a></Link></p>
      </div>
    </WelcomeHeaderStyled>
  )
}
