import React from "react";
import getPlace from "../../util/getPlace";
import Align from "../../components/general/Align";
import TypeBadge from "../../components/badge/CategoryBadge";
import Table from "../../components/general/Table";
import Link from "next/link";
import CreateReview from "../../components/create/CreateReview";
import Review from "../../components/general/Review";

export default async function PlacePage({
  params,
}: {
  params: { id: number };
}) {
  const placeData = await getPlace(params.id);
  const {
    title,
    description,
    iso,
    website,
    category,
    restroom,
    parking,
    cash,
    credit,
    digital,
    created,
    modified,
    reviews,
  } = placeData;
  return (
    <section className={`grid grid-cols-6 gap-4`}>
      <div className={`col-span-2 grid gap-1`}>
        <div>
          <Align className={`gap-2`}>
            <TypeBadge category={category} size="large" />
            <h1>{title}</h1>
          </Align>
          <p>{description}</p>
        </div>
        <div className={`container outlined`}>
          <Table>
            <thead>
              <tr>
                <th>基本情報</th>
                <th>概要</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>場所名</td>
                <td>{title}</td>
              </tr>
              <tr>
                <td>住所</td>
                <td>{title}</td>
              </tr>
              <tr>
                <td>ウェブサイトリンク</td>
                <td>
                  <p>
                    <Link href={website}>{website}</Link>
                  </p>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className={`container outlined`}>
          <Table>
            <thead>
              <tr>
                <th>施設</th>
                <th>有・無</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>トイレ</td>
                <td>
                  <Table.Check checked={restroom} />
                </td>
              </tr>
              <tr>
                <td>駐車場</td>
                <td>
                  <Table.Check checked={parking} />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className={`container outlined`}>
          <Table>
            <thead>
              <tr>
                <th>支払い方法</th>
                <th>有・無</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>現金</td>
                <td>
                  <Table.Check checked={cash} />
                </td>
              </tr>
              <tr>
                <td>クレジット</td>
                <td>
                  <Table.Check checked={credit} />
                </td>
              </tr>
              <tr>
                <td>電子マネー</td>
                <td>
                  <Table.Check checked={digital} />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <p>
          作成日時：{created}
          <br />
          編集日時：{modified}
        </p>
      </div>
      <div className={`col-span-4`}>
        <Align className={`justify-between`}>
          <h5>Reviews</h5>
          <CreateReview />
        </Align>
        <Review
          id={"1"}
          title={"TEST"}
          description="this is a test to see whether everything is working or not."
          access={4}
          service={4}
          maintenance={4}
          created={"date here"}
          modified={"date here"}
        />
      </div>
    </section>
  );
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
