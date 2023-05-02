import React from "react";
import Table, { TableProps } from "../component/general/Table";
import { CircleIcon, Cross1Icon } from "@radix-ui/react-icons";

interface AvailabilityTableProps extends TableProps {
  items: object[];
}

const feedData = [
  {
    name: "",
    value: true,
  },
];

const AvailabilityTable = (props: AvailabilityTableProps) => (
  <Table column={"auto 30px"}>
    {props.items.map((name: string, value: boolean) => (
      <tr>
        <td>{name}</td>
        <td>{value ? <CircleIcon /> : <Cross1Icon />}</td>
      </tr>
    ))}
  </Table>
);

export default AvailabilityTable;
