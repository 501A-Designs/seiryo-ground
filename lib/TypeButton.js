import React,{useState} from 'react'
import StaticGrid from './StaticGrid';

export default function TypeButton(props) {
  const [hover, setHover] = useState(false);

  let background;
  let content;
  if (props.type === 'blue') {
      background = 'linear-gradient(90deg, #8DFCE8 0%, #5FC3FB 100%)';
      content = '海。池。川等'
  }if(props.type === 'green'){
      background = 'linear-gradient(90deg, #ECFC8D 0%, #91FB5F 100%)'
      content = '森。山。公園等'
  }if(props.type === 'red'){
      background = 'linear-gradient(90deg, #FCD68D 0%, #FB7B5F 100%)'
      content = '建物。カフェ等'
  }if(props.type === 'purple'){
      background = 'linear-gradient(90deg, #D88DFC 0%, #755FFB 100%)'
      content = 'その他'
  }
  const typeButton = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    height: '30px',
    background: background,
  }

  return (
    <div
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        border:`1px solid ${props.selectedInput === props.type ? 'black':'#f0f0f0'}`,
        backgroundColor: `${hover ? 'black':'#f0f0f0'}`,
        color: `${hover ? 'white':'black'}`,
        cursor: 'pointer',
        textAlign: 'center',
        padding:'0.25em'
      }}
      onClick={props.onClick}
    >
      <StaticGrid>
        <div style={typeButton}></div>
        <h4 style={{margin:'0.25em 0'}}>{content}</h4>
      </StaticGrid>
    </div>
  )
}
