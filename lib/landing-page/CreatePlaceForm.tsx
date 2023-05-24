import React, { useState } from "react";
import AlignItems from "../alignment/Align";
import Button from "../component/button/Button";
import TypeButton from "../component/input/CategoryInput";
import TextArea from "../TextArea";
import TextInput from "../component/input/TextInput";

import { db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import Grid from "../alignment/Grid";
import CheckBox from "../component/input/Checkbox";
import FlipThrough from "../component/FlipThrough";

import useSound from "use-sound";
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  PaperPlaneIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import LoadingBar from "react-top-loading-bar";

// RADIX
import RadixDialog from "../component/radix/Dialog";
import RadixSelect from "../component/radix/Select";
import Container from "../component/Container";
import { Category, Cost, Size } from "../util/types";

// INPUTS
import RadioInput from "../component/input/RadioInput";
import ToggleInput from "../component/input/ToggleInput";
import useLocale from "../util/useLocale";
import CategoryInput from "../component/input/CategoryInput";
import PaymentInput from "../component/input/Checkbox";
import { paymentOptions } from "../component/button/buttonData";

export default function CreatePlaceForm(props) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  const { t } = useLocale();
  const tLABEL = t.LABEL;
  const tINPUT = t.INPUT;
  const tBUTTON = t.BUTTON;

  let user = props.user;

  const [action1] = useSound("/sound/action-1-sg.mp3", { playbackRate: 1.5 });
  const [celebrate1] = useSound("/sound/celebrate-1-sg.mp3", {
    playbackRate: 1.1,
  });
  const [load1] = useSound("/sound/load-1-sg.mp3");

  const [placeTitle, setPlaceTitle] = useState<String>("");
  const [placeDescription, setPlaceDescription] = useState<String>("");
  const [placeIso, setPlaceIso] = useState<String>("");
  const [placeWebsite, setPlaceWebsite] = useState<String>("");
  const [placeCategory, setPlaceCategory] = useState<Category>("g");

  const [placeRestroom, setPlaceRestroom] = useState<Boolean>(false);

  const [placePayment, setPlacePayment] = useState({});

  const [published, setPublished] = useState(false);
  const [newPlace, setNewPlace] = useState(null);
  const [section, setSection] = useState(1);

  // const createNewPlace = async () => {
  //   setSection(0);
  //   setProgress(70);

  //   if (user) {
  //     const docRef = await addDoc(collection(db, "places"), {
  //       name: title,
  //       prefecture: prefectureInput,
  //       description: descriptionInput,
  //       authorUid: user.uid,
  //       size: sizeSelect,
  //       toilet: binaryToggle,
  //       type: typeInput,
  //       cost: costCheckBox,
  //       officialSite: officialSiteInput,
  //       averageRating: {
  //         access: 0,
  //         date: 0,
  //         management: 0,
  //       },
  //       likes: [],
  //     });
  //     setProgress(80);
  //     await updateDoc(doc(db, `users/${user.uid}`), {
  //       postCount: increment(1),
  //     });
  //     setNewPlace(docRef);
  //     setPublished(true);

  //     setTitle("");
  //     setDescriptionInput("");
  //     setPrefectureInput(null);
  //     setOfficialSiteInput("");
  //     setSizeSelect("m");
  //     setBinaryToggle(true);
  //     setTypeInput("green");
  //     setCostCheckBox(["無料"]);
  //     setSection(1);

  //     setProgress(100);
  //     celebrate1();
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { placeTitle };
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        console.log("something went wrong");
      } else {
        resetForm();
        console.log("form submitted successfully !!!");
      }
    } catch (error) {
      console.log("there was an error submitting", error);
    }
  };

  const resetForm = () => {
    setPlaceTitle("");
  };

  // <Container type="standard">
  //   <p>※よく内容を確認した上で公開してください。一度公開すると<Link href="/levels">Level 3 Contributor</Link>になるまでは編集することできないのでご了承ください。また、記入された内容は清涼広場の利用規約に反していないものであるようお願い致します。</p>
  // </Container>

  return (
    <RadixDialog
      title={
        (section == 1 && tLABEL.NEW) ||
        (section == 2 && tLABEL.LOCATION) ||
        (section == 3 && tLABEL.SIZE) ||
        (section == 4 && tLABEL.TOILET) ||
        (section == 5 && tLABEL.CATEGORY) ||
        (section == 6 && tLABEL.PAYMENT)
      }
      trigger={
        <Button size={"small"} styleType={"transparent"} icon={<PlusIcon />} />
      }
    >
      <LoadingBar
        color={"gray"}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Grid gap={"medium"}>
        {published ? (
          <>
            <AlignItems justifyContent={"center"} flexDirection={"column"}>
              <h3>清涼広場への貢献ありがとうございます。</h3>
              <p>追加されました場所は以下からアクセスできます</p>
            </AlignItems>
            <AlignItems justifyContent={"center"}>
              <Button
                icon={<MagnifyingGlassIcon />}
                onClick={() => router.push(`/place/${newPlace?.id}/`)}
              >
                追加した場所のページを閲覧
              </Button>
              <Button
                icon={<PlusIcon />}
                onClick={() => {
                  action1();
                  setPublished(false);
                }}
              >
                {tBUTTON.NEW_AGAIN}
              </Button>
            </AlignItems>
          </>
        ) : (
          <>
            {section == 1 && (
              <>
                <Grid gap={"extraSmall"}>
                  <TextInput
                    placeholder={tINPUT.PLACE_NAME}
                    value={placeTitle}
                    onChange={(e) => setPlaceTitle(e.target.value)}
                  />

                  <TextArea
                    placeholder={tINPUT.PLACE_DESCRIPTION}
                    value={placeDescription}
                    onChange={(e) => setPlaceDescription(e.target.value)}
                  />
                  <TextInput
                    placeholder={tINPUT.PLACE_SITE}
                    value={placeWebsite}
                    onChange={(e) => setPlaceWebsite(e.target.value)}
                  />
                </Grid>
                {placeTitle && placeDescription && (
                  <AlignItems justifyContent={"center"}>
                    <Button
                      icon={<ArrowRightIcon />}
                      onClick={() => {
                        setSection(2);
                        setProgress(10);
                      }}
                    >
                      {tBUTTON.FORWARD}
                    </Button>
                  </AlignItems>
                )}
              </>
            )}
            {section == 2 && (
              <FlipThrough
                leftClick={() => {
                  setSection(1);
                  setProgress(1);
                }}
                rightClick={() => {
                  setSection(4);
                  setProgress(20);
                }}
                currentSection={section}
              >
                <Container>
                  <AlignItems justifyContent={"center"}>
                    <RadixSelect
                      placeholder={"選択"}
                      value={placeIso}
                      onValueChange={setPlaceIso}
                    >
                      {props.prefecD.map((obj) => {
                        return (
                          <RadixSelect.Item
                            key={obj.iso}
                            value={obj.prefecture_kanji}
                          >
                            {obj.prefecture_kanji}
                          </RadixSelect.Item>
                        );
                      })}
                    </RadixSelect>
                  </AlignItems>
                </Container>
              </FlipThrough>
            )}

            {/* {section == 3 && (
              <FlipThrough
                leftClick={() => {
                  setSection(2);
                  setProgress(10);
                }}
                rightClick={() => {
                  setSection(4);
                  setProgress(30);
                }}
                currentSection={section}
              >
                <RadioInput
                  state={sizeSelect}
                  handleChange={(val: Size) => setSizeSelect(val)}
                />
              </FlipThrough>
            )} */}

            {section == 4 && (
              <FlipThrough
                leftClick={() => {
                  setSection(3);
                  setProgress(20);
                }}
                rightClick={() => {
                  setSection(5);
                  setProgress(40);
                }}
                currentSection={section}
              >
                <ToggleInput
                  state={placeRestroom}
                  onClick={() => setPlaceRestroom(!placeRestroom)}
                />
              </FlipThrough>
            )}

            {section == 5 && (
              <FlipThrough
                leftClick={() => {
                  setSection(4);
                  setProgress(30);
                }}
                rightClick={() => {
                  setSection(6);
                  setProgress(50);
                }}
                currentSection={section}
              >
                <AlignItems justifyContent={"center"}>
                  <CategoryInput
                    handleChange={(val: Category) => setPlaceCategory(val)}
                  />
                </AlignItems>
              </FlipThrough>
            )}

            {section == 6 && (
              <FlipThrough
                leftClick={() => {
                  setSection(5);
                  setProgress(40);
                }}
                publish={
                  <Button
                    styleType={"black"}
                    icon={<PaperPlaneIcon />}
                    overRideSound={() => load1()}
                    onClick={() => handleSubmit()}
                  >
                    {tBUTTON.PUBLISH}
                  </Button>
                }
              >
                <AlignItems justifyContent={"center"}>
                  {/* <PaymentInput
                    options={paymentOptions}
                    onChange={setPlacePayment}
                  /> */}
                </AlignItems>
              </FlipThrough>
            )}
          </>
        )}
      </Grid>
    </RadixDialog>
  );
}
