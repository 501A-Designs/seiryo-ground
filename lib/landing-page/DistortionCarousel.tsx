import React from 'react'
import { useDistortionEffectCarousel } from 'distortion-effect-carousel';
import { bottomSlideIn } from '../ux/keyframes';
import useSound from 'use-sound';

export default function DistortionCarousel({
    images,
    displacmentImage,
    speed
  }) {
  
  const { ref, prev } = useDistortionEffectCarousel({
    images,
    displacmentImage,
    speed
  });

  const [tap2] = useSound('/sound/tap-2-sg.mp3');
  
  return (
    <div
      style={{
        height: '100vh',
        cursor:'pointer',
        marginBottom:'12vh',
        animation: `${bottomSlideIn} ease 1s`
      }}
      ref={ref}
      onClick={()=>{
        tap2();
        prev();
      }}
    />
  );
};
