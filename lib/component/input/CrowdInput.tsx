import React, { useState } from "react";
import { styled } from "../../../stitches.config";
import useSound from "use-sound";
import AlignItems from "../../alignment/AlignItems";
import { popOutNoBlur } from "../../ux/keyframes";
import { keyframes } from "@stitches/react";
import { sizeButtonArray } from "../button/buttonData";
import useLocale from "../../util/useLocale";
import { Size } from "../../util/types";

interface CrowdInputProps {
  setState: any;
  state: Size;
}

const CrowdInput = (props: CrowdInputProps) => {
  const { t } = useLocale();
  const T = t.INPUT.SIZE;
  const [select1] = useSound("/sound/select-1-sg.mp3", { playbackRate: 1.1 });

  return (
    <CrowdInputContainerStyled>
      <AlignItems justifyContent={"center"} flexDirection={"column"}>
        {props.state === "s" && (
          <>
            <h3>~20m</h3>
            <p>{T.SMALL.EX}</p>
          </>
        )}
        {props.state === "m" && (
          <>
            <h3>20~100m</h3>
            <p>{T.MEDIUM.EX}</p>
          </>
        )}
        {props.state === "l" && (
          <>
            <h3>100m~</h3>
            <p>{T.LARGE.EX}</p>
          </>
        )}
      </AlignItems>
      <CrowdInputStyled>
        {sizeButtonArray.map((item: string, i: any) => (
          <CrowdInputItemStyled checked={props.state === item}>
            <input
              type="radio"
              name="crowdInput"
              value={item}
              id={i + item}
              checked={props.state === item}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                select1();
                props.setState(e.target.value);
              }}
            />
            <label htmlFor={i + item}>
              {item === "s" && T.SMALL.LABEL}
              {item === "m" && T.MEDIUM.LABEL}
              {item === "l" && T.LARGE.LABEL}
            </label>
          </CrowdInputItemStyled>
        ))}
      </CrowdInputStyled>
    </CrowdInputContainerStyled>
  );
};

// ANIMATION
const grow = keyframes({
  "0%": {
    width: "25%",
  },
  "50%": {
    width: "60%",
  },
});

// STYLES
const CrowdInputStyled = styled("form", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "$extraSmall",
  maxWidth: "250px",
  width: "100%",
});

const CrowdInputItemStyled = styled("div", {
  border: "1px solid transparent",
  borderRadius: "$r2",
  input: {
    appearance: "none",
    position: "absolute",
  },
  label: {
    cursor: "pointer",
    userSelect: "none",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    maxHeight: "20px",
    padding: "$small",
    fontSize: "$8",
    transition: "$speed1",
  },
  variants: {
    checked: {
      true: {
        label: {
          color: "$gray1",
          fontWeight: "bold",
        },
        animation: `${grow} 0.3s`,
        background: "$gray12",
        borderColor: "$gray12",
        width: "50%",
        fontWeight: "500",
        boxShadow: "$shadow1",
      },
      false: {
        label: {
          color: "$gray10",
        },
        width: "25%",
        "&:hover": {
          color: "$gray11",
          backgroundColor: "$gray4",
          border: "1px solid $gray5",
        },
      },
    },
  },
});

const CrowdInputContainerStyled = styled("section", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100%",
  gap: "$medium",
  h3: {
    margin: "1em 0 0 0",
    animation: `${popOutNoBlur} 0.2s`,
  },
  p: {
    animation: `${popOutNoBlur} 0.3s`,
  },
});

export default CrowdInput;
