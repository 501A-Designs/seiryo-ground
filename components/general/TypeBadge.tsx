import React from "react";
import { VariantProps, cva } from "cva";

export const typeColor = {
  blue: ["from-blue-400", "to-blue-500"],
  green: ["from-green-400", "to-green-500"],
  orange: ["from-orange-400", "to-orange-500"],
  purple: ["from-purple-400", "to-purple-500"],
};

const typeBadge = cva(["rounded-full", "bg-gradient-to-r"], {
  variants: {
    type: typeColor,
    size: {
      small: ["w-[10px]", "h-[10px]"],
      large: ["w-[20px]", "h-[20px]"],
    },
  },
});

interface TypeBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof typeBadge> {}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type, size }) => (
  <div className={typeBadge({ type, size })} />
);

export default TypeBadge;
