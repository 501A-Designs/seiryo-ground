
import React from 'react'
import { styled } from '../../stitches.config';
import AlignItems from '../alignment/AlignItems';

export default function TypeButton(props) {
  return (
    <TypeButtonStyled
      selected={props.selectedInput === props.type}
      onClick={props.onClick}
    >
      <AlignItems gap={'0.7em'}>
        <TypeButtonColorStyled
          selected={props.selectedInput === props.type}
          type={props.type}
        />
        <h5>
          {props.type === 'blue' && '海。池。川等'}
          {props.type === 'green' && '森。山。公園等'}
          {props.type === 'red' && '建物。カフェ等'}
          {props.type === 'purple' && 'その他'}
        </h5>
      </AlignItems>
    </TypeButtonStyled>
  )
}

const TypeButtonStyled = styled('div', {
  fontFamily: '$sgFont1',
  cursor: 'pointer',
  textAlign: 'center',
  borderRadius:'$r2',
  padding:'0.5em 0.5em 0.5em 0.7em',
  transition:'$speed1',
  minWidth: '200px',
  margin:'0',
  border:'1px solid transparent',
  variants:{
    selected:{
      true: {
        background: '$gray12',
        borderColor:'$gray6',
        shadow:'$shadow1',
        'h5':{
          color: '$gray3',
        }
      },
      false: {
        backgroundColor:'transparent',
        'h5':{
          color: '$gray10',
        },
        '&:hover':{
          backgroundColor:'$gray4',
          borderColor:'$gray5',
          'h5':{
            color: '$gray11',
          }
        }
      }
    }
  },
  'h5':{
    margin:0,
  }
})

const TypeButtonColorStyled = styled('div',{
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