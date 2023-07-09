import { useRouter } from "next/router";
import React from "react";
import { styled } from "../../stitches.config";
import AlignItems from "../alignment/Align";
import Grid from "../alignment/Grid";
import Button from "../component/button/Button";
import ProfileImage from "./ProfileImage";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { gradient } from "../ux/keyframes";
import { EnterIcon } from "@radix-ui/react-icons";

const ProfileCardStyled = styled("div", {
  cursor: "pointer",
  borderRadius: "$r3",
  padding: "calc($small*0.25)",
  margin: "$medium 0",

  height: "auto",
  transition: "$speed1",
  h4: {
    margin: 0,
  },
  p: {
    margin: "0",
    fontSize: "$8",
    color: "$gray10",
  },
  h5: {
    margin: 0,
    fontWeight: "normal",
  },
  variants: {
    upgradable: {
      true: {
        border: "1px solid $gray3",
        background: "linear-gradient(45deg,$gray7 0%,$gray1 50%,$gray7 100%)",
        backgroundSize: "200% 200%",
        animation: `${gradient} linear 1s infinite`,
      },
      false: {
        border: "1px solid $gray3",
        backgroundColor: "$gray2",
      },
    },
  },
});

const ProfileCardContentStyled = styled("div", {
  backdropFilter: "blur(20px)",
  backgroundColor: "$gray1",
  border: "1px solid $gray4",
  borderRadius: "calc($r3*0.8)",
  padding: "$large",
  transition: "$speed1",
  "&:hover": {
    boxShadow: "$shadow1",
  },
});

export default function ProfileContainer({
  upgradable,
}: {
  upgradable: boolean;
}) {
  const router = useRouter();


  console.log(user);

  return (
  );
}
