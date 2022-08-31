import React from 'react'
import { useDistortionEffectCarousel } from 'distortion-effect-carousel';
import Button from './Button';
import { tapSound } from './sound/audio';

export default function DistortionCarousel({displacmentImage,images,speed}) {
  const { ref, next, prev } = useDistortionEffectCarousel({
    images,
    displacmentImage,
    speed
  });
  
  return (
    <div
      style={{
        height: '80vh',
        cursor:'pointer',
        paddingBottom:'2.5vh'
      }}
      ref={ref}
      onMouseEnter={()=>next()}
      onClick={()=>{
        prev();
        tapSound();
      }}
    />
  );
};
