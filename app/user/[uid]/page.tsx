import React from "react";
import getUser from "../../util/getUser";
import PlaceMasonryGrid from "../../components/grid/PlaceMasonryGrid";
import UserCard, { UserDataTypes } from "./UserCard";

export default async function UserPage({
  params,
}: {
  params: { uid: string };
}) {
  const userData: UserDataTypes = await getUser(params.uid);
  const { name, reviews, places } = userData;
  return (
    <div className={`px-10 py-5`}>
      <h1>Profile</h1>
      <UserCard data={userData} />

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
