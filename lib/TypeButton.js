import React,{useState} from 'react'
import AlignItems from './AlignItems';

export default function TypeButton(props) {
  const [hover, setHover] = useState(false);

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
  const typeButton = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    height: '5px',
    width: '30px',
    borderRadius:'10px',
    background: background,
    transition:'0.3s'
  }

  return (
    <div
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        backgroundColor: `${props.selectedInput === props.type ? 'black':'transparent'}`,
        color: `${props.selectedInput === props.type ? 'white':'black'}`,
        cursor: 'pointer',
        textAlign: 'center',
        borderRadius:'5px',
        padding:'0.5em'
      }}
      onClick={props.onClick}
    >
      <AlignItems>
        <div style={typeButton}></div>
        <h5 style={{margin:'0'}}>{content}</h5>
      </AlignItems>
    </div>
  )
}
