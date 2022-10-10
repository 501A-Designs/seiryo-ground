import React from 'react'
import { useDistortionEffectCarousel } from 'distortion-effect-carousel';
import { swipeSound } from '../../lib/ux/audio';
import { bottomSlideIn } from '../ux/keyframes';

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
  
  return (
    <div
      style={{
        height: '100vh',
        // width: '100%',
        cursor:'pointer',
        marginBottom:'12vh',
        // border: '1px solid var(--sgGray)',
        // borderRadius: '16px',
        animation: `${bottomSlideIn} ease 1s`
      }}
      ref={ref}
      onClick={()=>{
        prev();
        swipeSound();
      }}
    />
  );
};
