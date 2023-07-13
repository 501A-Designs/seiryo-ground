import React from "react";
import { VariantProps, cva } from "cva";

export const typeColor = {
  b: ["from-blue-400", "to-blue-500"],
  g: ["from-green-400", "to-green-500"],
  o: ["from-orange-400", "to-orange-500"],
  p: ["from-purple-400", "to-purple-500"],
};

const typeBadge = cva(["rounded-full", "bg-gradient-to-r"], {
  variants: {
    category: typeColor,
    size: {
      small: ["w-[10px]", "h-[10px]"],
      large: ["w-[20px]", "h-[20px]"],
    },
  },
});

interface TypeBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof typeBadge> {}

const TypeBadge: React.FC<TypeBadgeProps> = ({ category, size }) => (
  <div className={typeBadge({ category, size })} />
);

export default TypeBadge;
