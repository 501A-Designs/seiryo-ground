import React,{useState} from 'react'
import { useDistortionEffectCarousel } from 'distortion-effect-carousel';
import { swipeSound } from './sound/audio';
import { styled } from '@stitches/react';

export default function DistortionCarousel({displacmentImage,images,speed}) {
  const { ref, prev } = useDistortionEffectCarousel({
    images,
    displacmentImage,
    speed
  });
  // const [coords, setCoords] = useState({x: 0, y: 0});

  // const handleMouseMove = event => {
  //   setCoords({
  //     x: event.clientX - event.target.offsetLeft,
  //     y: event.clientY - event.target.offsetTop,
  //   });
  // };

  // const Arrow  = styled('div', {
  //   backgroundColor: 'black',
  //   width: '100px',
  //   height: '100px',
  //   left: coords.x,
  //   top: coords.y,
  //   position: 'absolute',
  // })
  
  return (
    <div
      // onMouseMove={handleMouseMove}
      style={{
        height: '100vh',
        cursor:'pointer',
        marginBottom:'12vh'
      }}
      ref={ref}
      onClick={()=>{
        prev();
        swipeSound();
      }}
    >
    </div>
  );
};
