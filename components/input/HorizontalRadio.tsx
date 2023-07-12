import React, { useState } from "react";
import useSound from "use-sound";
import Align from "../../lib/alignment/Align";
import { VariantProps, cva } from "cva";

const div = cva(["rounded-lg", "select-none", "cursor-pointer", "border"], {
  variants: {
    checked: {
      true: [
        "text-black",
        "dark:text-white",
        "filled",
        "w-full",
        "transition",
        "duration-150",
        "ease-out",
        "animate-stretch-bounce",
      ],
      false: [
        "border-transparent",
        "bg-transparent",
        "text-zinc-400",
        "dark:text-zinc-500",
        "hover:text-zinc-500",
        "dark:hover:text-zinc-300",
        "hover:bg-zinc-200/70",
        "dark:hover:bg-zinc-800/70",
        "w-full",
        "transition",
        "duration-150",
        "ease-out",
      ],
    },
  },
  defaultVariants: {
    checked: false,
  },
});

interface RadioItemProps
  extends VariantProps<typeof div>,
    React.HTMLAttributes<HTMLDivElement> {}
const RadioItem: React.FC<RadioItemProps> = ({ checked, ...props }) => (
  <div className={div({ checked })} {...props} />
);

export interface HorizontalRadioOptionType {
  label: string;
  value: string;
}

interface RadioProps extends VariantProps<typeof div> {
  options: HorizontalRadioOptionType[];
  onChange: (selectedOption: string) => void;
}

const HorizontalRadio: React.FC<RadioProps> = ({ options, onChange }) => {
  const [select1] = useSound("/sound/select-1-sg.mp3");
  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <Align className={`justify-between gap-0.5`}>
      {/* <Align className={`justify-center`}>
        {options.map((option: any, i) => (
          <>
            {selectedOption === option.value && (
              <Align className={`flex-col`} key={i}>
                <h3>{option.title}</h3>
                <p>{option.ex}</p>
              </Align>
            )}
          </>
        ))}
      </Align> */}
      {options.map((option: any, i: any) => (
        <RadioItem checked={selectedOption === option.value}>
          <input
            className={`appearance-none absolute`}
            type="radio"
            name="crowdInput"
            id={i + option.value}
            checked={selectedOption === option.value}
            value={selectedOption}
            onChange={() => {
              select1();
              setSelectedOption(option.value);
              onChange(option);
            }}
          />
          <label
            htmlFor={i + option.value}
            className={`
              flex items-center flex-row
              justify-center max-h-5
              px-4 py-4 cursor-pointer text-xs
            `}
          >
            {option.label}
          </label>
        </RadioItem>
      ))}
    </Align>
  );
};

// h3: {
//   margin: "1em 0 0 0",
//   animation: `${popOutNoBlur} 0.2s`,
// },
// p: {
//   animation: `${popOutNoBlur} 0.3s`,
// },

export default HorizontalRadio;
