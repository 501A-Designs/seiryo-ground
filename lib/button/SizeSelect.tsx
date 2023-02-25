import React from 'react'
import { styled } from '../../stitches.config'
import Grid from '../alignment/Grid'
import Container from '../component/Container'
import useSound from 'use-sound'
import AlignItems from '../alignment/AlignItems'
import { popOutNoBlur } from '../ux/keyframes'

const SizeSelectItemStyled = styled('div',{
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  maxHeight: '20px',
  border: '1px solid transparent',
  borderRadius: '$r2',
  padding: '$small',
  fontSize: '$8',
  transition: '$speed1',
  variants: {
    selected: {
      true: {
        'h4':{
          color: '$gray1',
        },
        background: '$gray12',
        borderColor:'$gray12',
        width: '68%',
        fontWeight:'500',
        boxShadow:'$shadow1',
      },
      false: {
        'h4':{
          color: '$gray10',
        },
        width: '16%',
        '&:hover':{
          color: '$gray11',
          backgroundColor:'$gray4',
          border:'1px solid $gray5',
        }
      },
    },
  },
})

const SizeSelectItem = (props)=> {
  const [select1] = useSound('/sound/select-1-sg.mp3',{playbackRate:1.1});

  return (
    <SizeSelectItemStyled
      key={props.key}
      selected={props.name == props.state}
      onMouseDown={()=> props.name != props.state ? select1():null}
      onClick={props.onClick}
    >
      <h4>
        {props.name === 'small' && '小'}
        {props.name === 'medium' && '中'}
        {props.name === 'large' && '大'}
      </h4>
    </SizeSelectItemStyled>
  )
}

const SizeSelectContainerStyled = styled('section',{
  display: 'flex',
  gap:'$extraSmall',
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'space-between',
  height:'100%'
  // maxWidth:'300px'
})

const SizeSelectStyled = styled('section',{
  display: 'flex',
  gap:'$extraSmall',
  maxWidth:'250px',
  width:'100%'
})

const SizeSelectLabelStyled = styled('section',{
  'h3':{
    animation:`${popOutNoBlur} 0.2s`,
    margin:'1em 0 0 0'
  },
  'p':{
    animation:`${popOutNoBlur} 0.3s`,
    margin:'0 0 1.3em 0'
  }
})

SizeSelect.Item = SizeSelectItem;
export default function SizeSelect(props) {
  return (
    <SizeSelectContainerStyled>
      <SizeSelectLabelStyled>
        <AlignItems
          justifyContent={'center'}
          flexDirection={'column'}
        >
          {!props.hide &&
            <>
              {props.state === 'small' &&
                <>
                  <h3>~20m</h3>
                  <p>
                    小さい公園・カフェ
                  </p>
                </>
              }
              {props.state === 'medium' &&
                <>
                  <h3>20~100m</h3>
                  <p>大きめな公園・建物</p>
                </>
              }
              {props.state === 'large' &&
                <>
                  <h3>100m~</h3>
                  <p>
                    島・海・大きい建物
                  </p>
                </>
              }
            </>
          }
        </AlignItems>
      </SizeSelectLabelStyled>
      <SizeSelectStyled css={props.css}>
        {props.children}
      </SizeSelectStyled>
    </SizeSelectContainerStyled>
  )
}