import React from 'react'
import { styled } from '../../stitches.config'
import Grid from '../alignment/Grid'
import Container from '../component/Container'

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
        fontWeight:'bold',
        boxShadow:'$shadow1',
      },
      false: {
        color: '$gray10',
        width: '33%',
        '&:hover':{
          border: '1px solid $gray4',
          color: '$gray11',
          backgroundColor: '$gray4',
        }
      },
    },
  },
})

const SizeSelectItem = (props)=> {
  return (
    <SizeSelectItemStyled
      key={props.key}
      selected={props.name === props.currentState}
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
})

SizeSelect.Item = SizeSelectItem;
export default function SizeSelect(props) {
  return (
    <Grid gap={'extraSmall'}>
      <SizeSelectStyled>
        {props.children}
      </SizeSelectStyled>
      {!props.hide &&
        <Grid>
          <Container type="standard" height={'fullHeight'}>
            <Grid>
              {props.currentState === 'small' &&
                <>
                  <h4>~20m</h4>
                  <ul>
                    <li>小さい公園</li>
                    <li>カフェ</li>
                  </ul>
                </>
              }
              {props.currentState === 'medium' &&
                <>
                  <h4>20~100m</h4>
                  <ul>
                    <li>大きめな公園</li>
                    <li>建物</li>
                  </ul>
                </>
              }
              {props.currentState === 'large' &&
                <>
                  <h4>100m~</h4>
                  <ul>
                    <li>島・海</li>
                    <li>大きい建物</li>
                  </ul>
                </>
              }
            </Grid>
          </Container>
        </Grid>
      }
    </Grid>
  )
}