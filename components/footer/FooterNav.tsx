import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import Button from "./button/Button";
import SectionButton from "./SectionButton";

import { styled } from "../../stitches.config";
import { gradient } from "../ux/keyframes";
import { keyframes } from "@stitches/react";
import { useEffect, useState } from "react";
import { scroll } from "../ux/scroll";
import ProfileContainer from "../profile-page/ProfileContainer";
import { checkLevel } from "../util/helper";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import {
  ArrowUpIcon,
  BookmarkIcon,
  FrameIcon,
  HamburgerMenuIcon,
  HomeIcon,
  IdCardIcon,
  InfoCircledIcon,
  ShadowInnerIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import AlignItems from "../alignment/AlignItems";
import RadixDialog from "../radix/RadixDialog";

export default function UniversalNav(props: UniversalNavProps) {
  const router = useRouter();
  const [user] = useAuthState(auth);

  // const [userData,loadingUserData] = useDocument(doc(db, `users/${user && user.uid}`))

  const [hide, setHide] = useState(props.showInitially ? false : true);
  const [hideDelay, setHideDelay] = useState(
    props.showInitially ? false : true
  );
  const [hideScrollUp, setHideScrollUp] = useState(
    props.showInitially ? true : false
  );
  const [dynamicSize, setDynamicSize] = useState(props.minSize);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!props.showInitially) {
        currentScrollY < 70 ? setHide(true) : setHide(false);
      }
      if (props.scrollPop) {
        currentScrollY < 800 ? setHideScrollUp(true) : setHideScrollUp(false);
        currentScrollY < 800
          ? setDynamicSize(props.minSize)
          : setDynamicSize(props.maxSize);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hide]);

  useEffect(() => {
    hide
      ? setTimeout(() => setHideDelay(true), 500)
      : setTimeout(() => setHideDelay(false), 500);
    if (props.popOnMount) {
      setDynamicSize(props.minSize);
      if (props.mount) {
        setDynamicSize(props.maxSize);
      }
    }
  });

  useEffect(() => {
    const down = (e) => {
      if (e.key === "u" && e.metaKey) {
        router.push("/profile");
      }
      if (e.key === "m" && e.metaKey) {
        router.push("/");
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const [userData, loadingUserData] = useDocument(
    doc(db, `users/${user && user.uid}`)
  );
  const [upgradable, setUpgradable] = useState(null);
  useEffect(() => {
    if (user && userData) {
      let postCount = userData.data().postCount;
      let reviewCount = userData.data().reviewCount;
      if (checkLevel(postCount, reviewCount) !== userData.data().level) {
        setUpgradable(checkLevel(postCount, reviewCount));
      }
    }
  }, [userData]);

  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <>
      {!hideDelay && (
        <NavContainerStyled hide={hide}>
          <NavStyled
            animate={
              upgradable
                ? router.asPath !== "/profile" && "shine"
                : props.animate
            }
            size={dynamicSize}
          >
            <NavContentStyled>
              {props.dynamicButton}
              {!hideScrollUp && (
                <Button
                  size={"small"}
                  styleType={"transparent"}
                  icon={<ArrowUpIcon />}
                  onClick={() => {
                    scroll.scrollToTop();
                  }}
                >
                  {tBUTTON.TOP}
                </Button>
              )}
              <RadixDialog
                title={tLABEL.MENU}
                trigger={
                  <Button
                    size={"small"}
                    styleType={"transparent"}
                    icon={<HamburgerMenuIcon />}
                  />
                }
              >
                <>
                  <ProfileContainer upgradable={upgradable ? true : false} />
                  <SectionButton icon={<HomeIcon />}>
                    {tROUTE.MAIN}
                  </SectionButton>
                  <SectionButton slug={"news"} icon={<BookmarkIcon />}>
                    {tROUTE.NEWS}
                  </SectionButton>
                  <SectionButton slug={"levels"} icon={<IdCardIcon />}>
                    {tROUTE.CARD}
                  </SectionButton>
                  <SectionButton slug={"design"} icon={<FrameIcon />}>
                    {tROUTE.DESIGN}
                  </SectionButton>
                  <SectionButton slug={"links"} icon={<InfoCircledIcon />}>
                    {tROUTE.LINKS}
                  </SectionButton>
                  <AlignItems justifyContent={"end"}>
                    <Button
                      icon={<ShadowInnerIcon />}
                      onClick={toggleTheme}
                      backTapSound={theme}
                    >
                      {tBUTTON.THEME}
                    </Button>
                  </AlignItems>
                </>
              </RadixDialog>
            </NavContentStyled>
          </NavStyled>
        </NavContainerStyled>
      )}
    </>
  );
}
const expandAni = keyframes({
  "10%": {
    width: "260px",
    transform: "scale(1.05)",
  },
  "50%": {
    transform: "scale(0.80)",
  },
});

const jiggleAni = keyframes({
  "10%, 90%": {
    transform: "translate3d(-1px, 0, 0)",
  },
  "20%, 80%": {
    transform: "translate3d(2px, 0, 0)",
  },
  "30%, 50%, 70%": {
    transform: "translate3d(-4px, 0, 0)",
  },
  "40%, 60%": {
    transform: "translate3d(4px, 0, 0)",
  },
});
const hideAni = keyframes({
  "40%": {
    transform: "translate3d(0, -15px, 0) scale(1.01)",
  },
  "100%": {
    transform: "translate3d(0, 80px, 0) scale(0.5)",
  },
});
const showAni = keyframes({
  "0%": {
    transform: "translate3d(0, 80px, 0) scale(0.5)",
  },
  "40%": {
    transform: "translate3d(0, -15px, 0) scale(1.01)",
  },
  "100%": {
    transform: "translate3d(0, 0px, 0)",
  },
});

const scaleUpAni = keyframes({
  "50%": {
    transform: "scale(1.05)",
  },
});

const NavContainerStyled = styled("nav", {
  position: "sticky",
  userSelect: "none",
  bottom: "$medium",
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  variants: {
    hide: {
      true: {
        animation: `${hideAni} 0.5s`,
      },
      false: {
        animation: `${showAni} 0.5s`,
      },
    },
  },
});

const NavStyled = styled("section", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "$small",

  maxHeight: "45px",
  maxWidth: "300px",
  padding: "calc($small*0.25)",
  borderRadius: "$round",
  border: "1px solid $grayA4",

  backgroundColor: "$gray1",
  boxShadow: "$shadow3",
  transition: "$speed1",

  variants: {
    size: {
      xl: {
        width: "250px",
      },
      l: {
        width: "200px",
      },
      m: {
        width: "150px",
      },
      s: {
        width: "100px",
      },
    },
    animate: {
      expand: {
        animation: `${expandAni} 0.3s linear`,
      },
      jiggle: {
        animation: `${jiggleAni} 0.8s linear infinite`,
      },
      shine: {
        background: "linear-gradient(45deg,$gray7 0%,$gray1 50%,$gray7 100%)",
        backgroundSize: "200% 200%",
        animation: `${gradient} 1s linear infinite`,
      },
      scaleUp: {
        animation: `${scaleUpAni} 1s ease infinite`,
      },
    },
  },
});

const NavContentStyled = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "$small",
  background: "linear-gradient($gray2,$gray3)",
  width: "100%",
  borderRadius: "$round",
});

interface UniversalNavProps {
  showInitially: boolean;
  scrollPop: boolean;
  popOnMount: boolean;
  mount?: any;
  animate?: any;
  minSize?: "s" | "xl" | "l" | "m";
  maxSize?: "s" | "xl" | "l" | "m";
  dynamicButton?: JSX.Element | JSX.Element[];
}
