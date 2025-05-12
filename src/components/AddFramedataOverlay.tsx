import { Framedata } from "../__types/apiResponse";
import FullScreenOverlay from "./FullScreenOverlay";

type AddFramedataOverlayProps = {
  framedata: Framedata;
  callback: () => unknown;
};
export default function AddFramedataOverlay({
  framedata,
  callback,
}: AddFramedataOverlayProps) {
  const createFramedata = async () => {
    console.log("Create framedata at index:", framedata);
  };

  return (
    <FullScreenOverlay>
      <button onClick={callback}>CLOSE</button>
      <h1>Create</h1>
      <form
        className={`grid [&_input]:text-secondaryText [&_textarea]:text-secondaryText`}
        onSubmit={createFramedata}
      >
        <label htmlFor="input">Input</label>
        <input type="text" name="input" id="input" />

        <label htmlFor="input">Hit Level</label>
        <input type="text" name="hit_level" id="hit_level" />

        <label htmlFor="input">Damage</label>
        <input type="text" name="damage" id="damage" />

        <label htmlFor="input">Startup</label>
        <input type="text" name="startup" id="startup" />

        <label htmlFor="input">Hit</label>
        <input type="text" name="hit" id="hit" />

        <label htmlFor="input">Block</label>
        <input type="text" name="block" id="block" />

        <label htmlFor="input">Counter</label>
        <input type="text" name="counter" id="counter" />

        <label htmlFor="input">Notes</label>
        <textarea name="input" id="input" />

        <button type="submit">Create</button>
      </form>
    </FullScreenOverlay>
  );
}
