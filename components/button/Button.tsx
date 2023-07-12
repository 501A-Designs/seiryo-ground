"use client";
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
        small: ["p-1.5", "min-w-35", "min-h-35", "text-base"],
      },
      intent: {
        primary: ["skeumorphic-responsive"],
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
        red: [
          "border",
          "border-red-500",
          "dark:border-red-800",
          "text-zinc-100",
          "bg-gradient-to-b",
          "to-red-700",
          "dark:to-red-900",
          "from-red-500",
          "dark:from-red-700",
          "shadow-md",
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
  icon: JSX.Element;
}

const Button: React.FC<ButtonProps> = ({ intent, size, ...props }) => {
  const [tap2] = useSound("/sound/tap-2-sg.mp3");

  return (
    <button
      className={button({ intent, size })}
      onMouseDown={() => tap2()}
      {...props}
    >
      {props.icon && props.icon}
      {props.children && <span>{props.children}</span>}
    </button>
  );
};

export default Button;
