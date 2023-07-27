import React from "react";
import useSound from "use-sound";
import Align from "../general/Align";

interface RateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  field: string;
  state: any;
  setState: any;
}

const RateInput: React.FC<RateInputProps> = ({
  text,
  field,
  state,
  setState,
  ...props
}) => {
  const [tap3] = useSound("/sound/tap-3-sg.mp3");

  return (
    <Align className={`container outlined gap-2`}>
      <h1 className={`text-center w-7`}>{state[field]}</h1>
      <input
        type={"range"}
        value={state[field]}
        onChange={(e) =>
          setState({
            ...state,
            [field]: e.target.value,
          })
        }
        onChangeCapture={() => tap3()}
        {...props}
      />
      <p className={`text-center`}>{text}</p>
    </Align>
  );
};

export default RateInput;
