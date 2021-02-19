import * as React from "react";
import {Rows} from "../data";
import Tr from "./tr";

type props = {
  rows: Rows
}

export const Tbody: React.FC<props> = props => (
  <tbody>
    {props.rows.map(row => (
      <Tr key={row.id} {...row} />
    ))}
  </tbody>
)