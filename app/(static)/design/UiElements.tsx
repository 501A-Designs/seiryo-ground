"use client";
import React, { useState } from "react";
import Toggle from "../../../components/input/Toggle";
import HorizontalRadio from "../../../components/input/HorizontalRadio";
import Button from "../../../components/button/Button";
import RadixDialog from "../../../components/radix/Dialog";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import Align from "../../../lib/alignment/Align";

const UiElements = () => {
  const [binaryToggle, setBinaryToggle] = useState(true);
  const [sizeSelect, setSizeSelect] = useState("sdf");

  const options = [
    {
      title: "sdfsdf",
      ex: "oehods3rrhf",
      label: "a",
      value: "sdf",
    },
    {
      title: "sdfsdf",
      ex: "24",
      label: "b",
      value: "damn",
    },
    {
      title: "sdfsdf",
      ex: "oehorhf",
      label: "c",
      value: "few",
    },
  ];

  return (
    <>
      <div className={`container filled`}>
        <Toggle
          state={binaryToggle}
          onClick={() => setBinaryToggle(!binaryToggle)}
        />
      </div>

      <div className={`container filled flex justify-center`}>
        <HorizontalRadio
          options={options}
          onChange={(option: any) => setSizeSelect(option.value)}
        />
      </div>

      <div className={`container filled flex justify-center`}>
        <RadixDialog
          title={"Hello World"}
          trigger={<Button icon={<EyeOpenIcon />}>Open Dialog</Button>}
        >
          <h1>bruh</h1>
        </RadixDialog>
      </div>

      <div className={`container filled flex justify-center`}>
        <Align className={`justify-center`}>
          {/* <CategoryInput state={categoryInput} setState={setCategoryInput} /> */}
        </Align>
      </div>
    </>
  );
};

export default UiElements;
