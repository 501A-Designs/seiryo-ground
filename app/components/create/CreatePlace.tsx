"use client";
import React, { FormEvent, useState } from "react";

import { PlusIcon } from "@radix-ui/react-icons";
import Align from "../general/Align";

import { now } from "moment";
import { auth } from "../../../firebase/firebase";
import RadixDialog from "../radix/Dialog";
import Button from "../button/Button";
import CategoryInput from "../input/CategoryInput";
import Toggle from "../input/Toggle";
import FilterSelect from "../input/FilterSelect";
import { paymentOptionsLabel, prefectureOptions } from "../button/label";
import Checkbox from "../input/Checkbox";

export interface PlaceFormTypes {
  title: string;
  description: string;
  iso: number;
  website: string;
  category: "g" | "b" | "o" | "p";

  restroom: boolean;
  parking: boolean;

  cash: boolean;
  credit: boolean;
  digital: boolean;

  created: string;
  modified: string;
}

export default function CreatePlace() {
  const [place, setPlace] = useState<PlaceFormTypes>({
    title: "",
    description: "",
    website: "",
    category: "g",
    iso: 0,
    restroom: false,
    parking: false,

    cash: false,
    credit: false,
    digital: false,

    created: now().toString(),
    modified: now().toString(),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth.currentUser.getIdToken(true).then(async (idToken) => {
      console.log(idToken, place);

      await fetch("http://localhost:3000/api/create-place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(place),
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
      title={"新しい場所を追加"}
      trigger={<Button icon={<PlusIcon />}>新規作成</Button>}
      size={"large"}
    >
      <form onSubmit={handleSubmit}>
        <section
          className={`
            grid gap-1 grid-cols-3
          `}
        >
          <div className={`grid gap-1 h-fit`}>
            <input
              type="text"
              placeholder="場所名"
              className={`input-text-outline`}
              value={place.title}
              onChange={(e) => {
                setPlace({
                  ...place,
                  title: e.target.value,
                });
              }}
            />
            <textarea
              placeholder="概要・ちょっとした説明"
              className={`input-text-outline resize-none`}
              rows={9}
              value={place.description}
              onChange={(e) => {
                setPlace({
                  ...place,
                  description: e.target.value,
                });
              }}
            />
            <input
              type="text"
              placeholder="公式サイトURL"
              className={`input-text-outline`}
              value={place.website}
              onChange={(e) => {
                setPlace({
                  ...place,
                  website: e.target.value,
                });
              }}
            />
          </div>
          <div className={`grid gap-1 h-fit`}>
            <div className={`container outlined`}>
              <CategoryInput
                place={place}
                state={place.category}
                setState={setPlace}
              />
            </div>
            <div className={`container outlined`}>
              <Align className={`justify-between`}>
                <h6>トイレの有無</h6>
                <Toggle
                  state={place.restroom}
                  onClick={() =>
                    setPlace({ ...place, restroom: !place.restroom })
                  }
                />
              </Align>
              <hr />
              <Align className={`justify-between`}>
                <h6>駐車場の有無</h6>
                <Toggle
                  state={place.parking}
                  onClick={() =>
                    setPlace({ ...place, parking: !place.parking })
                  }
                />
              </Align>
            </div>
          </div>
          <div className={`grid gap-1 h-fit`}>
            <div className={`container outlined`}>
              <FilterSelect
                options={prefectureOptions}
                state={place.iso}
                setState={(value) => {
                  setPlace({
                    ...place,
                    iso: value,
                  });
                }}
              />
            </div>
            <div className={`container outlined`}>
              <Checkbox
                labels={paymentOptionsLabel}
                options={{
                  cash: false,
                  credit: false,
                  digital: false,
                }}
                onChange={(options) => {
                  setPlace((prevPlace) => ({
                    ...prevPlace,
                    ...options,
                  }));
                }}
              />
            </div>
          </div>
        </section>
        <Align className={`justify-center mt-4`}>
          <Button icon={<PlusIcon />} type={"submit"}>
            場所を追加
          </Button>
        </Align>
      </form>
    </RadixDialog>
  );
}
