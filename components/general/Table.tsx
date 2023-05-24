import React from "react";
import { VariantProps, cva } from "cva";

const table = cva("table", {
  variants: {
    textAlign: {
      center: ["text-center"],
      right: ["text-right"],
      left: ["text-left"],
    },
  },
  defaultVariants: {
    textAlign: "left",
  },
});

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof table> {
  caption: string;
  head: JSX.Element;
  column?: string;
}

const Table: React.FC<TableProps> = ({
  textAlign,
  caption,
  column,
  ...props
}) => (
  <table {...props}>
    <caption>{caption}</caption>
    {column && (
      <colgroup>
        {column.split(" ").map((w: string) => (
          <col width={w} />
        ))}
      </colgroup>
    )}
    <thead>{props.head}</thead>
    <tbody className={`shadow-shadow1`}>{props.children}</tbody>
  </table>
);

export default Table;

// elements: {
//   caption: [

//   ],
//   th: ['text-sm'],
// },
