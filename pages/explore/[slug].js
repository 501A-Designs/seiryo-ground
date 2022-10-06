import React from 'react'
import { useRouter } from 'next/router';
import TDText from '../../lib/TDText';
import AlignItems from '../../lib/alignment/AlignItems';

export default function Explore() {
  const router = useRouter();
  const placeName = router.query.slug;

  return (
    <>
      <div style={{height: '50vh'}}></div>
      <AlignItems
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <TDText
          color="var(--sgGray)"
          sideColor="black"
        >
          {placeName}
        </TDText>
        <h3>Explore The Undiscovered</h3>
      </AlignItems>
      <div style={{height: '200vh'}}></div>
    </>
  )
}
