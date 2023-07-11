import React from "react";
import useSound from "use-sound";
import { VariantProps, cva } from "cva";

const button = cva(
  [
    "text-xs",
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
        true: [
          "filled",
          "text-black",
          "dark:text-white",
          "h-8",
          "w-8",
          "animate-spin-scale",
        ],
        false: [
          "border-none",
          "bg-transparent",
          "text-zinc-400",
          "dark:text-zinc-500",
          "hover:bg-zinc-200/70",
          "dark:hover:bg-zinc-800/70",
          "h-6",
          "w-6",
        ],
      },
    },
  }
);

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
      type="button"
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
        rounded-md w-fit h-5
        flex items-center justify-center gap-1.5 
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

export default Toggle;
