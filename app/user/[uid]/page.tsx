import React from "react";
import Id from "./id";
import getUser from "../../util/getUser";
import PlaceMasonryGrid from "../../components/grid/PlaceMasonryGrid";

export default async function Profile({ params }: { params: { uid: string } }) {
  const userData = await getUser(params.uid);
  const { reviews, places } = userData;
  return (
    <div className={`px-10 py-5`}>
      <h1>Profile</h1>
      <Id data={userData} />

      {reviews.length != 0 && (
        <section>
          <h4>執筆したレビュー</h4>
          <PlaceMasonryGrid data={places} />
        </section>
      )}

      {places.length != 0 && (
        <section>
          <h4>追加した場所</h4>
          <PlaceMasonryGrid data={places} />
        </section>
      )}
    </div>
  );
}
