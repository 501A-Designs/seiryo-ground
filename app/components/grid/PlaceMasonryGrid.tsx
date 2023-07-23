import Place, { PlaceDataProps } from "../general/Place";

const PlaceMasonryGrid = ({ data }: { data: PlaceDataProps[] }) => {
  return (
    <div
      className={`
        grid grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-1
      `}
    >
      {data.map((data) => (
        <Place
          key={data.id}
          id={data.id}
          title={data.title}
          description={data.description}
          category={data.category}
          iso={data.iso}
          website={data.website}
          restroom={data.restroom}
          parking={data.parking}
          cash={data.cash}
          credit={data.credit}
          digital={data.digital}
          created={data.created}
          modified={data.modified}
        />
      ))}
    </div>
  );
};

export default PlaceMasonryGrid;
