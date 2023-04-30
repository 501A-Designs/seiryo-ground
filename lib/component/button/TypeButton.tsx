
import React from 'react'
import { styled } from '../../../stitches.config';
import AlignItems from '../../alignment/AlignItems';
import useSound from 'use-sound';

const TypeButtonItem =(props)=> {
  const [select1] = useSound('/sound/select-1-sg.mp3',{playbackRate:1.1});

  return (
    <TypeButtonItemStyled
      selected={props.selectedInput === props.type}
      onMouseDown={()=> props.selectedInput != props.type ? select1():null}
      onClick={props.onClick}
    >
      <AlignItems>
        <TypeButtonItemColorStyled
          selected={props.selectedInput === props.type}
          type={props.type}
        />
        <h4>
          {props.type === 'blue' && '海。池。川等'}
          {props.type === 'green' && '森。山。公園等'}
          {props.type === 'red' && '建物。カフェ等'}
          {props.type === 'purple' && 'その他'}
        </h4>
      </AlignItems>
    </TypeButtonItemStyled>
  )
}

TypeButton.Item = TypeButtonItem;
export default function TypeButton({children}) {
  return(
    <TypeButtonStyled>
      {children}
    </TypeButtonStyled>
  )
}

const TypeButtonStyled = styled('div', {
  display:'grid',
  gap:'0.25em',
  maxWidth: '220px',
  minWidth: '200px',
  width:'100%',
})

const TypeButtonItemStyled = styled('button', {
  fontFamily: '$sgFont1',
  cursor: 'pointer',
  textAlign: 'center',
  borderRadius:'$r2',
  padding:'0.5em 1em',
  transition:'$speed1',
  margin:'0',
  border:'1px solid transparent',
  variants:{
    selected:{
      true: {
        'h4':{
          color: '$gray3',
        },
        background: '$gray12',
        borderColor:'$gray12',
        shadow:'$shadow1',
      },
      false: {
        'h4':{
          color: '$gray10',
        },
        backgroundColor:'transparent',
        '&:hover':{
          backgroundColor:'$gray4',
          borderColor:'$gray5',
          'h4':{
            color: '$gray11',
          }
        }
      }
    }
  },
  'h4':{
    margin:0,
  }
})

const TypeButtonItemColorStyled = styled('div',{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontStyle: 'italic',
  borderRadius:'$r2',
  transition:'$speed2',

  variants:{
    selected:{
      true: {
        width: '10px',
        height: '10px',
      },
      false: {
        width: '30px',
        height: '6px',
      }
    },
    type:{
      blue:{
        background:'$sgBlue'
      },
      green:{
        background:'$sgGreen'
      },
      red:{
        background:'$sgRed'
      },
      purple:{
        background:'$sgPurple'
      },
    }
  }
})