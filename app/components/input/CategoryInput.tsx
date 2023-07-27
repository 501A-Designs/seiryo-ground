import React from "react";
import useSound from "use-sound";
import { cva } from "cva";
import { PlaceFormTypes } from "../create/CreatePlace";
import { categoryColor } from "../badge/CategoryBadge";

const categories: PlaceFormTypes["category"][] = ["g", "b", "o", "p"];

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
        true: ["text-responsive-full", "filled"],
        false: ["border-transparent", "bg-transparent", "hover-filled"],
      },
    },
  }
);

const categoryBadge = cva(
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
      type: categoryColor,
    },
  }
);

interface CategoryInputProps {
  place: PlaceFormTypes;
  state: PlaceFormTypes["category"];
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
            className={categoryBadge({
              checked: state === item,
              type: item,
            })}
          />
          <span className={state === item ? "animate-bounce-left" : ""}>
            {item === "g" && "森。山。公園等"}
            {item === "b" && "海。池。川等"}
            {item === "o" && "建物。カフェ等"}
            {item === "p" && "その他"}
          </span>
        </label>
      ))}
    </div>
  );
};

export default CategoryInput;
