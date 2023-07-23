import React from "react";
import { styled } from "../stitches.config";
import AlignItems from "../app/components/general/Align";

const RatingStyled = styled("div", {
  color: "$gray12",
  padding: "0.5em 1em",
  borderRadius: "$r2",
  h3: {
    margin: "0",
  },
  p: {
    margin: "0",
    color: "$gray11",
  },
  variants: {
    fill: {
      true: {
        border: "1px solid $gray4",
        background: "linear-gradient(20deg, $gray4 0%, $gray1 100%)",
      },
    },
  },
});

export default function Rating(props) {
  return (
    <RatingStyled fill={props.fill}>
      <AlignItems>
        <h3>{props.rating}</h3>
        {props.hideMax ? (
          <p>{props.description}</p>
        ) : (
          <p>/10：{props.description}</p>
        )}
      </AlignItems>
    </RatingStyled>
  );
}
