import React from "react";
import { VariantProps, cva } from "cva";

const typeBadgeColors = cva(["rounded-full", "bg-gradient-to-r"], {
  variants: {
    type: {
      blue: ["from-seiryo-blue-start", "to-seiryo-blue-end"],
      green: ["from-seiryo-green-start", "to-seiryo-green-end"],
      orange: ["from-seiryo-orange-start", "to-seiryo-orange-end"],
      purple: ["from-seiryo-purple-start", "to-seiryo-purple-end"],
    },
    size: {
      small: ["w-[10px]", "h-[10px]"],
      large: ["w-[20px]", "h-[20px]"],
    },
  },
});

interface TypeBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof typeBadgeColors> {}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type, size }) => (
  <div className={typeBadgeColors({ type, size })} />
);

export default TypeBadge;
