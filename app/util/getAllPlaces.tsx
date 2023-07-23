export default async function getAllPlaces() {
  try {
    const res = await fetch("http://localhost:3000/api/explore");
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
