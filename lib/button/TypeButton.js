
import React from 'react'
import { styled } from '../../stitches.config';
import AlignItems from '../alignment/AlignItems';

const TypeButtonStyled = styled('div', {
  fontFamily: '$sgFont1',
  cursor: 'pointer',
  textAlign: 'center',
  borderRadius:'$r2',
  padding:'0.5em 0.5em 0.5em 0.7em',
  transition:'$speed1',
  minWidth: '200px',
  margin:'0',
  fontWeight:'500',
  variants:{
    selected:{
      true: {
        backgroundColor:'black',
        color: 'white',
        border:'1px solid black',
        'h4':{
          fontWeight:'700'
        }
      },
      false: {
        backgroundColor:'transparent',
        color: 'black',
        border:'1px solid transparent',
        '&:hover':{
          backgroundColor:'$sgGray2',
          border:'1px solid $sgGray3',
          transform: 'scale(1.02)',
        }
      }
    }
  },
})

const TypeButtonColorStyled = styled('div',{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontStyle: 'italic',
  height: '7px',
  borderRadius:'$r2',
  transition:'$speed2',

  variants:{
    selected:{
      true: {
        width: '7px',
        height: '20px',
      },
      false: {
        width: '30px',
      }
    },
    type:{
      blue:{
        background:'$blue'
      },
      green:{
        background:'$green'
      },
      red:{
        background:'$red'
      },
      purple:{
        background:'$purple'
      },
    }
  }
})

export default function TypeButton(props) {
  return (
    <TypeButtonStyled
      selected={props.selectedInput === props.type}
      onClick={props.onClick}
    >
      <AlignItems gap={'1em'}>
        <TypeButtonColorStyled
          selected={props.selectedInput === props.type}
          type={props.type}
        />
        {props.type === 'blue' && '海。池。川等'}
        {props.type === 'green' && '森。山。公園等'}
        {props.type === 'red' && '建物。カフェ等'}
        {props.type === 'purple' && 'その他'}
      </AlignItems>
    </TypeButtonStyled>
  )
}
