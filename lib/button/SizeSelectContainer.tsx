import React from 'react'
import { styled } from '../../stitches.config'
import Grid from '../alignment/Grid'
import Container from '../component/Container'

const SizeSelectStyled = styled('div',{
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'fit-content',
  border: '1px solid transparent',
  borderRadius: '$r2',
  padding: '$medium',
  fontSize: '$7',
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

export function SizeSelect(props) {
  return (
    <SizeSelectStyled
      name={props.name}
      key={props.key}
      selected={props.name === props.currentState}
      onClick={props.onClick}
    >
      {props.name === 'small' && '小'}
      {props.name === 'medium' && '中'}
      {props.name === 'large' && '大'}
    </SizeSelectStyled>
  )
}

const SizeSelectContainerStyled = styled('section',{
  display: 'flex',
  gap:'$extraSmall',
})

export default function SizeSelectContainer(props) {
  return (
    <Grid gap={'extraSmall'}>
      <SizeSelectContainerStyled>
        {props.children}
      </SizeSelectContainerStyled>
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