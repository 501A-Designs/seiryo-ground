import Align from "./components/general/Align";
import getAllPlaces from "./util/getAllPlaces";
import PlaceMasonryGrid from "./components/grid/PlaceMasonryGrid";
// import HorizontalRadio, {
//   HorizontalRadioOptionType,
// } from "../components/input/HorizontalRadio";
// import Explore from "./components/explore/explore";

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

export default async function MainPage() {
  // const [postType, setPostType] = useState("place");
  // const postTypeOptions: HorizontalRadioOptionType[] = [
  //   {
  //     label: "空間",
  //     value: "place",
  //   },
  //   {
  //     label: "意見",
  //     value: "review",
  //   },
  //   {
  //     label: "探す",
  //     value: "search",
  //   },
  // ];

  const data = await getAllPlaces();

  return (
    <div className={`px-10 py-5`}>
      <PlaceMasonryGrid data={data} />
    </div>
  );
}
