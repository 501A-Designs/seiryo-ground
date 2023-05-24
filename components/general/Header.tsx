"use client";
import React from "react";
import Align from "../../lib/alignment/Align";
import Link from "next/link";
import RadixDialog from "../radix/RadixDialog";
import Button from "../button/Button";
import { EnterIcon, PersonIcon } from "@radix-ui/react-icons";

const Header = () => {
  return (
    <header
      className={`
        sticky top-0
        bg-zinc-100
        dark:bg-zinc-950
        border-b
        border-b-zinc-200
        dark:border-b-zinc-900 
        text-zinc-900
        dark:text-zinc-100
        flex justify-between items-center
        px-10 py-3
      `}
    >
      <Align>
        <Link href={"/"}>
          <h1 className={`text-base font-medium`}>SEIRYO GROUND [Beta]</h1>
        </Link>
      </Align>
      <Align className={`gap-2`}>
        <RadixDialog
          title={"Sign In"}
          trigger={<Button icon={<PersonIcon />}>Sign In</Button>}
          description={
            "Googleアカウントでログインする事ができます。登録される前は必ずプライバシーポリシーを読むようお願い致します。"
          }
        >
          <Align className={`justify-center`}>
            <Button icon={<EnterIcon />}>Googleでログイン</Button>
          </Align>
        </RadixDialog>
      </Align>
      {/* <Align>
    <Link href={"/"}>Sign In</Link>
  </Align> */}
    </header>
  );
};

export default Header;
