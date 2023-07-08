// const AccordionRootStyled = styled(Accordion.Root, {
//   borderRadius: "$r2",
// });

// const AccordionItemStyled = styled(Accordion.Item, {
//   cursor: "pointer",
//   overflow: "hidden",
//   marginTop: 2,
//   border: "1px solid $gray4",

//   "&:first-child": {
//     marginTop: 0,
//     borderTopLeftRadius: "$r2",
//     borderTopRightRadius: "$r2",
//   },

//   "&:last-child": {
//     borderBottomLeftRadius: "$r2",
//     borderBottomRightRadius: "$r2",
//   },

//   "&:focus-within": {
//     position: "relative",
//     zIndex: 1,
//   },
// });

// const AccordionHeaderStyled = styled(Accordion.Header, {
//   all: "unset",
//   display: "flex",
// });

// const AccordionTriggerStyled = styled(Accordion.Trigger, {
//   cursor: "pointer",
//   all: "unset",
//   fontFamily: "inherit",
//   padding: "0 20px",
//   height: 45,
//   flex: 1,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   fontSize: "$8",
//   lineHeight: 1,
//   color: "$gray11",

//   // boxShadow: `$shadow1`,
//   backgroundColor: "$gray3",
//   transition: "$speed1",
//   "&:hover": {
//     backgroundColor: "$gray4",
//   },
// });

// const AccordionTrigger = forwardRef(
//   ({ children, ...props }: any, forwardedRef: any) => (
//     <AccordionHeaderStyled>
//       <AccordionTriggerStyled {...props} ref={forwardedRef}>
//         {children}
//       </AccordionTriggerStyled>
//     </AccordionHeaderStyled>
//   )
// );
// AccordionTrigger.displayName = "AccordionTrigger";

// const slideDown = keyframes({
//   from: { height: 0 },
//   to: { height: "var(--radix-accordion-content-height)" },
// });

// const slideUp = keyframes({
//   from: { height: "var(--radix-accordion-content-height)" },
//   to: { height: 0 },
// });

// const AccordionContentStyled = styled(Accordion.Content, {
//   overflow: "hidden",
//   fontSize: 15,
//   color: "$gray12",
//   backgroundColor: "$gray1",
//   '&[data-state="open"]': {
//     animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
//   },
//   '&[data-state="closed"]': {
//     animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
//   },
// });

// const AccordionContentTextStyled = styled("div", {
//   padding: "$medium",
// });

// const AccordionContent = forwardRef(
//   ({ children, ...props }: any, forwardedRef) => (
//     <AccordionContentStyled {...props} ref={forwardedRef}>
//       <AccordionContentTextStyled>{children}</AccordionContentTextStyled>
//     </AccordionContentStyled>
//   )
// );
// AccordionContent.displayName = "AccordionContent";

// function AccordionItem(props) {
//   return (
//     <AccordionItemStyled value={`item-${props.number}`}>
//       <AccordionTrigger>{props.name}</AccordionTrigger>
//       <AccordionContent>{props.children}</AccordionContent>
//     </AccordionItemStyled>
//   );
// }

// RadixAccordion.Item = AccordionItem;
// export default function RadixAccordion(props) {
//   return (
//     <AccordionRootStyled type="single" defaultValue="item-1" collapsible>
//       {props.children}
//     </AccordionRootStyled>
//   );
// }

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const AccordionItem = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <Accordion.Item
      className={`focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]`}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  )
);

const AccordionTrigger = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={`text-violet11 shadow-mauve6 hover:bg-mauve2 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none`}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon
          className="text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

const AccordionContent = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <Accordion.Content
      className={`text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]`}
      {...props}
      ref={forwardedRef}
    >
      <div className="py-[15px] px-5">{children}</div>
    </Accordion.Content>
  )
);

const AccordionDemo = () => (
  <Accordion.Root
    className="bg-mauve6 w-[300px] rounded-md shadow-[0_2px_10px] shadow-black/5"
    type="single"
    defaultValue="item-1"
    collapsible
  >
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-2">
      <AccordionTrigger>Is it unstyled?</AccordionTrigger>
      <AccordionContent>
        Yes. It's unstyled by default, giving you freedom over the look and
        feel.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-3">
      <AccordionTrigger>Can it be animated?</AccordionTrigger>
      <AccordionContent>
        Yes! You can animate the Accordion with CSS or JavaScript.
      </AccordionContent>
    </AccordionItem>
  </Accordion.Root>
);

export default AccordionDemo;
