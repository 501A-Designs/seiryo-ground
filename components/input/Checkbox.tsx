import React, { useState } from "react";
import { CheckCircledIcon, CircleIcon } from "@radix-ui/react-icons";
import useSound from "use-sound";
import { cva } from "cva";

const checkboxItem = cva(
  [
    "cursor-pointer",
    "rounded-md",
    "flex",
    "items-center",
    "gap-1",
    "px-2.5",
    "py-2",
    "transition-all",
    "duration-300",
  ],
  {
    variants: {
      checked: {
        true: ["filled"],
        false: ["border", "border-transparent", "bg-transparent"],
      },
    },
  }
);

export interface CheckboxLabelType {
  label: string;
  value: string;
}

interface CheckboxProps {
  options: { [key: string]: boolean };
  onChange: (options: { [key: string]: boolean }) => void;
  labels: CheckboxLabelType[];
}

const Checkbox: React.FC<CheckboxProps> = ({ options, onChange, labels }) => {
  const [tap1] = useSound("/sound/tap-1-sg.mp3");
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
    <div className={`grid gap-1 w-full`}>
      {Object.keys(options).map((option, i) => (
        <label
          key={option}
          className={checkboxItem({
            checked: selectedOptions[option],
          })}
          htmlFor={i + option}
        >
          <input
            className={`appearance-none absolute`}
            type="checkbox"
            name={option}
            id={i + option}
            checked={selectedOptions[option]}
            onChange={() => handleCheckboxChange(option)}
          />
          <div
            className={`
              ${
                selectedOptions[option]
                  ? `animate-scale text-black dark:text-white`
                  : `text-zinc-300 dark:text-zinc-700`
              }
            `}
          >
            {selectedOptions[option] ? <CheckCircledIcon /> : <CircleIcon />}
          </div>
          <span
            className={`
            text-xs ml-1 
            text-zinc-500 
            dark:text-zinc-400
            ${
              selectedOptions[option] ? "animate-bounce-left" : "animate-scale"
            }`}
          >
            {labels[i].label}
          </span>
        </label>
      ))}
    </div>
  );
};
export default Checkbox;
