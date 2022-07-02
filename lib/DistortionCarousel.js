import React from 'react'
import { useDistortionEffectCarousel } from 'distortion-effect-carousel';
import Button from './Button';

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
        margin:0,
      }}
      ref={ref}
      onClick={()=>next()}
    />
  );
};
