import { PlaceDataProps } from "../components/general/Place";

export default async function getUser(uid: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/user?uid=${uid}`);
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
