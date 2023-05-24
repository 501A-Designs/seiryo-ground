import React from 'react'
import { styled } from '../../stitches.config'
import AlignItems from '../alignment/AlignItems'
import Grid from '../alignment/Grid'
import Button from './button/Button'
import { popOutNoBlur } from '../ux/keyframes'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import useLocale from '../util/useLocale'

const FlipThroughMainContainer = styled('div', {
  perspective: '200px',
})
const FlipThroughMain = styled('div', {
  animation: `${popOutNoBlur} 0.4s`,
})

export default function FlipThrough(props) {
  const { t } = useLocale();

  return (
    <Grid gap={'large'}>
      <FlipThroughMainContainer>
        <FlipThroughMain>
          {props.children}
        </FlipThroughMain>
      </FlipThroughMainContainer>
      <AlignItems justifyContent={'spaceBetween'}>
        <Button
          size={'small'}
          icon={<ArrowLeftIcon/>}
          onClick={props.leftClick}
        >
          {t.BUTTON.BACK}
        </Button>
        {props.publish ?
          props.publish:
          <Button
            size={'small'}
            icon={<ArrowRightIcon/>}
            onClick={props.rightClick}
          >
            {t.BUTTON.FORWARD}
          </Button>
        }
      </AlignItems>
    </Grid>
  )
}
