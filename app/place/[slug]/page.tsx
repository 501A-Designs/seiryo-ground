import React from "react";

export default function page() {
  return <div>page</div>;
}

// export async function getServerSideProps({ params }) {
//   const placeInfoDocSnap = await getDoc(doc(db, `places/${params.slug}`));
//   const reviewsDataArray = [];
//   const reviewsSnap = await getDocs(
//     collection(db, `places/${params.slug}/reviews/`)
//   );
//   const locationDataSnap = jsonParse(placeInfoDocSnap.data());

//   reviewsSnap.forEach((doc) => {
//     reviewsDataArray.push({
//       id: doc.id,
//       data: doc.data(),
//     });
//   });

//   const reviewsData = jsonParse(reviewsDataArray);
//   return {
//     props: {
//       locationDataSnap,
//       reviewsData,
//     },
//   };
// }
