import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Align from "../components/general/Align";

const RelatedLink = (props) => (
  <Link {...props}>
    <Align className={`gap-0.5`}>{props.children}</Align>
  </Link>
);

const PlacePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={`px-10`}>
      <div className={`pt-5`}>{children}</div>
      <Align className={`gap-4 bottom-0 absolute`}>
        <RelatedLink href={"/place"}>
          <MagnifyingGlassIcon />
          もっと探す
        </RelatedLink>
        <RelatedLink href={"/review"}>
          <MagnifyingGlassIcon />
          レビューから探す
        </RelatedLink>
      </Align>
    </section>
  );
};

export default PlacePageLayout;
