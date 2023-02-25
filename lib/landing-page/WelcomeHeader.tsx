import Link from 'next/link'
import React from 'react'
import { styled } from '../../stitches.config'
import { useRouter } from 'next/router';

const WelcomeHeaderStyled = styled('section', {
  marginTop:'2em',
  textAlign:'right',
  'h1':{
    cursor:'pointer',
    margin: '0 0 0.25em 0',
    textShadow:'$shadow1',
    color:'$gray12'
  },
  'p':{
    margin:0,
    color:'$gray11'
  }
})

export default function WelcomeHeader() {
  const router = useRouter();
  return (
    <WelcomeHeaderStyled>
      <h1 onClick={()=>router.push('/about')}>SEIRYO GROUND</h1>
      <p>Produced By <Link href="https://twitter.com/501A_Designs">@501A_Designs</Link></p>
      <p>Photos By <Link href="https://twitter.com/EyesObsolete">@EyesObsolete</Link></p>
    </WelcomeHeaderStyled>
  );
}
