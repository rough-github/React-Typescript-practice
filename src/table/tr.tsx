import * as React from "react";
import {Row} from "../data";

// React.FC<>でreactコンポーネントであることを示す
const Tr: React.FC<Row> = props  => (
  <tr>
    <th>{props.age}</th>
    {props.answers.map((answer, i) => {
      if(answer === null) return <td key={i}>{"-"}</td>
      return <td key={i}>{`${answer * 100}%`}</td>
    })}
  </tr>
)

export default Tr;