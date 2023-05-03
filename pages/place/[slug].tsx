import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import AlignItems from "../../lib/alignment/AlignItems";
import TypeBadge from "../../lib/TypeBadge";

import { auth, db } from "../../firebase";
import {
  DocumentData,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Rating from "../../lib/Rating";

import LoadingBar from "react-top-loading-bar";
import Review from "../../lib/place-page/Review";

import End from "../../lib/End";

import Button from "../../lib/component/button/Button";
import TypeButton from "../../lib/component/input/CategoryInput";

import moment from "moment";
import "moment/locale/ja";
import DisplayRatingInput from "../../lib/place-page/DisplayRatingInput";
import { isBrowser } from "react-device-detect";

import Head from "next/head";

import Grid from "../../lib/alignment/Grid";
import { costButtonArray } from "../../lib/component/button/buttonData";
import CheckBox from "../../lib/component/input/Checkbox";
import useSound from "use-sound";
import Footer from "../../lib/component/Footer";
import Link from "next/link";
import UniversalNav from "../../lib/component/UniversalNav";

import { jsonParse } from "../../lib/util/jsonParse";
import {
  ArrowLeftIcon,
  AspectRatioIcon,
  CheckIcon,
  ExternalLinkIcon,
  FaceIcon,
  HeartFilledIcon,
  HeartIcon,
  HomeIcon,
  LockClosedIcon,
  Pencil1Icon,
  PlusIcon,
  ReloadIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import Margin from "../../lib/alignment/Margin";
import Header from "../../lib/component/Header";

// RADIX
import RadixDialog from "../../lib/component/radix/Dialog";
import RadixAccordion from "../../lib/component/radix/Accordion";
import { round } from "../../lib/util/helper";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import Tag from "../../lib/component/Tag";

// TYPES
import { Size } from "../../lib/util/types";

// INPUT
import TextInput from "../../lib/component/input/TextInput";
import TextArea from "../../lib/TextArea";
import RadioInput from "../../lib/component/input/CrowdInput";
import ToggleInput from "../../lib/component/input/ToggleInput";
import useLocale from "../../lib/util/useLocale";
import Table from "../../lib/component/general/Table";
import CategoryInput from "../../lib/component/input/CategoryInput";
import PaymentInput from "../../lib/component/input/Checkbox";

export default function PlaceName({ locationDataSnap, reviewsData }) {
  const [user] = useAuthState(auth);
  const [userData] = useDocument<DocumentData>(
    doc(db, `users/${user && user.uid}`)
  );

  const router = useRouter();
  const placeId = router.query.slug;
  const [progress, setProgress] = useState(0);

  const { t } = useLocale();
  const tLABEL = t.LABEL;
  const tINPUT = t.INPUT;
  const tBUTTON = t.BUTTON;

  // Sound
  const [tap1] = useSound("/sound/tap-1-sg.mp3", { playbackRate: 1.1 });
  const [load1] = useSound("/sound/load-1-sg.mp3");
  const [celebrate1] = useSound("/sound/celebrate-1-sg.mp3");
  const [celebrate2] = useSound("/sound/celebrate-2-sg.mp3");

  const [hasReviewed, setHasReviewed] = useState(false);

  const [placeData, setPlaceData] = useState(locationDataSnap);
  const [reviewsCollection, setReviewsCollection] = useState(reviewsData);

  const [averageOfDateRating, setAverageOfDateRating] = useState(0);
  const [averageOfAccessRating, setAverageOfAccessRating] = useState(0);
  const [averageOfManagementRating, setAverageOfManagementRating] = useState(0);

  const [liked, setLiked] = useState(false);

  const [placeInput, setPlaceInput] = useState(
    placeData.name ? placeData.name : ""
  );
  const [descriptionInput, setDescriptionInput] = useState(
    placeData.description ? placeData.description : ""
  );
  const [officialSiteInput, setOfficialSiteInput] = useState(
    placeData?.officialSite ? placeData.officialSite : ""
  );

  const [sizeSelect, setSizeSelect] = useState(
    placeData.size ? placeData.size : "普通"
  );
  const [binaryToggle, setBinaryToggle] = useState(
    placeData.toilet ? placeData.toilet : false
  );
  const [typeInput, setTypeInput] = useState(
    placeData.type ? placeData.type : ""
  );
  const [costCheckBox, setCostCheckBox] = useState(
    placeData.cost ? placeData.cost : ["free"]
  );

  const [currentReviewData, setCurrentReviewData] = useState<any>();
  const [currentPlaceData, setCurrentPlaceData] = useState(locationDataSnap);

  useEffect(() => {
    placeData.likes.map((uid) => {
      if (user && user.uid == uid) {
        setLiked(true);
      }
    });
    reviewsCollection?.forEach((doc) => {
      if (user?.uid === doc.id) {
        setHasReviewed(true);
        setCurrentReviewData(doc.data);
        setTitleRatingInput(doc.data.title);
        setDescriptionRatingInput(doc.data.description);

        setDateRatingInput(doc.data.rating.date);
        setAccessRatingInput(doc.data.rating.access);
        setManagementRatingInput(doc.data.rating.management);
      }
    });
    updateAverageRatings();
  }, [user]);

  const editThisPlace = async () => {
    load1();
    setProgress(10);
    const updatedContent = {
      name: placeInput,
      description: descriptionInput,
      toilet: binaryToggle,
      type: typeInput,
      cost: costCheckBox,
      size: sizeSelect,
      officialSite: officialSiteInput,
    };
    await updateDoc(doc(db, `places/${placeId}`), updatedContent);
    setCurrentPlaceData(updatedContent);
    setPlaceData(updatedContent);
    setProgress(100);
    celebrate1();
  };

  const updateAverageRatings = async () => {
    let arrayOfDateRating = [];
    let arrayOfAccessRating = [];
    let arrayOfManagementRating = [];
    reviewsCollection?.forEach((doc) => {
      arrayOfDateRating.push(doc.data.rating.date);
      arrayOfAccessRating.push(doc.data.rating.access);
      arrayOfManagementRating.push(doc.data.rating.management);
    });
    const averageDate =
      arrayOfDateRating.reduce((sum, element) => sum + element, 0) /
      arrayOfDateRating.length;
    const averageAccess =
      arrayOfAccessRating.reduce((sum, element) => sum + element, 0) /
      arrayOfAccessRating.length;
    const averageManagement =
      arrayOfManagementRating.reduce((sum, element) => sum + element, 0) /
      arrayOfManagementRating.length;
    setAverageOfDateRating(averageDate);
    setAverageOfAccessRating(averageAccess);
    setAverageOfManagementRating(averageManagement);

    if (averageDate && averageAccess && averageManagement && user) {
      await updateDoc(doc(db, `places/${placeId}/`), {
        averageRating: {
          date: averageDate,
          access: averageAccess,
          management: averageManagement,
        },
      });
    }
  };

  const [titleRatingInput, setTitleRatingInput] = useState("");
  const [descriptionRatingInput, setDescriptionRatingInput] = useState("");

  const [dateRatingInput, setDateRatingInput] = useState<number>(0);
  const [accessRatingInput, setAccessRatingInput] = useState<number>(0);
  const [managementRatingInput, setManagementRatingInput] = useState<number>(0);
  let timeNow = moment().format("MMMM Do YYYY, h:mm a");

  const publishReview = async () => {
    load1();
    if (user) {
      await setDoc(
        doc(collection(db, `places/${placeId}/reviews/`), `${user.uid}`),
        {
          title: titleRatingInput,
          description: descriptionRatingInput,
          lastUpdated: timeNow,
          rating: {
            date: dateRatingInput,
            access: accessRatingInput,
            management: managementRatingInput,
          },
        }
      );
      updateAverageRatings();
      await updateDoc(doc(db, `users/${user.uid}`), {
        reviewCount: increment(1),
      });
    }
    celebrate1();
  };

  const updateReview = async () => {
    load1();
    setProgress(10);
    const updatedReviewData = {
      title: titleRatingInput,
      description: descriptionRatingInput,
      lastUpdated: timeNow,
      rating: {
        date: dateRatingInput,
        access: accessRatingInput,
        management: managementRatingInput,
      },
    };
    await updateDoc(
      doc(db, `places/${placeId}/reviews/${user && user.uid}`),
      updatedReviewData
    );
    setCurrentReviewData(updatedReviewData);
    const tempReviewsCollection = [...reviewsCollection];
    const newReviewData = tempReviewsCollection.find(
      (obj) => obj.id === user.uid
    );
    newReviewData.data = updatedReviewData;

    setReviewsCollection(tempReviewsCollection);
    updateAverageRatings();
    setProgress(100);
    celebrate1();
  };

  const addLike = async () => {
    setLiked(true);
    await updateDoc(doc(db, `places/${placeId}/`), {
      likes: arrayUnion(user && user.uid),
    });
    await updateDoc(doc(db, `users/${user && user.uid}/`), {
      likes: arrayUnion(placeId),
    });
  };
  const removeLike = async () => {
    await updateDoc(doc(db, `places/${placeId}/`), {
      likes: arrayRemove(user && user.uid),
    });
    await updateDoc(doc(db, `users/${user && user.uid}/`), {
      likes: arrayRemove(placeId),
    });
    setLiked(false);
  };

  return (
    <>
      <Head>
        <title>{placeData && placeData.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoadingBar
        color={"gray"}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      {user ? (
        <>
          {userData?.data().level > 1 && (
            <Header
              type={"header"}
              title={`Level ${userData?.data().level} ユーザーとして編集可能`}
            >
              <RadixDialog
                title={tLABEL.EDIT}
                size={"large"}
                trigger={
                  <Button styleType={"black"} icon={<Pencil1Icon />}>
                    {tBUTTON.EDIT_PAGE}
                  </Button>
                }
                banner={
                  userData.data().level < 5 && (
                    <AlignItems justifyContent={"center"}>
                      <LockClosedIcon />
                      <p>
                        全ての編集機能をアクセスするにはカードをアップグレードする必要があります。
                      </p>
                    </AlignItems>
                  )
                }
                saveClose={
                  currentPlaceData.name != placeInput ||
                  currentPlaceData.description != descriptionInput ||
                  currentPlaceData.toilet != binaryToggle ||
                  currentPlaceData.type != typeInput ||
                  currentPlaceData.cost != costCheckBox ||
                  currentPlaceData.size != sizeSelect ||
                  currentPlaceData.officialSite != officialSiteInput ? (
                    <Button
                      styleType={"black"}
                      icon={<UpdateIcon />}
                      onClick={() => editThisPlace()}
                    >
                      {tBUTTON.UPDATE_CHANGES}
                    </Button>
                  ) : (
                    false
                  )
                }
              >
                {userData && userData.data() && (
                  <Grid gap={"small"} grid={"oneTwo"}>
                    <Grid gap={"extraSmall"}>
                      <RadixAccordion>
                        {userData.data().level > 1 && (
                          <RadixAccordion.Item
                            number={"1"}
                            name={tLABEL.TOILET}
                          >
                            <ToggleInput
                              state={binaryToggle}
                              onClick={() => setBinaryToggle(!binaryToggle)}
                            />
                          </RadixAccordion.Item>
                        )}
                        {userData.data().level > 3 && (
                          <RadixAccordion.Item
                            number={"2"}
                            name={tLABEL.CATEGORY}
                          >
                            <CategoryInput
                              state={typeInput}
                              setState={setTypeInput}
                            />
                          </RadixAccordion.Item>
                        )}
                        {userData.data().level > 2 && (
                          <>
                            <RadixAccordion.Item
                              number={"3"}
                              name={tLABEL.PAYMENT}
                            >
                              <PaymentInput
                                state={costCheckBox}
                                setState={setCostCheckBox}
                              />
                            </RadixAccordion.Item>
                            <RadixAccordion.Item
                              number={"4"}
                              name={tLABEL.SIZE}
                            >
                              <RadioInput
                                state={sizeSelect}
                                setState={setSizeSelect}
                              />
                            </RadixAccordion.Item>
                          </>
                        )}
                      </RadixAccordion>
                    </Grid>
                    <Grid gap={"extraSmall"}>
                      {userData.data().level > 4 && (
                        <TextInput
                          placeholder={tINPUT.PLACE_NAME}
                          value={placeInput}
                          onChange={(e) => setPlaceInput(e.target.value)}
                        />
                      )}

                      {userData.data().level > 3 && (
                        <TextArea
                          placeholder={tINPUT.PLACE_DESCRIPTION}
                          value={descriptionInput}
                          onChange={(e) => setDescriptionInput(e.target.value)}
                        />
                      )}

                      {userData.data().level > 1 && (
                        <TextInput
                          placeholder={tINPUT.PLACE_SITE}
                          value={officialSiteInput}
                          onChange={(e) => setOfficialSiteInput(e.target.value)}
                        />
                      )}
                    </Grid>
                  </Grid>
                )}
              </RadixDialog>
            </Header>
          )}
        </>
      ) : (
        <Header
          type={"header"}
          title={isBrowser && "ログインされておりません。"}
        >
          {isBrowser ? (
            <Button
              styleType={"black"}
              onClick={() => router.push("/")}
              icon={<HomeIcon />}
            >
              メイン
            </Button>
          ) : (
            <p>
              ※モバイルからのログインは出来ないです。パソコンからアクセスして頂くとログインが可能となります。
            </p>
          )}
        </Header>
      )}

      <Margin>
        <Grid gap={"large"} grid={"twoOne"}>
          <Grid gap={"extraSmall"}>
            <AlignItems>
              <TypeBadge width={"large"} type={placeData.type} />
              <h2>{placeData.name}</h2>
            </AlignItems>
            <p>{placeData.description}</p>

            <Tag title={"基本情報"}>
              {placeData.officialSite && (
                <Tag.Item
                  icon={<ExternalLinkIcon />}
                  name={
                    <Link
                      href={placeData.officialSite}
                      target="_blank"
                      rel="noreferrer"
                    >
                      公式サイト
                    </Link>
                  }
                />
              )}
              <Tag.Item icon={<AspectRatioIcon />} name={placeData.size} />
              <Tag.Item
                icon={<FaceIcon />}
                name={<>トイレ{placeData.toilet ? "有" : "無"}</>}
              />
            </Tag>

            <Tag title={"入場料"}>
              {placeData.cost.map((name) => (
                <Tag.Item key={name} name={name} />
              ))}
            </Tag>

            {reviewsCollection?.map((review) => (
              <Review key={review.id} data={review.data} />
            ))}
            <End>
              {reviewsCollection?.length > 0
                ? t.END_FOOTER.END
                : t.END_FOOTER.NO_REVIEWS}
            </End>
          </Grid>
          <Grid
            gap={"small"}
            css={{
              marginTop: "1.5em",
            }}
          >
            {reviewsData?.length > 0 && (
              <Grid
                css={{
                  marginBottom: "0.5em",
                }}
              >
                <Rating
                  rating={round(
                    (100 *
                      ((averageOfDateRating +
                        averageOfAccessRating +
                        averageOfManagementRating) /
                        3)) /
                      10
                  )}
                  description={"%：" + tLABEL.RATING.OVERALL}
                  hideMax={true}
                />
                <Rating
                  rating={round(averageOfDateRating)}
                  description={tLABEL.RATING.DATE}
                />
                <Rating
                  rating={round(averageOfAccessRating)}
                  description={tLABEL.RATING.ACCESS}
                />
                <Rating
                  rating={round(averageOfManagementRating)}
                  description={tLABEL.RATING.MANAGEMENT}
                />
                <Rating
                  rating={placeData.likes ? placeData.likes.length : 0}
                  description={"いいね数"}
                  hideMax={true}
                />
              </Grid>
            )}

            <Table caption={tLABEL.BASIC_INFO} column={"auto 30px"}>
              <tr>
                <td>{tLABEL.PARKING}</td>
                <td></td>
              </tr>
              <tr>
                <td>{tLABEL.TOILET}</td>
                <td></td>
              </tr>
            </Table>
            <Table caption={tLABEL.PAYMENT} column={"auto 30px"}>
              <tr>
                <td>{tINPUT.PAYMENT.CASH}</td>
                <td></td>
              </tr>
              <tr>
                <td>{tINPUT.PAYMENT.DIGITAL}</td>
                <td></td>
              </tr>
              <tr>
                <td>{tINPUT.PAYMENT.CARD}</td>
                <td></td>
              </tr>
            </Table>
          </Grid>
        </Grid>

        <Footer type={"blur"} />
      </Margin>
      <UniversalNav
        showInitially={true}
        scrollPop={true}
        popOnMount={true}
        mount={userData?.data()?.level > 1 ? true : false}
        minSize={user ? "l" : "s"}
        maxSize={user ? "l" : "m"}
        dynamicButton={
          <>
            <Button
              size={"small"}
              styleType={"transparent"}
              icon={<ArrowLeftIcon />}
              onClick={() => {
                setProgress(10);
                router.back();
                setProgress(100);
              }}
            />
            {user && (
              <>
                <RadixDialog
                  title={hasReviewed ? tBUTTON.UPDATE_CHANGES : tBUTTON.NEW}
                  size={"medium"}
                  trigger={
                    <Button
                      styleType={"transparent"}
                      size={"small"}
                      icon={hasReviewed ? <ReloadIcon /> : <PlusIcon />}
                      title={
                        hasReviewed ? "書いたレビューを編集" : "レビューを書く"
                      }
                    />
                  }
                  saveClose={
                    hasReviewed && currentReviewData ? (
                      currentReviewData?.title != titleRatingInput ||
                      currentReviewData?.description !=
                        descriptionRatingInput ||
                      currentReviewData?.rating.date != dateRatingInput ||
                      currentReviewData?.rating.access != accessRatingInput ||
                      currentReviewData?.rating.management !=
                        managementRatingInput ? (
                        <Button
                          styleType={"black"}
                          icon={<UpdateIcon />}
                          onClick={() => updateReview()}
                        >
                          {tBUTTON.UPDATE_CHANGES}
                        </Button>
                      ) : (
                        false
                      )
                    ) : titleRatingInput && descriptionRatingInput ? (
                      <Button
                        styleType={"black"}
                        icon={<CheckIcon />}
                        onClick={() => publishReview()}
                      >
                        {tBUTTON.PUBLISH}
                      </Button>
                    ) : (
                      false
                    )
                  }
                >
                  <Grid gap={"extraSmall"}>
                    <TextInput
                      value={titleRatingInput}
                      onChange={(e) => setTitleRatingInput(e.target.value)}
                      placeholder={tINPUT.REVIEW_TITLE}
                    />
                    <Grid grid={"tri"} gap={"extraSmall"}>
                      <DisplayRatingInput
                        value={dateRatingInput}
                        onChange={(e) =>
                          setDateRatingInput(parseInt(e.target.value))
                        }
                        maxValue={10}
                        minValue={0}
                        placeholder={tLABEL.RATING.DATE}
                      />
                      <DisplayRatingInput
                        value={accessRatingInput}
                        onChange={(e) =>
                          setAccessRatingInput(parseInt(e.target.value))
                        }
                        maxValue={10}
                        minValue={0}
                        placeholder={tLABEL.RATING.ACCESS}
                      />
                      <DisplayRatingInput
                        value={managementRatingInput}
                        onChange={(e) =>
                          setManagementRatingInput(parseInt(e.target.value))
                        }
                        maxValue={10}
                        minValue={0}
                        placeholder={tLABEL.RATING.MANAGEMENT}
                      />
                    </Grid>
                    <TextArea
                      value={descriptionRatingInput}
                      onChange={(e) =>
                        setDescriptionRatingInput(e.target.value)
                      }
                      placeholder={tINPUT.REVIEW_DESCRIPTION}
                    />
                  </Grid>
                </RadixDialog>

                <Button
                  size={"small"}
                  styleType={liked ? "red" : "transparent"}
                  // css={{animation:liked ? `${popOut} 0.5s`:'none'}}
                  icon={liked ? <HeartFilledIcon /> : <HeartIcon />}
                  overRideSound={() => (!liked ? celebrate2() : tap1())}
                  onClick={() => {
                    liked ? removeLike() : addLike();
                  }}
                />
              </>
            )}
          </>
        }
      />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const placeInfoDocSnap = await getDoc(doc(db, `places/${params.slug}`));
  const reviewsDataArray = [];
  const reviewsSnap = await getDocs(
    collection(db, `places/${params.slug}/reviews/`)
  );
  const locationDataSnap = jsonParse(placeInfoDocSnap.data());

  reviewsSnap.forEach((doc) => {
    reviewsDataArray.push({
      id: doc.id,
      data: doc.data(),
    });
  });

  const reviewsData = jsonParse(reviewsDataArray);
  return {
    props: {
      locationDataSnap,
      reviewsData,
    },
  };
}
