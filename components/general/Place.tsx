import { useRouter } from "next/navigation";
import React from "react";
import { HeartIcon, TargetIcon } from "@radix-ui/react-icons";
import Align from "../../lib/alignment/Align";
import TypeBadge from "./TypeBadge";
import { prefectureOptions } from "../button/label";
import { PlaceTypes } from "../../app/api/place/route";

interface PlaceProps extends PlaceTypes {
  id: string;
}

const Place: React.FC<PlaceProps> = ({
  id,
  title,
  description,
  category,
  iso,
}) => {
  const router = useRouter();

  return (
    <div
      key={id}
      className={`
        cursor-pointer h-fit
        p-4 rounded-xl 
        transition-all duration-300 
        border
        border-zinc-300/60
        bg-zinc-100
        hover:bg-zinc-200/50
        dark:border-zinc-700/60
        dark:bg-zinc-900
        hover:dark:bg-zinc-800/50
        grid grid-cols-1 gap-3
      `}
      onClick={() => router.push(`/place/${id}/`)}
    >
      <Align className={`gap-2`}>
        <TypeBadge size={"small"} type={category} />
        <h5 className={`m-0`}>{title}</h5>
      </Align>
      <p>{description}</p>
      <Align className={`justify-between`}>
        <Align>
          {/* {overallScore > 0 && (
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
          )} */}
        </Align>
        <h6 className={`m-0`}>{prefectureOptions[iso - 1].label}</h6>
      </Align>
    </div>
  );
};

export default Place;
