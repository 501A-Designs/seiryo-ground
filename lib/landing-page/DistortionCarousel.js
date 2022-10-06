import React from 'react'
import { useDistortionEffectCarousel } from 'distortion-effect-carousel';
import { swipeSound } from '../../lib/ux/audio';
import { bottomSlideIn } from '../ux/keyframes';

export default function DistortionCarousel({
    displacmentImage,
    images,
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
        cursor:'pointer',
        marginBottom:'12vh',
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
