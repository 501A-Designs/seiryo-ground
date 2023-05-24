import { useRouter } from "next/navigation";
import React from "react";
import { HeartIcon, TargetIcon } from "@radix-ui/react-icons";
import Align from "../../lib/alignment/Align";

const Place = (props) => {
  const router = useRouter();
  const data = props?.data;
  const averageRate = data?.averageRating;

  return (
    <div
      key={props.key}
      className={`
        cursor-pointer 
        h-max-content
        p-2
        rounded-md 
        transition duration-300 
        border 
        border-gray-400 
        bg-gray-200 
        hover:z-10 
        hover:bg-gray-300
        grid grid-cols-1 gap-2
      `}
      onClick={() => router.push(`/place/${props.id}/`)}
    >
      <Align>
        <TypeBadge width={"small"} type={data?.type} />
        <h5>{data?.name}</h5>
      </Align>
      <p>{data?.description}</p>
      {/* {reviewsCollection?.docs.length > 0 &&
            <>{reviewsCollection.docs.length + '_'}review | </>
          } */}
      <Align justifyContent={"spaceBetween"}>
        <Align>
          {overallScore > 0 && (
            <>
              <TargetIcon />
              {overallScore}%
            </>
          )}
          {data?.likes?.length > 0 && (
            <>
              <HeartIcon />
              {data?.likes?.length}
            </>
          )}
        </Align>
        <span>{data?.prefecture}</span>
      </Align>
    </div>
  );
};

export default Place;
