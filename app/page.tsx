"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import Button from "../components/button/Button";
import RadixDialog from "../components/radix/Dialog";
import Align from "../lib/alignment/Align";
import Toggle from "../components/input/Toggle";
import { PlaceTypes } from "./api/place/route";
import { useState } from "react";
import CategoryInput from "../components/input/CategoryInput";
import Checkbox from "../components/input/Checkbox";
import {
  paymentOptionsLabel,
  prefectureOptions,
} from "../components/button/label";
import HorizontalRadio, {
  HorizontalRadioOptionType,
} from "../components/input/HorizontalRadio";
import FilterSelect from "../components/input/FilterSelect";
import Place from "../components/general/Place";

const Page = () => {
  const [postType, setPostType] = useState("place");

  const [place, setPlace] = useState<PlaceTypes>({
    title: "",
    description: "",
    website: "",
    category: "green",
    iso: 0,
    restroom: false,
    parking: false,

    payment: {
      cash: false,
      credit: false,
      digital: false,
    },
  });

  const postTypeOptions: HorizontalRadioOptionType[] = [
    {
      label: "空間",
      value: "place",
    },
    {
      label: "意見",
      value: "review",
    },
    {
      label: "探す",
      value: "search",
    },
  ];

  return (
    <div className={`px-10`}>
      <Align className={`justify-between my-4`}>
        <h1>2023.7.12</h1>
        <div className={`w-full max-w-lg`}>
          <HorizontalRadio
            options={postTypeOptions}
            onChange={(option: any) => setPostType(option.value)}
          />
        </div>
        <RadixDialog
          title={"新しい場所を追加"}
          trigger={<Button icon={<PlusIcon />}>新規作成</Button>}
          size={"large"}
        >
          <form onSubmit={() => console.log(place)}>
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
                    options={place.payment}
                    onChange={(options) => {
                      setPlace((prevPlace) => ({
                        ...prevPlace,
                        payment: {
                          ...prevPlace.payment,
                          ...options,
                        },
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
        <Place
          title="外濠公園"
          category="green"
          iso={2}
          description="住宅街のど真ん中にあり、子供や親御さんが多くいるにぎやかな場所です。緑多めというよりかわ、子供のための公園かな？それでもいい場所。"
        ></Place>
      </div>
    </div>
  );
};

export default Page;
