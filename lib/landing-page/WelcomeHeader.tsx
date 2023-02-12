import Link from 'next/link'
import React from 'react'
import { styled } from '../../stitches.config'
import { topSlideIn } from '../ux/keyframes'

const WelcomeHeaderStyled = styled('section', {
  right:'0',
  color:'black',
  textAlign:'right',
  marginTop:'2em',
  'h1':{
    fontSize:'1.5em',
    margin: '0',
    textShadow:'$shadow1',
    color:'$gray12'
  },
  'p':{
    margin:0,
    color:'$gray11'
  }
})

export default function WelcomeHeader() {
  return (
    <WelcomeHeaderStyled>
      <h1>
        SEIRYO GROUND | 清涼広場
      </h1>
      <p>Find places where you can truly relax.</p>
      <p>Produced By <Link href="https://twitter.com/501A_Designs">@501A_Designs</Link></p>
      <p>Photos By <Link href="https://twitter.com/EyesObsolete">@EyesObsolete</Link></p>
    </WelcomeHeaderStyled>
  );
}
