import { styled } from "../../../stitches.config";

const FooterEffects = styled("footer", {
  position: "sticky",
  bottom: "0",
  width: "100%",
  height: "100px",
  opacity: "0.95",
  zIndex: "10",
  variants: {
    type: {
      blur: {
        backdropFilter: "blur(10px)",
        maskImage: "linear-gradient(transparent, black 60%)",
        WebkitMasKImage: "linear-gradient(to top,#000 25%,transparent)",
      },
      opaque: {
        background: "linear-gradient(transparent,white)",
      },
    },
  },
});

export default FooterEffects;
