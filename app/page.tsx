import TypeBadge from "../components/general/TypeBadge";

const Page = () => {
  return (
    <div className={`px-10`}>
      <h1>Explore</h1>
      <div
        className={`
          grid grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-4
        `}
      >
        {/* {reviews.map((review, i) => (
          <div
            key={i}
            className={`
            h-${(i % 4) + 1} 
            col-span-1 
            sm:col-span-${i % 4 < 2 ? 1 : 2}
          `}
          >
            <Image
            src={imageUrl} 
            alt="" 
            className={`w-full h-full object-cover`}
          />
          </div>
        ))} */}
      </div>
      <TypeBadge size={"small"} type={"blue"} />
      <h1>Explore</h1>
      <h1>Explore</h1>
    </div>
  );
};

export default Page;
