import React from 'react'
import { styled } from '../../stitches.config'
import AlignItems from '../alignment/AlignItems'
import { CheckCircledIcon, CircleIcon } from '@radix-ui/react-icons'
import useSound from 'use-sound'


const CheckBoxItem =(props)=> {
  const [tap1] = useSound('/sound/tap-1-sg.mp3',{playbackRate:1.1});

  return (
    <CheckBoxItemStyled
      checked={props.checked}
      onMouseDown={()=>tap1()}
      onClick={props.onClick}
    >
      <AlignItems>
        {props.checked ? <CheckCircledIcon/>:<CircleIcon/>}
        <h5>
          {props.name}
        </h5>
      </AlignItems>
    </CheckBoxItemStyled>
  )
}

CheckBox.Item = CheckBoxItem;
export default function CheckBox({children}){
  return(
    <CheckBoxStyled>
      {children}
    </CheckBoxStyled> 
  )
}


const CheckBoxStyled = styled('div', {
  display:'grid',
  gap:'0.25em',
  maxWidth: '220px',
  minWidth: '200px',
  width:'100%',
})

const CheckBoxItemStyled = styled('button',{
  cursor: 'pointer',
  userSelect:'none',
  backgroundColor: 'black',
  borderRadius: '$r2',
  padding: '$small',
  minWidth: '200px',
  border: '1px solid transparent',
  transition: '$speed1',
  variants:{
    checked: {
      true: {
        backgroundColor: '$gray12',
        color: '$gray1',
        'h5':{
          color:'$gray3'
        }
      },
      false: {
        backgroundColor: 'transparent',
        color: '$gray10',
        'h5':{
          color: '$gray10',
        },
        '&:hover': {
          backgroundColor:'$gray4',
          border:'1px solid $gray5',
          color: '$gray11',
        }
      }
    }
  },
  'h5':{
    margin:0
  }
})