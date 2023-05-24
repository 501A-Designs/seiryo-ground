import React from "react";
import { VariantProps, cva } from "cva";

const div = cva(
  ["w-auto ", "flex ", "py-2 ", "px-4 ", "flex-col ", "rounded-md"],
  {
    variants: {
      intent: {
        filled: [
          "border",
          "border-zinc-300",
          "dark:border-zinc-800",
          "bg-zinc-200",
          "dark:bg-zinc-900",
        ],
        outline: ["border", "border-gray-300"],
      },
    },
    defaultVariants: {
      intent: "filled",
    },
  }
);

interface ParagraphProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof div> {}

const Container: React.FC<ParagraphProps> = ({
  intent,
  className,
  ...props
}) => {
  return (
    <div className={div({ intent, className })} {...props}>
      {props.children}
    </div>
  );
};

export default Container;
