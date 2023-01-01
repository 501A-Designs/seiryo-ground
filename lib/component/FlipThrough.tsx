import React from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { styled } from '../../stitches.config'
import AlignItems from '../alignment/AlignItems'
import Grid from '../alignment/Grid'
import Button from '../button/Button'
import { popOut } from '../ux/keyframes'

const FlipThroughMainContainer = styled('div', {
  perspective: '200px',
})
const FlipThroughMain = styled('div', {
  animation: `${popOut} 0.8s`,
})

export default function FlipThrough(props) {
  return (
    <Grid gap={'large'}>
      <FlipThroughMainContainer>
        <FlipThroughMain>
          {props.children}
        </FlipThroughMain>
      </FlipThroughMainContainer>
      <AlignItems
        justifyContent={'space-between'}
      >
        <Button
          size={'small'}
          icon={<FiArrowLeft/>}
          onClick={props.leftClick}
        >
          戻る
        </Button>
        {props.publish ?
          props.publish:
          <Button
            size={'small'}
            icon={<FiArrowRight/>}
            onClick={props.rightClick}
          >
            次へ
          </Button>
        }
      </AlignItems>
    </Grid>
  )
}
