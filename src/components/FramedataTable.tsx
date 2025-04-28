import { useState, useEffect } from "react";
import { Framedata } from "../__types/apiResponse";

export default function FramedataTable() {
  const [framedata, setFramedata] = useState<Framedata[]>();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}framedata/tekken8/anna`
      );

      if (response.status == 200) {
        const data = await response.json();
        setFramedata(data);
      }
    })();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>input</td>
            <td>hit level</td>
            <td>damage</td>
            <td>startup</td>
            <td>block</td>
            <td>hit</td>
            <td>counter</td>
            <td>notes</td>
          </tr>
        </thead>
        <tbody>
          {framedata?.map((data: Framedata) => (
            <tr key={data.input}>
              <td>{data.input}</td>
              <td>{data.hit_level}</td>
              <td>{data.damage}</td>
              <td>{data.startup}</td>
              <td>{data.block}</td>
              <td>{data.hit}</td>
              <td>{data.counter}</td>
              <td>{data.notes.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
