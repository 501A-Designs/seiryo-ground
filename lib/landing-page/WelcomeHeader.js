import Link from 'next/link'
import React from 'react'
import { styled } from '../../stitches.config'
import { topSlideIn } from '../ux/keyframes'

const WelcomeHeaderStyled = styled('section', {
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
  },
  '@mobile':{
    display: 'none',
  },
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
