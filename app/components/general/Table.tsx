import React from "react";
import { VariantProps, cva } from "cva";
import { CircleIcon, Cross2Icon } from "@radix-ui/react-icons";
import Align from "./Align";

const TableCheck: React.FC<{ checked: boolean }> = ({ checked, ...props }) => (
  <Align {...props} className={`w-full justify-center`}>
    {checked ? <CircleIcon /> : <Cross2Icon />}
  </Align>
);

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
  caption?: string;
}

interface TableComponent extends React.FC<TableProps> {
  Check: React.FC<{ checked: boolean }>;
}

const Table: TableComponent = ({ textAlign, caption, ...props }) => (
  <table {...props}>
    {caption && <caption>{caption}</caption>}
    {props.children}
  </table>
);

Table.Check = TableCheck;
export default Table;
