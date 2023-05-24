import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import Align from "../../lib/alignment/Align";
import Button from "../button/Button";

interface RadixDialogProps {
  trigger: JSX.Element;
  title: string;
  description?: string;
  children: JSX.Element | JSX.Element[];
}

const RadixDialog: React.FC<RadixDialogProps> = ({
  trigger,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={`
            backdrop-blur-md 
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
              ml-2
              text-sm select-none uppercase
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
          {children && <div className={`mx-2 my-4`}>{children}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default RadixDialog;

// const DialogBannerStyled = styled("div", {
//   background: "linear-gradient(45deg,$gray2,$gray4)",
//   border: "1px solid $gray4",
//   color: "$gray12",
//   padding: "1em",
//   marginBottom: "0.5em",
//   borderRadius: "$r2",
//   fontSize: "$8",
//   p: {
//     margin: 0,
//     fontSize: "$7",
//   },
// });
