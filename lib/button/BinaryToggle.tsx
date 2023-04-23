import React from 'react'
import { styled } from '../../stitches.config'
import { spin } from '../ux/keyframes'
import useSound from 'use-sound'
import { VariantProps } from '@stitches/react';

interface BinaryToggleItemProps extends
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof BinaryToggleItemStyled>{
    inputValue:boolean
}

interface BinaryToggleProps{
  state:VariantProps<typeof BinaryToggleItemStyled>["state"],
  onClick:React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"],
}

const BinaryToggleItem = (toggleItemProps:BinaryToggleItemProps)=> {
  const [select1] = useSound('/sound/select-1-sg.mp3',{playbackRate:1.1});
  const [select2] = useSound('/sound/select-2-sg.mp3',{playbackRate:1.1});

  return(
    <BinaryToggleItemStyled
      state={toggleItemProps.state}
      onMouseDown={()=>{
        toggleItemProps.inputValue ? 
        !toggleItemProps.state && select1():
        !toggleItemProps.state && select2()
      }}
      {...toggleItemProps}
    >
      <h4>{toggleItemProps.inputValue ? '有':'無'}</h4>
    </BinaryToggleItemStyled>
  )
};

export default function BinaryToggle(props:BinaryToggleProps) {
  return (
    <BinaryToggleStyled>
      <BinaryToggleItem
        state={props.state}
        onClick={!props.state ? props.onClick:null}
        inputValue={true}
      />
      <BinaryToggleItem
        state={!props.state}
        onClick={props.state ? props.onClick:null}
        inputValue={false}
      />
    </BinaryToggleStyled>
  )
}


const BinaryToggleItemStyled = styled('button',{
  backgroundColor: 'black',
  borderRadius: '$round',
  display:'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: '1px solid transparent',
  transition:'ease $speed1',
  variants:{
    state:{
      true:{
        'h4':{
          color: '$gray1',
        },
        backgroundColor:'$gray12',
        userSelect:'none',
        borderColor:'$gray5',
        boxShadow: '$shadow1',
        width: '95px',
        height: '95px',
        fontWeight: '500',
        animation: `${spin} 0.5s`
      },
      false:{
        'h4':{
          color: '$gray10',
        },
        backgroundColor:'transparent',
        width: '50px',
        height: '50px',
        '&:hover':{
          color: '$gray11',
          backgroundColor: '$gray4',
          borderColor:'$gray5',
        }
      }
    }
  }
})

const BinaryToggleStyled = styled('div',{
  borderRadius: '$r2',
  padding: '$small',
  display:'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$small',
  width: '100%',
  height: '100%',
  minHeight: '103px',
})