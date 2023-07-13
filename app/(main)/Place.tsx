"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Align from "../../lib/alignment/Align";
import TypeBadge from "../../components/general/TypeBadge";
import { prefectureOptions } from "../../components/button/label";
import { PlaceTypes } from "../api/place/route";
import moment from "moment";
import Button from "../../components/button/Button";
import { Link1Icon } from "@radix-ui/react-icons";

export interface PlaceDataProps extends PlaceTypes {
  id: string;
}

const Place: React.FC<PlaceDataProps> = ({
  id,
  title,
  description,
  category,
  iso,
  website,
  restroom,
  parking,
  cash,
  credit,
  digital,
  created,
  modified,
}) => {
  const router = useRouter();

  return (
    <div
      key={id}
      className={`
        cursor-pointer h-fit
        p-4 rounded-lg 
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
      <Align className={`justify-between`}>
        <Align className={`gap-2`}>
          <TypeBadge size={"small"} category={category} />
          <h5 className={`m-0`}>{title}</h5>
        </Align>
        {website && (
          <Button
            icon={<Link1Icon />}
            intent={"transparent"}
            size={"small"}
            onClick={() => router.push(website)}
          />
        )}
      </Align>
      <p>{description}</p>
      <Align className={`justify-between`}>
        <Align>
          <time className={`text-responsive-500 text-xs`}>
            {moment(created).format("LL")}
          </time>
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
