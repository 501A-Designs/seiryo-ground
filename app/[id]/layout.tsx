import AlignItems from "../../lib/alignment/Align";

const PlacePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <AlignItems></AlignItems>
      {children}
    </section>
  );
};

export default PlacePageLayout;
