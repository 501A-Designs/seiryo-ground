import React from 'react'
import { styled } from '../../stitches.config'
import Grid from '../alignment/Grid'
import Container from '../component/Container'
import useSound from 'use-sound'
import AlignItems from '../alignment/AlignItems'

const SizeSelectItemStyled = styled('div',{
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'fit-content',
  border: '1px solid transparent',
  borderRadius: '$r2',
  padding: '$small',
  fontSize: '$8',
  transition: '$speed1',
  variants: {
    selected: {
      true: {
        color: '$gray1',
        background: '$gray12',
        borderColor:'$gray12',
        width: '66%',
        fontWeight:'500',
        boxShadow:'$shadow1',
      },
      false: {
        color: '$gray10',
        width: '33%',
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
      {props.name === 'small' && '小'}
      {props.name === 'medium' && '中'}
      {props.name === 'large' && '大'}
    </SizeSelectItemStyled>
  )
}

const SizeSelectStyled = styled('section',{
  display: 'flex',
  gap:'$extraSmall',
  maxWidth:'300px'
})

SizeSelect.Item = SizeSelectItem;
export default function SizeSelect(props) {
  return (
    <Grid>
      <AlignItems
        justifyContent={'center'}
        flexDirection={'column'}
      >
        {!props.hide &&
          <>
            {props.state === 'small' &&
              <>
                <h4>~20m</h4>
                <p>
                  小さい公園・カフェ
                </p>
              </>
            }
            {props.state === 'medium' &&
              <>
                <h4>20~100m</h4>
                <p>大きめな公園・建物</p>
              </>
            }
            {props.state === 'large' &&
              <>
                <h4>100m~</h4>
                <p>
                  島・海・大きい建物
                </p>
              </>
            }
          </>
        }
      </AlignItems>
      <SizeSelectStyled css={props.css}>
        {props.children}
      </SizeSelectStyled>
    </Grid>
  )
}