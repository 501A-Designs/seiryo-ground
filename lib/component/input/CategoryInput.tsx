import React from "react";
import { styled } from "../../../stitches.config";
import useSound from "use-sound";
import useLocale from "../../util/useLocale";
import { categories } from "../button/buttonData";
import { Category } from "../../util/types";
import { keyframes } from "@stitches/react";

interface CategoryInputProps {
  state: Category;
  setState: any;
}

const CategoryInput = (props: CategoryInputProps) => {
  const [select1] = useSound("/sound/select-1-sg.mp3", { playbackRate: 1.1 });
  const { t } = useLocale();
  const T = t.INPUT.CATEGORIES;

  return (
    <CategoryInputStyled>
      {categories.map((item: any, i: any) => (
        <CategoryInputItemStyled checked={props.state === item}>
          <input
            type="radio"
            name="categoryInput"
            value={item}
            id={i + item}
            checked={props.state === item}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              select1();
              props.setState(e.target.value);
            }}
          />
          <label htmlFor={i + item}>
            <LabelStyled checked={props.state === item} category={item} />
            <span>
              {item === "b" && T.BLUE}
              {item === "g" && T.GREEN}
              {item === "r" && T.RED}
              {item === "p" && T.PURPLE}
            </span>
          </label>
        </CategoryInputItemStyled>
      ))}
    </CategoryInputStyled>
  );
};

export default CategoryInput;

// ANIMATION
const shiftText = keyframes({
  "0%": {
    transform: "translateX(0)",
  },
  "30%": {
    transform: "translateX(40%)",
  },
});
const scaleLabel = keyframes({
  "0%": {
    transform: "scale(1)",
  },
  "50%": {
    transform: "scale(1.5)",
  },
});

const CategoryInputStyled = styled("form", {
  display: "grid",
  gap: "0.25em",
  maxWidth: "220px",
  minWidth: "200px",
  width: "100%",
});

const CategoryInputItemStyled = styled("div", {
  border: "1px solid transparent",
  borderRadius: "$r2",
  input: {
    appearance: "none",
    position: "absolute",
  },
  span: {
    margin: 0,
    fontSize: "$8",
  },
  label: {
    gap: "$small",
    display: "flex",
    alignItems: "center",
    fontFamily: "$sgFont1",
    cursor: "pointer",
    textAlign: "center",
    padding: "0.5em 1em",
    transition: "$speed1",
  },
  variants: {
    checked: {
      true: {
        span: {
          color: "$gray3",
          fontWeight: "bold",
          animation: `${shiftText} 0.6s`,
        },
        backgroundColor: "$gray12",
        borderColor: "$gray12",
        shadow: "$shadow1",
      },
      false: {
        span: {
          color: "$gray10",
        },
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: "$gray4",
          borderColor: "$gray5",
          span: {
            color: "$gray11",
          },
        },
      },
    },
  },
});

const LabelStyled = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontStyle: "italic",
  borderRadius: "$r2",
  transition: "$speed2",

  variants: {
    checked: {
      true: {
        width: "10px",
        height: "10px",
        animation: `${scaleLabel} 0.3s`,
      },
      false: {
        width: "30px",
        height: "6px",
      },
    },
    category: {
      b: {
        background: "$sgBlue",
      },
      g: {
        background: "$sgGreen",
      },
      r: {
        background: "$sgRed",
      },
      p: {
        background: "$sgPurple",
      },
    },
  },
});
