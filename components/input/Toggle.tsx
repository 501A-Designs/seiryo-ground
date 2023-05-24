import React from "react";
import useSound from "use-sound";
import { VariantProps, cva } from "cva";

interface ToggleItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  state: boolean;
  intent: boolean;
}

const ToggleItem: React.FC<ToggleItemProps> = ({ state, intent, ...props }) => {
  const [select1] = useSound("/sound/select-1-sg.mp3", { playbackRate: 1.1 });
  const [select2] = useSound("/sound/select-2-sg.mp3", { playbackRate: 1.1 });

  return (
    <button
      className={button({ state })}
      onMouseDown={() => {
        intent ? !state && select1() : !state && select2();
      }}
      {...props}
    >
      {intent ? "有" : "無"}
    </button>
  );
};

interface ToggleProps {
  state: boolean;
  onClick: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}

const Toggle: React.FC<ToggleProps> = (props) => {
  return (
    <div
      className={`
        rounded-md 
        p-2 
        flex items-center justify-center gap-2 
        w-full h-28
      `}
    >
      <ToggleItem
        state={props.state}
        onClick={!props.state ? props.onClick : null}
        intent={true}
      />
      <ToggleItem
        state={!props.state}
        onClick={props.state ? props.onClick : null}
        intent={false}
      />
    </div>
  );
};

const button = cva(
  [
    "text-sm",
    "cursor-pointer",
    "outline-none",
    "justify-center",
    "items-center",
    "rounded-full",
    "select-none",
    "transition-all",
  ],
  {
    variants: {
      state: {
        true: ["skeumorphic", "h-20", "w-20", "animate-spin-scale"],
        false: [
          "border-none",
          "bg-transparent",
          "text-zinc-500",
          "dark:hover:bg-zinc-800",
          "h-12",
          "w-12",
        ],
      },
    },
  }
);

export default Toggle;
