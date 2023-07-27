"use client";
import React, { FormEvent, useState } from "react";

import { PlusIcon } from "@radix-ui/react-icons";
import Align from "../general/Align";

import { now } from "moment";
import { auth } from "../../../firebase/firebase";
import RadixDialog from "../radix/Dialog";
import Button from "../button/Button";
import RateInput from "../input/RateInput";

export type RatingType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export interface ReviewFormTypes {
  title: string;
  description: string;
  access: RatingType;
  service: RatingType;
  maintenance: RatingType;
  created: string;
  modified: string;
}

export default function CreateReview() {
  const [review, setReview] = useState<ReviewFormTypes>({
    title: "",
    description: "",
    access: 0,
    service: 0,
    maintenance: 0,
    created: now().toString(),
    modified: now().toString(),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth.currentUser.getIdToken(true).then(async (idToken) => {
      await fetch("http://localhost:3000/api/create-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(review),
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
    });
  };

  return (
    <RadixDialog
      title={"レビューを追加"}
      trigger={<Button icon={<PlusIcon />}>レビューを追加</Button>}
      size={"medium"}
    >
      <form onSubmit={handleSubmit}>
        <section>
          <div className={`grid gap-1 h-fit`}>
            <input
              type="text"
              placeholder="タイトル"
              className={`input-text-outline`}
              value={review.title}
              onChange={(e) => {
                setReview({
                  ...review,
                  title: e.target.value,
                });
              }}
            />
            <div className={`grid gap-1 grid-cols-3`}>
              <RateInput
                text="最寄からのアクセス"
                min={0}
                max={10}
                field={"access"}
                state={review}
                setState={setReview}
              />
              <RateInput
                text="接客・サービス・設備"
                min={0}
                max={10}
                field={"service"}
                state={review}
                setState={setReview}
              />
              <RateInput
                text="設備管理の状況"
                min={0}
                max={10}
                field={"maintenance"}
                state={review}
                setState={setReview}
              />
            </div>
            <textarea
              placeholder="数字に表せきれないこと・場所についての説明等"
              className={`input-text-outline resize-none`}
              rows={9}
              value={review.description}
              onChange={(e) => {
                setReview({
                  ...review,
                  description: e.target.value,
                });
              }}
            />
          </div>
        </section>
        <Align className={`justify-center mt-4`}>
          <Button icon={<PlusIcon />} type={"submit"}>
            レビューを追加
          </Button>
        </Align>
      </form>
    </RadixDialog>
  );
}
