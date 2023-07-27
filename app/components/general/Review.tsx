import React from "react";
import Align from "./Align";
import UserLevelBadge from "../badge/UserLevelBadge";
import { RatingType, ReviewFormTypes } from "../create/CreateReview";

const ReviewRating: React.FC<{ rating: RatingType; text: string }> = ({
  rating,
  text,
}) => (
  <Align>
    <h2 className={`m-0 pr-2`}>{rating}</h2>
    <p>/10：{text}</p>
  </Align>
);

interface ReviewDataProps extends ReviewFormTypes {
  id: string;
}

const Review: React.FC<ReviewDataProps> = ({
  title,
  description,
  access,
  service,
  maintenance,
  created,
  modified,
}) => {
  return (
    <button
      className={`
        cursor-pointer h-fit w-full
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
    >
      <Align className={`justify-between`}>
        <div>
          <Align className={`justify-between`}>
            <h3>{title}</h3>
            <UserLevelBadge level={1} />
          </Align>
          <p>{description}</p>
          <time>{created}</time>
          <time>{modified}</time>
        </div>
        <div className={`grid gap-1`}>
          <ReviewRating rating={access} text={"最寄駅のアクセス"} />
          <ReviewRating rating={service} text={"接客・サービス・設備"} />
          <ReviewRating rating={maintenance} text={"設備管理の状況"} />
        </div>
      </Align>
    </button>
  );
};

export default Review;
