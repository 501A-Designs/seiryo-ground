"use client";
import React, { FormEvent, useState } from "react";
import RadixDialog from "../../components/radix/Dialog";
import Button from "../../components/button/Button";
import { PlusIcon } from "@radix-ui/react-icons";
import { PlaceTypes } from "../api/place/route";
import CategoryInput from "../../components/input/CategoryInput";
import Align from "../../lib/alignment/Align";
import Toggle from "../../components/input/Toggle";
import FilterSelect from "../../components/input/FilterSelect";
import Checkbox from "../../components/input/Checkbox";
import {
  paymentOptionsLabel,
  prefectureOptions,
} from "../../components/button/label";
import { now } from "moment";

export default function CreatePlace() {
  const [place, setPlace] = useState<PlaceTypes>({
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
    console.log(JSON.stringify(place));
    // const { name, email, message } = data;

    // Send data to API route
    const res = await fetch("http://localhost:3000/api/place", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    });

    // const result = await res.json();
    // console.log(result);

    // router.push(`/`);
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
            />
            <input
              type="text"
              placeholder="公式サイトURL"
              className={`input-text-outline`}
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
