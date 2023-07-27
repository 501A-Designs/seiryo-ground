import React from "react";
import { VariantProps, cva } from "cva";

export const categoryColor = {
  b: ["from-blue-400", "to-blue-500"],
  g: ["from-green-400", "to-green-500"],
  o: ["from-orange-400", "to-orange-500"],
  p: ["from-purple-400", "to-purple-500"],
};

const categoryBadge = cva(["rounded-full", "bg-gradient-to-r"], {
  variants: {
    category: categoryColor,
    size: {
      small: ["w-[10px]", "h-[10px]"],
      large: ["w-[20px]", "h-[20px]"],
    },
  },
});

interface CategoryBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof categoryBadge> {}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, size }) => (
  <div className={categoryBadge({ category, size })} />
);

export default CategoryBadge;
