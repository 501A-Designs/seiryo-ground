import useSound from "use-sound";
import { styled } from "../../../stitches.config";
import { VariantProps } from "@stitches/react";

interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof TextInputStyled> {}

export default function TextInput(props: TextInputProps) {
  const [tap3] = useSound("/sound/tap-3-sg.mp3", { playbackRate: 1.1 });

  return <TextInputStyled type={"text"} onKeyDown={() => tap3()} {...props} />;
}

const TextInputStyled = styled("input", {
  fontSize: "$8",
  padding: "$medium",
  outline: "none",
  borderRadius: "$r2",
  backgroundColor: "$gray3",
  border: "1px solid $gray4",
  userSelect: "none",
  transition: "$speed2",
  "&:focus": {
    backgroundColor: "$gray1",
    borderColor: "$gray5",
  },
});
