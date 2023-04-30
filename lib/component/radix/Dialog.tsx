import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { keyframes, styled } from '@stitches/react';
import Button from '../button/Button';
import { topSlideIn } from '../../ux/keyframes';
import AlignItems from '../../alignment/AlignItems';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';


// const transitions = useTransition(open, {
//   from: { opacity: 0, y: -10 },
//   enter: { opacity: 1, y: 0 },
//   leave: { opacity: 0, y: 10 },
//   config: config.stiff,
// });

function Content({ children, ...props }) {
  return (
    <Dialog.Portal>
      <StyledOverlay />
      <StyledContent
        {...props}
        openState={props.openState}
      >{children}</StyledContent>
    </Dialog.Portal>
  );
}

export default function RadixDialog(props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
    >
      <Dialog.Trigger asChild>
        {props.trigger}
      </Dialog.Trigger>
      <Content
        openState={open}
        size={props.size}
      >
        {/* margin={'0 0 1em 0'} */}
        <AlignItems
          justifyContent={'spaceBetween'}
        >
          {props.title ?
            <StyledTitle>
              {props.title}
            </StyledTitle> :
            props.topLeftComponent
          }
          <Dialog.Close asChild>
            {props.saveClose ?
              props.saveClose :
              <Button
                backTapSound
                size={'small'}
                aria-label="Close"
                icon={<Cross1Icon />}
              />
            }
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


const popInDialog = keyframes({
  '0%': {
    opacity: 0.9,
    filter: 'blur(5px)',
    transform: 'translateY(0px) translateX(-50%) scale(0.5)',
  },
  '50%': {
    transform: 'translateY(-50%) translateX(-50%) scale(1.04)',
  }
});

const popOutDialog = keyframes({
  '20%': {
    transform: 'translateY(-50%) translateX(-50%) scale(1.04)',
  },
  '100%': {
    opacity: 0,
    filter: 'blur(5px)',
    transform: 'translateY(50%) translateX(-50%) scale(0)',
  },
});

const StyledOverlay = styled(Dialog.Overlay, {
  cursor: 'pointer',
  background: `linear-gradient($grayA2, $gray1)`,
  backdropFilter: `blur(3px)`,
  position: 'fixed',
  inset: 0,
  zIndex: '100',
  // variants:{
  //   openState:{
  //     true:{
  //     }
  //   }
  // }
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${topSlideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const DialogBannerStyled = styled('div', {
  background: 'linear-gradient(45deg,$gray2,$gray4)',
  border: '1px solid $gray4',
  color: '$gray12',
  padding: '1em',
  marginBottom: '0.5em',
  borderRadius: '$r2',
  fontSize: '$8',
  'p': {
    margin: 0,
    fontSize: '$7',
  }
})

const StyledContent = styled(Dialog.Content, {
  border: '1px solid $gray4',
  backgroundColor: '$gray1',
  borderRadius: '$r4',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxHeight: '85vh',
  overflowY: 'scroll',
  padding: '$medium',
  boxShadow: '$shadow1',
  zIndex: '200',
  // '@media (prefers-reduced-motion: no-preference)': {
  //   animation: `${popOutDialog} 500ms`,
  // },
  '&:focus': { outline: 'none' },
  variants: {
    size: {
      large: {
        maxWidth: '800px',
      },
      medium: {
        maxWidth: '600px',
      },
      small: {
        maxWidth: '400px',
      }
    },
    openState: {
      true: {
        animation: `${popInDialog} 500ms`,
      },
      false: {
        animation: `${popOutDialog} 500ms`,
      }
    }
  },
  defaultVariants: {
    size: 'small'
  }
});

const StyledTitle = styled(Dialog.Title, {
  fontSize: 13,
  userSelect: 'none',
  textTransform: 'uppercase',
  color: '$gray11',
  margin: '5px 5px 10px 5px'
});

const StyledDescription = styled(Dialog.Description, {
  margin: '10px 0 20px',
  color: '$gray12',
  fontSize: 15,
  lineHeight: 1.5,
});
