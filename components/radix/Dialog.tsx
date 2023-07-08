import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import Align from "../../lib/alignment/Align";
import Button from "../button/Button";
import useSound from "use-sound";

interface RadixDialogButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

interface RadixDialogContentProps {
  trigger: JSX.Element;
  title: string;
  description?: string;
  children: JSX.Element | JSX.Element[];
}

interface RadixDialogProps extends React.FC<RadixDialogContentProps> {
  Button: React.FC<RadixDialogButtonProps>;
}

const RadixDialogButton: React.FC<RadixDialogButtonProps> = ({
  children,
  ...props
}) => {
  const [tap4] = useSound("/sound/tap-4-sg.mp3");

  return (
    <button
      className={`
        cursor-pointer outline-gray-600 
        flex items-center gap-4 text-sm 
        w-full rounded-xl px-3 py-3 
        bg-transparent
        border 
        border-transparent
        text-zinc-500 
        hover:text-zinc-900 
        hover:dark:text-zinc-100
        bg-gradient-to-r
        hover:from-zinc-200 
        hover:to-zinc-200/50 
        hover:border-zinc-200 
        hover:dark:from-zinc-800 
        hover:dark:to-zinc-800/50 
        hover:dark:border-zinc-800 
      `}
      onMouseDown={() => tap4()}
      {...props}
    >
      <Align className={`justify-between`}>
        <Align className={`gap-2`}>{children}</Align>
      </Align>
    </button>
  );
};

const RadixDialog: RadixDialogProps = ({
  trigger,
  title,
  description,
  children,
}) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay
        className={` backdrop-blur-sm 
          bg-gradient-to-t 
          from-grayA1 
          to-gray-1
          fixed inset-0
        `}
      />
      <Dialog.Content
        className={`
          data-[state=open]:animate-pop-in-dialog
          data-[state=closed]:animate-pop-out-dialog
          fixed 
          top-[50%] left-[50%] 
          translate-x-[-50%] translate-y-[-50%]
          max-h-[85vh] w-[90vw] max-w-[450px] rounded-3xl
          border 
          border-zinc-200
          dark:border-zinc-800
          bg-zinc-100
          dark:bg-zinc-900
          p-4
          focus:outline-none 
          overflow-y-scroll 
          shadow-shadow1
        `}
      >
        <Align className={`justify-between`}>
          <Dialog.Title
            className={`
              ml-2 text-xs select-none uppercase
              text-zinc-600 
              dark:text-zinc-500 
            `}
          >
            {title}
          </Dialog.Title>
          <Dialog.Close asChild>
            <Button
              icon={<Cross2Icon />}
              intent={"transparent"}
              size={"small"}
            />
          </Dialog.Close>
        </Align>

        {description && (
          <Dialog.Description className={`mt-4 mx-2 text-sm`}>
            {description}
          </Dialog.Description>
        )}
        {children && <div className={`mt-4`}>{children}</div>}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

RadixDialog.Button = RadixDialogButton;

export default RadixDialog;
