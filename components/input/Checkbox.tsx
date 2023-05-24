import React, { useState } from "react";
import { styled } from "../../../stitches.config";
import { CheckCircledIcon, CircleIcon } from "@radix-ui/react-icons";
import useSound from "use-sound";
import { keyframes } from "@stitches/react";

interface CheckboxProps {
  options: { [key: string]: boolean };
  onChange: (options: { [key: string]: boolean }) => void;
  labels: object[];
}

const Checkbox: React.FC<CheckboxProps> = ({ options, onChange, labels }) => {
  const [tap1] = useSound("/sound/tap-1-sg.mp3", { playbackRate: 1.1 });
  const [selectedOptions, setSelectedOptions] = useState(options);

  const handleCheckboxChange = (option: string) => {
    tap1();
    const updatedOptions = {
      ...selectedOptions,
      [option]: !selectedOptions[option],
    };
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  return (
    <CheckboxStyled>
      {Object.keys(options).map((option, i) => (
        <CheckboxItemStyled
          key={option}
          checked={selectedOptions[option]}
          htmlFor={i + option}
        >
          <input
            type="checkbox"
            name="checkbox"
            id={i + option}
            checked={selectedOptions[option]}
            onChange={() => handleCheckboxChange(option)}
          />
          {selectedOptions[option] ? <CheckCircledIcon /> : <CircleIcon />}
          <span>{labels[option.toUpperCase()]}</span>
        </CheckboxItemStyled>
      ))}
    </CheckboxStyled>
  );
};
export default Checkbox;

// ANIMATION
const shiftText = keyframes({
  "0%": {
    transform: "translateX(0)",
  },
  "30%": {
    transform: "translateX(10%)",
  },
});
const scaleIcon = keyframes({
  "0%": {
    transform: "scale(1)",
  },
  "50%": {
    transform: "scale(1.5)",
  },
});

const CheckboxStyled = styled("form", {
  display: "grid",
  gap: "0.25em",
  maxWidth: "220px",
  minWidth: "200px",
  width: "100%",
});

const CheckboxItemStyled = styled("label", {
  cursor: "pointer",
  border: "1px solid transparent",
  borderRadius: "$r2",
  display: "flex",
  alignItems: "center",
  padding: "$small",
  input: {
    appearance: "none",
    position: "absolute",
  },
  span: {
    marginLeft: "$small",
    minWidth: "200px",
    fontSize: "$8",
  },

  variants: {
    checked: {
      true: {
        backgroundColor: "$gray12",
        color: "$gray1",
        span: {
          color: "$gray3",
          fontWeight: "bold",
          animation: `${shiftText} 0.5s`,
        },
        svg: {
          animation: `${scaleIcon} 0.3s`,
        },
      },
      false: {
        backgroundColor: "transparent",
        color: "$gray10",
        span: {
          color: "$gray10",
        },
        "&:hover": {
          backgroundColor: "$gray4",
          border: "1px solid $gray5",
          color: "$gray11",
        },
      },
    },
  },
});
