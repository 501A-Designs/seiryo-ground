import React from 'react'
import { styled } from '../stitches.config';


const PhotoContainerStyled = styled('div', {
  objectFit:'cover',
  width:'90%',
  transition: '$speed1',
  cursor:'pointer',
  border: '1px solid $sgGray1',
  borderRadius: '$r3',
})

const GradientCoverStyled = styled('div', {
    WebkitBackdropFilter: 'blur(16px)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(228, 228, 228, 0.3)',
    color: 'white',
    borderRadius: '$r3',
    height: '100%',
    width: '100%',
    padding:'$large $medium',
    transition: '$speed1',
})

export default function ThisMonthPlace(props) {

  let background = 'white';
  if (props.type === 'blue') {
    background = 'linear-gradient(90deg, #00FFD1 0%, #5FC3FB 100%)';
  }if(props.type === 'green'){
    background = 'linear-gradient(90deg, #C3F304 0%, #50F403 100%)'
  }if(props.type === 'red'){
    background = 'linear-gradient(90deg, #FFB422 0%, #FB7B5F 100%)'
  }if(props.type === 'purple'){
    background = 'linear-gradient(90deg, #BA49FF 0%, #6E56FF 100%)'
  }


  return (
    <PhotoContainerStyled
      style={{
        background: "url('/open-nakameguro.jpg')",
        backgroundPosition: "center"
      }}
    >
      <GradientCoverStyled
        onClick={props.onClick}
      >
        <h3>{props.prefecture}にある</h3>
        <h1>
          {props.name}
        </h1>
        <p>{props.description}</p>
      </GradientCoverStyled>
    </PhotoContainerStyled>
  )
}
