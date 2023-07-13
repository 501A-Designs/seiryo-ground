import Place, { PlaceDataProps } from "./Place";

async function getData() {
  const res = await fetch("http://localhost:3000/api/place");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const PlaceContainer = async () => {
  const data = await getData();
  console.log(data);
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
      {data.map(
        ({
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
        }: PlaceDataProps) => (
          <Place
            id={id}
            title={title}
            description={description}
            category={category}
            iso={iso}
            website={website}
            restroom={restroom}
            parking={parking}
            cash={cash}
            credit={credit}
            digital={digital}
            created={created}
            modified={modified}
          />
        )
      )}
    </div>
  );
};

export default PlaceContainer;
