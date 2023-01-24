import React, { forwardRef } from "react";
import * as Select from "@radix-ui/react-select";
import { styled } from "../../stitches.config";
import { FiCheck, FiChevronDown, FiChevronUp } from "react-icons/fi";

export const Selector = (props) => (
  <Select.Root
    value={props.value}
    onValueChange={props.onValueChange}
  >
    <SelectTrigger aria-label="Course">
      <Select.Value
        placeholder={props.placeholder}
        // value={props.value}
      />
      <SelectIcon>
        <FiChevronDown />
      </SelectIcon>
    </SelectTrigger>
    <Select.Portal>
      <SelectContent>
        <SelectScrollUpButton>
          <FiChevronUp />
        </SelectScrollUpButton>
        <SelectViewport>
          {props.children}
        </SelectViewport>
        <SelectScrollDownButton>
          <FiChevronDown />
        </SelectScrollDownButton>
      </SelectContent>
    </Select.Portal>
  </Select.Root>
);

const SelectTrigger = styled(Select.SelectTrigger, {
  all: "unset",
  outline:"none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "$r2",
  padding: "0 15px",
  fontSize: 13,
  lineHeight: 1,
  minHeight: 35,
  gap: 5,
  backgroundColor: "$gray2",
  color: "$gray12",
  border:"1px solid $gray4",
  "&:hover": {
    backgroundColor: "$gray4",
  },
  "&[data-placeholder]": { color: "$gray11" },
});

const SelectIcon = styled(Select.SelectIcon, {
  color: "$gray11",
});

const SelectContent = styled(Select.Content, {
  overflow: "hidden",
  background: "linear-gradient($gray1,$gray3)",
  border:"1px solid $gray5",
  borderRadius: "$r3",
  zIndex:"1000",
  boxShadow:"$shadow3",
  width:'fit-content',
});

const SelectViewport = styled(Select.Viewport, {
  padding: 10,
});

const SelectItem = forwardRef(({ children, ...props }:any, forwardedRef) => {
  return (
    <StyledItem
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <StyledItemIndicator>
        <FiCheck/>
      </StyledItemIndicator>
    </StyledItem>
  );
});
SelectItem.displayName = "SelectItem";

const StyledItem = styled(Select.Item, {
  fontSize: 13,
  lineHeight: 1,
  color: "$gray12",
  borderRadius: "$r2",
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "5px 35px 5px 25px",
  position: "relative",
  userSelect: "none",
  transition:'$speed1',

  "&[data-disabled]": {
    color: "$gray8",
    cursor: "not-allowed",
  },

  "&[data-highlighted]": {
    outline: "none",
    background: "black",
    color: "$gray1",
  },

  "&:hover":{
    cursor:'pointer',
    boxShadow:'$shadow1',
    transform:'scale(1.01)'
  }
});

const SelectLabel = styled(Select.Label, {
  padding: "0 25px",
  fontSize: 12,
  lineHeight: "25px",
  color: "$gray10",
});

const SelectSeparator = styled(Select.Separator, {
  height: 1,
  backgroundColor: "$gray6",
  margin: 5,
});

const StyledItemIndicator = styled(Select.ItemIndicator, {
  cursor:"pointer",
  position: "absolute",
  left: 0,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const scrollButtonStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 25,
  opacity:'0.5',
  // backgroundColor: "white",
  color: "$gray11",
  cursor: "default",
};

const SelectScrollUpButton = styled(Select.ScrollUpButton, scrollButtonStyles);

const SelectScrollDownButton = styled(Select.ScrollDownButton, scrollButtonStyles);

Selector.Item = SelectItem;
Selector.Hr = SelectSeparator;
Selector.Group = Select.Group;
Selector.Label = SelectLabel;
export default Selector;