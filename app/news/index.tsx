import React from "react";
import { useRouter } from "next/router";
import { createClient } from "contentful";
import NewsThumbnail from "../../lib/component/NewsThumbNail";
import Button from "../../lib/component/button/Button";
import AlignItems from "../../lib/alignment/Align";
import MainBody from "../../lib/alignment/Margin";
import Grid from "../../lib/alignment/Grid";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
  });
  const res = await client.getEntries({
    content_type: "sgPage",
  });
  return {
    props: {
      sgPosts: res.items,
    },
  };
}

export default function News({ sgPosts }) {
  return (
    <MainBody>
      <AlignItems justifyContent={"center"} flexDirection={"column"}>
        <h3>SEIRYO NEWS</h3>
      </AlignItems>
      <Grid>
        {sgPosts.map((data) => (
          <NewsThumbnail
            key={data.sys.id}
            slug={data.fields.slug}
            title={data.fields.title}
            date={data.fields.date.split("T")[0]}
          />
        ))}
      </Grid>
    </MainBody>
  );
}
