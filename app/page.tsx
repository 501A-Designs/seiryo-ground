import Align from "../lib/alignment/Align";
import { useState } from "react";
import HorizontalRadio, {
  HorizontalRadioOptionType,
} from "../components/input/HorizontalRadio";
import PlaceContainer from "./(main)/PlaceContainer";
import CreatePlace from "./(main)/CreatePlace";

// const readDB = async () => {
//   try {
//     const response = await fetch("/api/place", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(await response.json());
//     // setApiResponse(await response.json());
//   } catch (error) {
//     console.log(error);
//   }
// };

const Page = () => {
  // const [postType, setPostType] = useState("place");

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
          {/* <HorizontalRadio
            options={postTypeOptions}
            onChange={(option: any) => setPostType(option.value)}
          /> */}
        </div>
        <CreatePlace />
      </Align>
      <PlaceContainer />
    </div>
  );
};

export default Page;
