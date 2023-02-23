import React from 'react'
import { styled } from '../../stitches.config'
import { spin } from '../ux/keyframes'
import useSound from 'use-sound'

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
    selected:{
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
        // background:'$gray3',
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

const BinaryToggleItem = (toggleItemProps:any)=> {
  const [select1] = useSound('/sound/select-1-sg.mp3',{playbackRate:1.1});
  const [select2] = useSound('/sound/select-2-sg.mp3',{playbackRate:1.1});

  return(
    <BinaryToggleItemStyled
      selected={toggleItemProps.selected}
      onMouseDown={()=>{
        toggleItemProps.inputValue ? 
        !toggleItemProps.selected && select1():
        !toggleItemProps.selected && select2()
      }}
      onClick={toggleItemProps.onClick}
    >
      <h4>
        {
          toggleItemProps.inputValue ? 
          '有':
          '無'
        }
      </h4>
    </BinaryToggleItemStyled>
  )
};

// BinaryToggle.Item = BinaryToggleItem;
export default function BinaryToggle(props) {
  return (
    <BinaryToggleStyled>
      <BinaryToggleItem
        selected={props.state}
        onClick={!props.state ? props.onClick:null}
        inputValue={true}
      />
      <BinaryToggleItem
        selected={!props.state}
        onClick={props.state ? props.onClick:null}
        inputValue={false}
      />
    </BinaryToggleStyled>
  )
}
