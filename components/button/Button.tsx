"use client";
import React from "react";
import { cva, VariantProps } from "cva";
import useSound from "use-sound";

const button = cva(
  [
    "flex",
    "items-center",
    "justify-center",
    "gap-2",
    "cursor-pointer",
    "w-fit-content",
    "h-fit-content",
    "select-none",
    "transition",
    "duration-500",
    "outline-none",
    "rounded-full",
  ],
  {
    variants: {
      size: {
        medium: ["px-4", "py-1.5", "text-xs"],
        small: ["p-2", "min-w-35", "min-h-35", "text-base"],
      },
      intent: {
        primary: [
          "skeumorphic",
          // "border",
          // "border-zinc-950",
          // "dark:border-zinc-100",
          // "text-zinc-100",
          // "dark:text-zinc-900",
          // "bg-zinc-900",
          // "dark:bg-zinc-300",
          // "shadow-md",
        ],
        secondary: [
          "border",
          "border-zinc-300",
          "dark:border-zinc-700",
          "text-zinc-900",
          "dark:text-zinc-100",
          "bg-zinc-200",
          "dark:bg-zinc-800",
        ],
        transparent: [
          "bg-transparent",
          "border",
          "border-transparent",
          "text-zinc-900",
          "dark:text-zinc-200",
          "hover:bg-zinc-200",
          "dark:hover:bg-zinc-800",
        ],
        gray: [
          "bg-gray-500",
          "border",
          "border-gray-500",
          "text-gray-400",
          "hover:text-white",
        ],
        black: [
          "bg-gray-800",
          "border",
          "border-gray-500",
          "text-gray-600",
          "hover:transform",
          "hover:scale-102",
          "hover:opacity-80",
          "hover:text-gray-100",
        ],
        red: [
          "bg-transparent",
          "border",
          "border-transparent",
          "text-red-900",
          "hover:bg-gray-200",
          "hover:transform",
          "hover:scale-102",
          "hover:opacity-80",
          "hover:text-red-100",
        ],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  // overRideSound?: any;
  // backTapSound?: any;
  onClick?: any;
  icon: JSX.Element;
}

// animation: `${popOutNoBlur} 0.3s`,
const Button: React.FC<ButtonProps> = ({ intent, size, ...props }) => {
  // const [tap1] = useSound("/sound/tap-1-sg.mp3", { playbackRate: 1.1 });
  const [tap2] = useSound("/sound/tap-2-sg.mp3");

  return (
    <button
      className={button({ intent, size })}
      onMouseDown={
        () => tap2()
        // props.overRideSound
        //   ? props.overRideSound
        //   : () => (props.backTapSound ? tap2() : tap1())
      }
      {...props}
    >
      {props.icon && props.icon}
      {props.children && <span>{props.children}</span>}
    </button>
  );
};

export default Button;
