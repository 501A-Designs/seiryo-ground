"use client";
import { DocumentData, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import useSound from "use-sound";
import { auth, db } from "../../firebase";
import AlignItems from "../../lib/alignment/Align";
import Grid from "../../lib/alignment/Grid";
import { checkLevel } from "../../lib/util/helper";
import {
  popOut,
  rotateAndZoom,
  rotateInBottonLeft,
  spin,
} from "../../lib/ux/keyframes";
import { styled } from "../../stitches.config";
import UniversalNav from "../lib/component/UniversalNav";
import {
  ArrowLeftIcon,
  Cross1Icon,
  DownloadIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import Button from "../../components/button/Button";
import Container from "../../components/general/Container";

export default function Profile() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [userData] = useDocument<DocumentData>(
    doc(db, `users/${user && user.uid}`)
  );

  const [openDetails, setOpenDetails] = useState(false);
  const [showNewContent, setShowNewContent] = useState(false);
  const [loading, setLoading] = useState(false);

  // SOUND
  const [load1] = useSound("/sound/load-1-sg.mp3");
  const [celebrate1] = useSound("/sound/celebrate-1-sg.mp3");
  const [celebrate2] = useSound("/sound/celebrate-2-sg.mp3");
  const [tap2] = useSound("/sound/tap-2-sg.mp3", { playbackRate: 1.3 });

  const flip = async () => {
    setOpenDetails(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    celebrate2();
    setShowNewContent(true);
  };

  const reFlip = () => {
    setOpenDetails(false);
    setShowNewContent(false);
    tap2();
  };

  const [upgradableLevel, setUpgradableLevel] = useState(0);
  const upgrade = async () => {
    setLoading(true);
    load1();
    await updateDoc(doc(db, `users/${user && user.uid}/`), {
      level: upgradableLevel,
    });
    reFlip();
    celebrate1();
    setLoading(false);
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
    <div className={`px-10`}>
      <AlignItems className={`justify-center`}>
        {user ? (
          <Grid gap={"medium"}>
            {userData && (
              <>
                <AlignItems className={`justify-center`}>
                  {openDetails && (
                    <Notification>
                      {loading ? (
                        <ClipLoader color="white" />
                      ) : (
                        <>
                          <h5>カードをアップグレードできます。</h5>
                          <p>清涼広場の機能をより活用しよう！</p>
                        </>
                      )}
                    </Notification>
                  )}
                </AlignItems>
                {!loading && userData && (
                  <Perspective>
                    <ProfileCard
                      level={userData?.data()?.level}
                      rotateAndZoom={openDetails}
                    >
                      {showNewContent ? (
                        <Grid gap={"medium"}>
                          <h3>{user.displayName}</h3>
                          <Container intent={"filled"}>
                            <Grid gap={"large"}>
                              <Grid gap={"small"}>
                                <p>Level {userData.data().level}から</p>
                                <AlignItems>
                                  <h2>Level {upgradableLevel}</h2>
                                  <p>にアップグレード</p>
                                </AlignItems>
                              </Grid>
                              <p>
                                {user.displayName}おめでとうございます。
                                <br />
                                いつもSEIRYO
                                GROUNDへの貢献大変ありがとうございます。
                                <br />
                                以下のボタンを押すとカードのアップグレードができます。
                              </p>
                              <AlignItems justifyContent={"center"}>
                                <Button
                                  intent={"black"}
                                  onClick={() => upgrade()}
                                  icon={<DownloadIcon />}
                                >
                                  アップグレード
                                </Button>
                              </AlignItems>
                            </Grid>
                          </Container>
                        </Grid>
                      ) : (
                        <AlignItems className={`justify-between items-start`}>
                          <div>
                            <h5>SEIRYO GROUND | 清涼広場</h5>
                            <div>
                              <h2>{user.displayName}</h2>
                              <p>{user.metadata.creationTime}</p>
                            </div>
                          </div>
                          <VerticalText>
                            <p>
                              Level {userData?.data()?.level} Membership Card
                            </p>
                            <p>{user.metadata.lastSignInTime}</p>
                          </VerticalText>
                        </AlignItems>
                      )}
                    </ProfileCard>
                  </Perspective>
                )}
              </>
            )}
          </Grid>
        ) : (
          <h4>ログインする必要がございます</h4>
        )}
      </AlignItems>
      {/* {!loading && (
        <UniversalNav
          showInitially={true}
          scrollPop={false}
          popOnMount={true}
          mount={showNewContent ? true : false}
          minSize={"m"}
          maxSize={"xl"}
          dynamicButton={
            <>
              <Button
                size={"small"}
                intent={"transparent"}
                icon={<ArrowLeftIcon />}
                onClick={() => router.push("/")}
              />
              {showNewContent && (
                <Button
                  intent={"transparent"}
                  icon={<Cross1Icon />}
                  onClick={() => reFlip()}
                >
                  閉じる
                </Button>
              )}
              <Button
                size={"small"}
                intent={"transparent"}
                icon={<InfoCircledIcon />}
                onClick={() => router.push("/levels")}
              />
            </>
          }
        />
      )} */}
    </div>
  );
}

const Perspective = styled("div", {
  perspective: "200px",
  minHeight: "400px",
});

const Notification = styled("div", {
  textAlign: "center",
  backgroundColor: "black",
  padding: "1em 2.5em",
  borderRadius: "$round",
  width: "fit-content",
  animation: `${popOut} 1s`,
  h5: {
    margin: "0",
    color: "white",
  },
  p: {
    margin: "0",
    color: "$gray1",
  },
});

const VerticalText = styled("div", {
  fontSize: "$extraSmall",
  writingMode: "vertical-rl",
  p: {
    margin: "0",
  },
});

const ProfileCard = styled("div", {
  borderRadius: "$r4",
  padding: "$extraLarge",
  width: "400px",
  height: "230px",
  boxShadow: "$shadow2",
  border: "1px solid $gray6",
  fontFamily: "$sgFont2",
  transition: "$speed1",
  animation: `${rotateInBottonLeft} 1s`,
  img: {
    borderRadius: "$round",
    border: "1px solid $sgGray3",
    animation: `${spin} linear infinite 10s`,
  },
  h2: {
    margin: 0,
    color: "inherit",
  },
  p: {
    margin: "0",
    color: "inherit",
  },
  h5: {
    margin: 0,
    color: "inherit",
  },
  variants: {
    level: {
      1: {
        color: "black",
        background: "$levelOne",
        [`& ${VerticalText}`]: {
          color: "gray",
        },
      },
      2: {
        color: "$blue1",
        background:
          "linear-gradient(45deg, $blue11 0%, $blue8 100%) url(https://grainy-gradients.vercel.app/noise.svg)",
        [`& ${VerticalText}`]: {
          color: "$blue6",
        },
      },
      3: {
        color: "$green1",
        background: "linear-gradient(45deg, $green11 0%, $green8 100%)",
        [`& ${VerticalText}`]: {
          color: "$green6",
        },
      },
      4: {
        color: "$orange1",
        background: "linear-gradient(45deg, $orange11 0%, $orange8 100%)",
        [`& ${VerticalText}`]: {
          color: "$orange6",
        },
      },
      5: {
        color: "$gray1",
        background: "linear-gradient(45deg, $gray12 0%, $gray11 100%)",
        [`& ${VerticalText}`]: {
          color: "$gray6",
        },
      },
    },
    rotateAndZoom: {
      true: {
        animation: `${rotateAndZoom} 2s`,
        h2: {
          color: "$gray12",
          margin: "0",
        },
        p: {
          color: "$gray11",
        },
      },
    },
  },
});

// export async function getServerSideProps(){
//   const userDataSnap = await getDoc(doc(db, `users/${user && user.uid}`));
//   const userData = jsonParse(userDataSnap.data());

//   return{
//     props:{
//       user,
//       userData
//     }
//   }
// }
