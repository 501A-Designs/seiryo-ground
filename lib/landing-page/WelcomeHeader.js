import { styled } from '@stitches/react'
import Link from 'next/link'
import React from 'react'
import { topSlideIn } from '../ux/keyframes'

export default function WelcomeHeader() {
  let WelcomeHeaderContent = styled('div', {
    alignSelf: 'flex-end',
    'h3':{
      margin:0
    },
    'p':{
      margin:0
    }
  })
  return (
    <section
      style={{
        textAlign:'right',
        display: 'flex',
        justifyContent: 'right',
        margin: '1em 0',
        animation: `${topSlideIn} 0.5s`,
      }}
    >
      <WelcomeHeaderContent>
        <p>Photo By <Link href="https://twitter.com/EyesObsolete"><a>@EyesObsolete</a></Link></p>
        <h3>清涼広場へようこそ</h3>
        <p>Find places where you can truly relax.</p>
      </WelcomeHeaderContent>
    </section>
  )
}
