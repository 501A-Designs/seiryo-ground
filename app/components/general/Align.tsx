import React from "react";

interface AlignProps extends React.HTMLAttributes<HTMLDivElement> {}

const Align: React.FC<AlignProps> = ({ className, ...props }) => {
  return (
    <div className={`flex w-100 items-center ${className}`} {...props}>
      {props.children}
    </div>
  );
};

export default Align;
