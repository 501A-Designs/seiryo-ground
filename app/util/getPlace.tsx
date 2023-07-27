// import { PlaceDataProps } from "../components/general/Place";

// export type UserDataProps = {
//   id: string;
//   reviews: any[];
//   places: PlaceDataProps[];
// };

export default async function getPlace(id: number) {
  try {
    const res = await fetch(`http://localhost:3000/api/place?id=${id}`);
    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(errorMessage || "Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
