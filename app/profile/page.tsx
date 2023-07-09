"use client";
import { DocumentData, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import useSound from "use-sound";
import { auth, db } from "../../firebase";
import { checkLevel } from "../../lib/util/helper";
import { DownloadIcon, ExitIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import Button from "../../components/button/Button";
import { VariantProps, cva } from "cva";
import Align from "../../lib/alignment/Align";
import RadixDialog from "../../components/radix/Dialog";
import Table from "../../components/general/Table";
import { signOut } from "firebase/auth";
import * as Progress from "@radix-ui/react-progress";

export const cardColors = {
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

const profileCard = cva(
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
      level: cardColors,
      animate: {
        true: ["animate-flip-card"],
        false: [""],
      },
    },
    defaultVariants: {
      animate: false,
    },
  }
);
const ProfileCard = ({ user }) => {
  const [userData] = useDocument<DocumentData>(
    doc(db, `users/${user && user.uid}`)
  );

  const [animate, setAnimate] = useState(false);
  const [showNewContent, setShowNewContent] = useState(false);

  const [load1] = useSound("/sound/load-1-sg.mp3");
  const [celebrate1] = useSound("/sound/celebrate-1-sg.mp3");
  const [celebrate2] = useSound("/sound/celebrate-2-sg.mp3");
  const [tap2] = useSound("/sound/tap-2-sg.mp3", { playbackRate: 1.3 });

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
    await updateDoc(doc(db, `users/${user && user.uid}/`), {
      level: upgradableLevel,
    });
    setShowNewContent(false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    celebrate1();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setAnimate(false);
  };

  useEffect(() => {
    if (user && userData) {
      let postCount = userData.data().postCount;
      let reviewCount = userData.data().reviewCount;
      if (checkLevel(postCount, reviewCount) !== userData.data().level) {
        flip();
        setUpgradableLevel(checkLevel(postCount, reviewCount));
      }
    }
  }, [userData]);

  return (
    <div
      className={profileCard({
        level: userData?.data().level,
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
            <h1 className={`text-black dark:text-white text-center mb-0`}>
              Level {upgradableLevel}
            </h1>
            <p className={`text-zinc-800/50 dark:text-zinc-100/50 text-center`}>
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
              <h2 className={`text-white`}>{user.displayName}</h2>
              <p className={`text-white`}>{user.metadata.creationTime}</p>
            </div>
          </div>
          <div
            className={`flex justify-start items-center [writing-mode:vertical-rl] animate-pulse`}
          >
            <p className={`text-zinc-50/50`}>
              清涼広場会員カード
              <br />
              Level {userData?.data()?.level} Card
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  point: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  name,
  point,
  max,
  className,
}) => {
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

export default function Profile() {
  const [user] = useAuthState(auth);

  return (
    <div className={`px-10`}>
      {user ? (
        <div className={`grid`}>
          <Align
            className={`
              justify-center flex-col gap-6 
              [perspective:200px] z-0 my-20
            `}
          >
            <ProfileCard user={user} />
            <RadixDialog
              title={user.displayName}
              trigger={
                <Button intent={"transparent"} icon={<InfoCircledIcon />}>
                  詳細を確認
                </Button>
              }
            >
              <h5>ユーザー様の現在の状況</h5>
              <ProgressBar name={"総数"} point={32} max={75} />
              <ProgressBar name={"場所追加数"} point={32} max={75} />
              <ProgressBar name={"レビュー数"} point={32} max={75} />
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
          <div>
            <h3>追加した場所</h3>
            <h3>書いたレビュー</h3>
            <h3>いいねした場所</h3>
          </div>
        </div>
      ) : (
        <h4>ログインする必要がございます</h4>
      )}
    </div>
  );
}
