"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import useSound from "use-sound";
import { auth } from "../../../firebase/firebase";
import { checkLevel } from "../../../lib/util/helper";
import { DownloadIcon, ExitIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useAuthState } from "react-firebase-hooks/auth";

import { cva } from "cva";
import Align from "../../components/general/Align";

import { signOut } from "firebase/auth";
import * as Progress from "@radix-ui/react-progress";
import Button from "../../components/button/Button";
import RadixDialog from "../../components/radix/Dialog";
import { userLevelColor } from "../../components/badge/UserLevelBadge";
import { PlaceDataProps } from "../../components/general/Place";

const userCard = cva(
  [
    "select-none",
    "rounded-3xl",
    "p-5",
    "w-[300px]",
    "h-[200px]",
    "shadow-xl",
    "border",
    "border-zinc-200/40",
    "dark:border-zinc-500/40",
    "bg-gradient-to-br",
  ],
  {
    variants: {
      level: userLevelColor,
      animate: {
        true: ["animate-flip-card"],
      },
    },
    defaultVariants: {
      animate: false,
    },
  }
);

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  point: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ name, point, max }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100 * (point / max)), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`grid gap-0 my-2`}>
      <Align className={`justify-between`}>
        <h6>{name}</h6>
        <p>
          {point}/{max}
        </p>
      </Align>
      <Progress.Root
        className={`
          relative overflow-hidden 
          bg-zinc-200/50
          dark:bg-zinc-700/50 rounded-lg
          border 
          border-zinc-300/50
          dark:border-zinc-700/50
          w-full h-[10px] [transform: translateZ(0)]
        `}
        value={progress}
      >
        <Progress.Indicator
          className={`
            w-full h-full transition-transform duration-[660ms]
            ease-[cubic-bezier(0.65, 0, 0.35, 1)] rounded-md
            bg-gradient-to-r 
            from-transparent
            to-zinc-950
            dark:to-zinc-50
          `}
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
    </div>
  );
};

export interface UserDataTypes {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  reviews: any[];
  places: PlaceDataProps[];
}

const UserCard: React.FC<{ data: UserDataTypes }> = ({ data }) => {
  const [user] = useAuthState(auth);

  const [animate, setAnimate] = useState(false);
  const [showNewContent, setShowNewContent] = useState(false);

  const [load1] = useSound("/sound/load-1-sg.mp3");
  const [celebrate1] = useSound("/sound/celebrate-1-sg.mp3");
  const [celebrate2] = useSound("/sound/celebrate-2-sg.mp3");
  const [tap2] = useSound("/sound/tap-2-sg.mp3");

  const flip = async () => {
    setAnimate(true);
    celebrate2();
    await new Promise((resolve) => setTimeout(resolve, 500));
    setShowNewContent(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setAnimate(false);
  };

  const [upgradableLevel, setUpgradableLevel] = useState(0);
  const upgrade = async () => {
    load1();
    setAnimate(true);
    // await updateDoc(doc(db, `users/${user && user.uid}/`), {
    //   level: upgradableLevel,
    // });
    setShowNewContent(false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    celebrate1();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setAnimate(false);
  };

  const { name, level, reviews, places } = data;
  const placeCount = places.length;
  const reviewCount = reviews.length;

  useEffect(() => {
    if (user) {
      if (checkLevel(placeCount, reviewCount) != data.level) {
        flip();
        setUpgradableLevel(checkLevel(placeCount, reviewCount));
      }
    }
  }, [data]);

  return (
    <>
      {user && data && (
        <div className={`px-10`}>
          <div className={`grid`}>
            <Align
              className={`
              justify-center flex-col gap-6 
              [perspective:200px] z-0 my-20
            `}
            >
              <div
                className={userCard({
                  level: level,
                  animate: animate,
                })}
              >
                {showNewContent ? (
                  <div
                    className={`
                      p-3 rounded-lg
                      bg-zinc-50/80 
                      dark:bg-zinc-950/80 
                      border border-zinc-100/50 dark:border-zinc-800/50
                      shadow-xl h-full
                    `}
                  >
                    <Align className={`justify-center gap-2 flex-col`}>
                      <h1
                        className={`text-black dark:text-white text-center mb-0`}
                      >
                        Level {upgradableLevel}
                      </h1>
                      <p
                        className={`text-zinc-800/50 dark:text-zinc-100/50 text-center`}
                      >
                        おめでとうございます。
                        <br />
                        カードをアップグレードできます。
                      </p>
                      <Button onClick={() => upgrade()} icon={<DownloadIcon />}>
                        アップグレード
                      </Button>
                    </Align>
                  </div>
                ) : (
                  <div className={`flex justify-between h-full`}>
                    <div className={`flex justify-end items-end`}>
                      <div>
                        <h2 className={`text-white`}>{name}</h2>
                        <p className={`text-white`}>
                          {user.metadata.creationTime}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex justify-start items-center [writing-mode:vertical-rl] animate-pulse`}
                    >
                      <p className={`text-zinc-50/50`}>
                        清涼広場会員カード
                        <br />
                        Level {level} Card
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <RadixDialog
                title={user.displayName}
                trigger={
                  <Button intent={"transparent"} icon={<InfoCircledIcon />}>
                    詳細を確認
                  </Button>
                }
              >
                <h5>ユーザー様の現在の状況</h5>
                <ProgressBar
                  name={"総数"}
                  point={placeCount + reviewCount}
                  max={40}
                />
                <ProgressBar name={"場所追加数"} point={placeCount} max={20} />
                <ProgressBar name={"レビュー数"} point={reviewCount} max={20} />
                <hr />
                <Align className={`justify-between`}>
                  <h5 className={`m-0`}>清涼広場から退出する</h5>
                  <Button
                    intent={"red"}
                    icon={<ExitIcon />}
                    onClick={() => signOut(auth)}
                  >
                    ログアウト
                  </Button>
                </Align>
              </RadixDialog>
            </Align>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;
