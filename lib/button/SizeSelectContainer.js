import React from 'react'
import { styled } from '../../stitches.config'
import Grid from '../alignment/Grid'
import Container from '../component/Container'

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
                  <h4>約20m未満の場所</h4>
                  <ul>
                    <li>小さい公園</li>
                    <li>カフェ</li>
                  </ul>
                </>
              }
              {props.currentState === 'medium' &&
                <>
                  <h4>約20m以上100m未満の場所</h4>
                  <ul>
                    <li>大きめな公園</li>
                    <li>建物</li>
                  </ul>
                </>
              }
              {props.currentState === 'large' &&
                <>
                  <h4>約100m以上の場所</h4>
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