import { styled } from '@stitches/react';
import React from 'react'
import AlignItems from './AlignItems';

export default function TypeButton(props) {
  // const [hover, setHover] = useState(false);

  let background;
  let content;
  if (props.type === 'blue') {
    background = 'linear-gradient(90deg, #00FFD1 0%, #5FC3FB 100%)';
    content = '海。池。川等'
  }if(props.type === 'green'){
    background = 'linear-gradient(90deg, #C3F304 0%, #50F403 100%)'
    content = '森。山。公園等'
  }if(props.type === 'red'){
    background = 'linear-gradient(90deg, #FFB422 0%, #FB7B5F 100%)'
    content = '建物。カフェ等'
  }if(props.type === 'purple'){
    background = 'linear-gradient(90deg, #BA49FF 0%, #6E56FF 100%)'
    content = 'その他'
  }

  const TypeButton = styled('div', {
    backgroundColor: `${props.selectedInput === props.type ? 'black':'transparent'}`,
    color: `${props.selectedInput === props.type ? 'white':'black'}`,
    cursor: 'pointer',
    textAlign: 'center',
    borderRadius:'10px',
    padding:'0.5em 0.5em 0.5em 0.7em',
    'h5':{
      margin:'0'
    }
  })

  const TypeColor = styled('div',{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    height: '5px',
    width: '30px',
    borderRadius:'10px',
    background: background,
    transition:'0.3s',
  })

  return (
    <TypeButton
      key={props.key}
      onClick={props.onClick}
    >
      <AlignItems>
        <TypeColor/>
        <h5>{content}</h5>
      </AlignItems>
    </TypeButton>
  )
}
