"use client";
import React from "react";
import Align from "../../lib/alignment/Align";
import Link from "next/link";
import RadixDialog from "../radix/Dialog";
import Button from "../button/Button";
import {
  BookmarkIcon,
  EnterIcon,
  FrameIcon,
  HamburgerMenuIcon,
  HomeIcon,
  IdCardIcon,
  InfoCircledIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const Header = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <header
      className={`
        sticky top-0 backdrop-blur
        bg-zinc-100/90
        dark:bg-zinc-950/90
        border-b
        border-b-zinc-200
        dark:border-b-zinc-900 
        text-zinc-900
        dark:text-zinc-100
        flex justify-between items-center
        px-10 py-1 z-10
      `}
    >
      <Align>
        <Link href={"/"} className={`no-underline`}>
          <h1 className={`text-base font-medium`}>SEIRYO GROUND [β]</h1>
        </Link>
      </Align>
      <Align className={`gap-2`}>
        {user ? (
          <button
            className={`
              cursor-pointer p-0.5 pr-3 rounded-full
              bg-gradient-to-b
              from-zinc-100/50 
              to-zinc-200 
              dark:from-zinc-800 
              dark:to-zinc-800/50 
              border
              border-zinc-200 
              dark:border-zinc-800 
            `}
            onClick={() => {
              router.push("/profile");
            }}
          >
            <Align className={`gap-2`}>
              <Image
                width={"26"}
                height={"26"}
                alt={"profile image"}
                src={user.photoURL}
                className={`
                  cursor-pointer
                  rounded-full 
                  border
                  border-zinc-200 
                  dark:border-zinc-800 
                `}
              />
              <h6 className={`m-0`}>{user.displayName.split(" ")[0]}</h6>
            </Align>
          </button>
        ) : (
          <RadixDialog
            title={"ログイン"}
            trigger={<Button icon={<PersonIcon />}>ログイン</Button>}
            description={
              "Googleアカウントでログインする事ができます。登録される前は必ずプライバシーポリシーを読むようお願い致します。"
            }
          >
            <Align className={`justify-center mb-4`}>
              <Button icon={<EnterIcon />} onClick={() => signInWithGoogle()}>
                Googleでログイン
              </Button>
            </Align>
          </RadixDialog>
        )}

        <RadixDialog
          title="メニュー"
          trigger={
            <Button
              size={"small"}
              intent={"transparent"}
              icon={<HamburgerMenuIcon />}
            />
          }
        >
          <RadixDialog.Button onClick={() => router.push("/")}>
            <HomeIcon />
            メイン
          </RadixDialog.Button>
          <RadixDialog.Button onClick={() => router.push("/news")}>
            <BookmarkIcon />
            新着情報
          </RadixDialog.Button>
          <RadixDialog.Button onClick={() => router.push("/levels")}>
            <IdCardIcon />
            カード別レベルについて
          </RadixDialog.Button>
          <RadixDialog.Button onClick={() => router.push("/design")}>
            <FrameIcon />
            デザインについて
          </RadixDialog.Button>
          <RadixDialog.Button onClick={() => router.push("/links")}>
            <InfoCircledIcon />
            他全てのリンク集
          </RadixDialog.Button>
        </RadixDialog>
      </Align>
      {/* <Align>
    <Link href={"/"}>Sign In</Link>
  </Align> */}
    </header>
  );
};

export default Header;
