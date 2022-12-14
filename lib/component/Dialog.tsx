import React from 'react';
import { keyframes, styled } from '@stitches/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
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

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  background: `radial-gradient(86.36% 107.55% at 6.49% 12.32%,$grayA1 0%, $grayA2 100%)`,
  cursor: 'pointer',
  backdropFilter: `blur(3px)`,
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${topSlideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  fontFamily:'$sgFont1',
  border: '1px solid $gray3',
  backgroundColor: 'white',
  // backgroudFilter:'blur(5px)',
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
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${popOutDialog} 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': { outline: 'none' },
  variants:{
    size:{
      large:{
        maxWidth: '1200px',
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
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
}

const StyledTitle = styled(DialogPrimitive.Title, {
  color: '$gray12',
  margin: '0 0 0 $small',
  fontWeight: 500,
  fontSize: 17,
});

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: '10px 0 20px',
  color: '$gray12',
  fontSize: 15,
  lineHeight: 1.5,
});

export default function Dialog(props){
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        {props.trigger}
      </DialogPrimitive.Trigger>
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
          <DialogPrimitive.Close asChild>
            <Button
              size={'small'}
              aria-label="Close"
              icon={<FiX/>}
            />
          </DialogPrimitive.Close>
        </AlignItems>
        {props.description &&
          <StyledDescription>
            {props.description}
          </StyledDescription>
        }
        {props.children}
      </Content>
    </DialogPrimitive.Root>
  )
};