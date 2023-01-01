import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { styled } from '../../stitches.config';
import { FiChevronDown } from 'react-icons/fi';
import { keyframes } from '@stitches/react';

const DropdownRootStyled = styled(Accordion.Root, {
  borderRadius: '$r3',
});

const DropdownItemStyled = styled(Accordion.Item, {
  overflow: 'hidden',
  marginTop: 1,
  border:'1px solid $gray4',

  '&:first-child': {
    marginTop: 0,
    borderTopLeftRadius: '$r3',
    borderTopRightRadius: '$r3',
  },

  '&:last-child': {
    borderBottomLeftRadius: '$r3',
    borderBottomRightRadius: '$r3',
  },

  '&:focus-within': {
    position: 'relative',
    zIndex: 1,
  },
});

const AccordionHeaderStyled = styled(Accordion.Header, {
  all: 'unset',
  display: 'flex',
});

const AccordionTriggerStyled = styled(Accordion.Trigger, {
  cursor:'pointer',
  all: 'unset',
  fontFamily: 'inherit',
  padding: '0 20px',
  height: 45,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 15,
  lineHeight: 1,
  color: '$gray12',
  // boxShadow: `$shadow1`,
  backgroundColor:'$gray3',
  // '&:hover': {
  //   backgroundColor: '$gray12'
  // },
});

const ChevronStyled = styled(FiChevronDown, {
  color: '$gray11',
  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  '[data-state=open] &': { transform: 'rotate(180deg)' },
});

const DropdownTrigger = React.forwardRef(
  ({ children, ...props }:any, forwardedRef:any) => (
  <AccordionHeaderStyled>
    <AccordionTriggerStyled
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronStyled aria-hidden />
    </AccordionTriggerStyled>
  </AccordionHeaderStyled>
));


const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
});

const AccordionContentStyled = styled(Accordion.Content, {
  overflow: 'hidden',
  fontSize: 15,
  color: '$gray12',
  backgroundColor: 'white',
  '&[data-state="open"]': {
    animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
});


const AccordionContentTextStyled = styled('div', {
  padding: '$medium',
});

const DropdownContent = React.forwardRef(({ children, ...props }:any, forwardedRef) => (
  <AccordionContentStyled {...props} ref={forwardedRef}>
    <AccordionContentTextStyled>{children}</AccordionContentTextStyled>
  </AccordionContentStyled>
));

export function DropdownItem(props) {
  return(
    <DropdownItemStyled value={`item-${props.number}`}>
      <DropdownTrigger>
        {props.name}
      </DropdownTrigger>
      <DropdownContent>
        {props.children}
      </DropdownContent>
    </DropdownItemStyled>
  )
}

Dropdown.Item = DropdownItem;
export default function Dropdown(props){
  return(
    <DropdownRootStyled
      type="single"
      defaultValue="item-1"
      collapsible
    >
      {props.children}
    </DropdownRootStyled>
  )
};