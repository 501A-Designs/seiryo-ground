import React from "react";
import useSound from "use-sound";
import { cva } from "cva";
import { typeColor } from "../general/TypeBadge";
import { PlaceForm } from "../../app/api/place/route";

type category = "green" | "blue" | "orange" | "purple";
const categories: category[] = ["green", "blue", "orange", "purple"];

// ANIMATION
// const shiftText = keyframes({

// });

const categoryInputItem = cva(
  [
    "flex",
    "gap-2",
    "items-center",
    "cursor-pointer",
    "text-center",
    "text-xs",
    "py-2",
    "px-3",
    "rounded-full",
    "transition",
    "duration-300",
    "border",
  ],
  {
    variants: {
      checked: {
        true: ["text-black", "dark:text-white", "filled"],
        false: [
          "border-transparent",
          "bg-transparent",
          "text-zinc-400",
          "hover:bg-zinc-200/70",
          "hover:text-zinc-500",
          "dark:text-zinc-500",
          "dark:hover:bg-zinc-800/70",
          "dark:hover:text-zinc-300",
        ],
      },
    },
  }
);

const typeBadge = cva(
  [
    "flex",
    "items-center",
    "justify-center",
    "italic",
    "transition-all",
    "duration-300",
    "rounded-full",
    "bg-gradient-to-r",
  ],
  {
    variants: {
      checked: {
        true: ["w-[10px]", "h-[10px]", "animate-scale"],
        false: ["w-[30px]", "h-[3px]"],
      },
      type: typeColor,
    },
  }
);

interface CategoryInputProps {
  place: PlaceForm;
  state: category | string;
  setState: any;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  place,
  state,
  setState,
}) => {
  const [select1] = useSound("/sound/select-1-sg.mp3");

  return (
    <div className={`grid gap-0.5 w-full`}>
      {categories.map((item: any, i: any) => (
        <label
          className={categoryInputItem({
            checked: state === item,
          })}
          htmlFor={i + item}
        >
          <input
            className={`appearance-none absolute`}
            type="radio"
            name="categoryInput"
            value={item}
            id={i + item}
            checked={state === item}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              select1();
              setState({
                ...place,
                category: e.target.value,
              });
            }}
          />
          <div
            className={typeBadge({
              checked: state === item,
              type: item,
            })}
          />
          <span className={state === item ? "animate-bounce-left" : ""}>
            {item === "green" && "森。山。公園等"}
            {item === "blue" && "海。池。川等"}
            {item === "orange" && "建物。カフェ等"}
            {item === "purple" && "その他"}
          </span>
        </label>
      ))}
    </div>
  );
};

export default CategoryInput;
