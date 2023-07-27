"use client";
import React, { useEffect } from "react";
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
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebase";
import Align from "./Align";
import { NewUserTypes } from "../../api/create-user/route";
import CreatePlace from "../create/CreatePlace";

const Header = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (user) {
      const { creationTime, lastSignInTime } = user.metadata;

      if (creationTime === lastSignInTime) {
        const newUser: NewUserTypes = {
          uid: user.uid,
          name: user.displayName,
        };

        const createUser = async () =>
          await fetch("http://localhost:3000/api/create-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((response) => {
              if (response.ok) {
                console.log("Post request successful");
              } else {
                console.error("Post request failed");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });

        createUser();
      }
    }
  }, [user]);

  return (
    <header
      className={`
        sticky top-0 backdrop-blur
        bg-zinc-50/90
        dark:bg-zinc-950/90
        border-b
        border-b-zinc-200/60
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
          <>
            <CreatePlace />
            <Button
              size={"small"}
              intent={"transparent"}
              icon={<PersonIcon />}
              onClick={() => router.push(`/user/${user.uid}`)}
            />
          </>
        ) : (
          <RadixDialog
            title={"ログイン"}
            trigger={<Button icon={<EnterIcon />}>ログイン</Button>}
            description={
              "Googleアカウントでログインする事ができます。登録される前は必ずプライバシーポリシーを読むようお願い致します。"
            }
          >
            <Align className={`justify-center mb-4`}>
              <Button
                icon={<EnterIcon />}
                onClick={() => {
                  signInWithGoogle();
                }}
              >
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
          {/* <input type="text" placeholder="キーワードで場所を探す"></input> */}
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
    </header>
  );
};

export default Header;
