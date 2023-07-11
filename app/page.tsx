"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import Button from "../components/button/Button";
import TypeBadge from "../components/general/TypeBadge";
import RadixDialog from "../components/radix/Dialog";
import Align from "../lib/alignment/Align";
import Toggle from "../components/input/Toggle";
import HorizontalRadio from "../components/input/HorizontalRadio";
import { PlaceForm } from "./api/place/route";
import { useState } from "react";
import CategoryInput from "../components/input/CategoryInput";

const Page = () => {
  const [place, setPlace] = useState<PlaceForm>({
    title: "",
    description: "",
    website: "",
    category: "green",

    restroom: false,
    parking: false,

    cash: false,
    credit: false,
    digital: false,
  });

  return (
    <div className={`px-10`}>
      <Align className={`justify-between`}>
        <h1>Explore</h1>
        <RadixDialog
          title={"新しい場所を追加"}
          trigger={<Button icon={<PlusIcon />}>新規作成</Button>}
          size={"large"}
        >
          <form
            className={`
              grid gap-1 grid-cols-3
            `}
          >
            <div className={`grid gap-1 h-fit`}>
              <input
                type="text"
                placeholder="場所名"
                className={`input-text`}
              />
              <textarea
                placeholder="概要・ちょっとした説明"
                className={`input-text resize-none`}
                rows={9}
              />
              <input
                type="text"
                placeholder="公式サイトURL"
                className={`input-text`}
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
                <Align className={`justify-between`}>
                  <h6>都道府県</h6>
                </Align>
                {/* <HorizontalRadio
                  options={options}
                  onChange={(option: any) => setPlace({
                    option.value
                  })}
                /> */}
              </div>
            </div>
          </form>
          <Align className={`justify-center mt-4`}>
            <Button icon={<PlusIcon />} type={"submit"}>
              場所を追加
            </Button>
          </Align>
        </RadixDialog>
      </Align>
      <div
        className={`
          grid grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-4
        `}
      >
        {/* {reviews.map((review, i) => (
          <div
            key={i}
            className={`
            h-${(i % 4) + 1} 
            col-span-1 
            sm:col-span-${i % 4 < 2 ? 1 : 2}
          `}
          >
            <Image
            src={imageUrl} 
            alt="" 
            className={`w-full h-full object-cover`}
          />
          </div>
        ))} */}
      </div>
      <TypeBadge size={"small"} type={"blue"} />
      <h1>Explore</h1>
      <h1>Explore</h1>
    </div>
  );
};

export default Page;
