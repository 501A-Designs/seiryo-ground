import React from "react";
import { VariantProps, cva } from "cva";

export const userLevelColor = {
  1: [
    "from-green-400",
    "to-green-600",
    "dark:from-green-700",
    "dark:to-green-900",
  ],
  2: ["from-blue-400", "to-blue-600", "dark:from-blue-700", "dark:to-blue-900"],
  3: [
    "from-orange-400",
    "to-orange-600",
    "dark:from-orange-700",
    "dark:to-orange-900",
  ],
  4: ["from-red-400", "to-red-600", "dark:from-red-700", "dark:to-red-900"],
  5: ["from-zinc-400", "to-zinc-600", "dark:from-zinc-700", "dark:to-zinc-900"],
};

const userLevelBadge = cva(["rounded-full", "bg-gradient-to-r"], {
  variants: {
    level: userLevelColor,
    size: {
      small: ["w-[10px]", "h-[10px]"],
      large: ["w-[20px]", "h-[20px]"],
    },
  },
});

interface UserLevelBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof userLevelBadge> {}

const UserLevelBadge: React.FC<UserLevelBadgeProps> = ({ level, size }) => (
  <div className={userLevelBadge({ level, size })} />
);

export default UserLevelBadge;
