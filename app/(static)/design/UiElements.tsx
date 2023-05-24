"use client";
import React, { useState } from "react";
import Container from "../../../components/general/Container";
import Toggle from "../../../components/input/Toggle";
import HorizontalRadio from "../../../components/input/HorizontalRadio";
import Button from "../../../components/button/Button";
import RadixDialog from "../../../components/radix/RadixDialog";
import { EyeOpenIcon } from "@radix-ui/react-icons";

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
      <Container>
        <Toggle
          state={binaryToggle}
          onClick={() => setBinaryToggle(!binaryToggle)}
        />
      </Container>

      <Container className={`flex justify-center`}>
        <HorizontalRadio
          options={options}
          onChange={(option: any) => setSizeSelect(option.value)}
        />
      </Container>

      <Container className={`flex justify-center`}>
        <RadixDialog
          title={"Hello World"}
          trigger={<Button icon={<EyeOpenIcon />}>Open Dialog</Button>}
        >
          <h1>bruh</h1>
        </RadixDialog>
      </Container>

      {/* <Container>
        <AlignItems justifyContent={"center"}>
          <CategoryInput state={categoryInput} setState={setCategoryInput} />
        </AlignItems>
      </Container> */}
    </>
  );
};

export default UiElements;
