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
        <Link href={"/"} className={`no-underline`}>
          <h1 className={`text-base font-medium`}>SEIRYO GROUND [β]</h1>
        </Link>
      </Align>
      <Align className={`gap-2`}>
        {!user && (
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
          {/* <ProfileContainer upgradable={upgradable ? true : false} /> */}
          {user && (
            <div
              className={`
              cursor-pointer px-6 py-4 mb-2 rounded-xl
              bg-gradient-to-b
              from-zinc-200/50 
              to-zinc-200 
              dark:from-zinc-800 
              dark:to-zinc-800/50 

              border
              border-zinc-200 
              dark:border-zinc-800 
            `}
              onClick={() => router.push("/profile")}
            >
              <Align className={`gap-3`}>
                <div>
                  <Image
                    width={"40"}
                    height={"40"}
                    alt={"profile image"}
                    src={user.photoURL}
                    onClick={() => {
                      router.push("/profile");
                    }}
                    className={`
                      rounded-full 
                      border
                      border-zinc-200 
                      dark:border-zinc-800 
                    `}
                  />
                  <div
                    className={`absolute w-2 h-2 bg-red-600 rounded-full top-5`}
                  />
                </div>
                <div className={`grid gap-0`}>
                  <h4 className={`m-0`}>{user.displayName}</h4>
                  <p className={`m-0`}>{user.email}</p>
                </div>
              </Align>
            </div>
          )}
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
