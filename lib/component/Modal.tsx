import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { keyframes, styled } from '@stitches/react';
import Button from '../button/Button';
import { FiX } from 'react-icons/fi';
import { topSlideIn } from '../ux/keyframes';
import AlignItems from '../alignment/AlignItems';


const popOutDialog = keyframes({
  '0%': {
    opacity: 0,
		transform: 'translateY(0px) translateX(-50%) scale(0.5)',
  }
});

const StyledOverlay = styled(Dialog.Overlay, {
  background: `linear-gradient($grayA2, $gray1)`,
  cursor: 'pointer',
  backdropFilter: `blur(3px)`,
  position: 'fixed',
  inset: 0,
  zIndex:'100',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${topSlideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const DialogBannerStyled = styled('div',{
  background:'linear-gradient(45deg,$gray2,$gray4)',
  border:'1px solid $gray4',
  color:'$gray12',
  padding:'1em',
  marginBottom:'0.5em',
  borderRadius:'$r2',
  fontSize:'$8',
  'p':{
    margin:0,
    fontSize:'$7',
  }
})

const StyledContent = styled(Dialog.Content, {
  fontFamily:'$sgFont1',
  border: '1px solid $gray4',
  backgroundColor: 'white',
  borderRadius: '$r4',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxHeight: '85vh',
  overflowY:'scroll',
  padding: '$medium',
  boxShadow:'$shadow1',
  zIndex:'200',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${popOutDialog} 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': { outline: 'none' },
  variants:{
    size:{
      large:{
        maxWidth: '800px',
      },
      standard:{
        maxWidth: '450px',
      }
    },
  },
  defaultVariants:{
    size:'standard'
  }
});

function Content({ children, ...props }) {
  return (
    <Dialog.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </Dialog.Portal>
  );
}

const StyledTitle = styled(Dialog.Title, {
  fontSize: 13,
  userSelect:'none',
  textTransform:'uppercase',
  color:'$gray11',
  margin:'5px 5px 10px 5px'
});

const StyledDescription = styled(Dialog.Description, {
  margin: '10px 0 20px',
  color: '$gray12',
  fontSize: 15,
  lineHeight: 1.5,
});

export default function Modal(props){
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {props.trigger}
      </Dialog.Trigger>
      <Content
        size={props.size}
      >
        <AlignItems
          justifyContent={'space-between'}
          margin={'0 0 1em 0'}
        >
          {props.title ? 
            <StyledTitle>
              {props.title}
            </StyledTitle>:
            props.topLeftComponent
          }
          {props.topCenterComponent}
          <Dialog.Close asChild>
            <Button
              size={'small'}
              aria-label="Close"
              icon={<FiX/>}
            />
          </Dialog.Close>
        </AlignItems>
        {props.banner &&
          <DialogBannerStyled>
            {props.banner}
          </DialogBannerStyled>
        }
        {props.description &&
          <StyledDescription>
            {props.description}
          </StyledDescription>
        }
        {props.children}
      </Content>
    </Dialog.Root>
  )
};