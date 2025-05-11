import { Framedata } from "../__types/apiResponse";
import FullScreenOverlay from "./FullScreenOverlay";

type EditFramedataOverlayProps = {
  framedata: Framedata;
  callback: () => unknown;
};
export default function EditFramedataOverlay({
  framedata,
  callback,
}: EditFramedataOverlayProps) {
  return (
    <FullScreenOverlay>
      <button onClick={callback}>CLOSE</button>
      <h1>Editing</h1>
      <form
        className={`grid [&_input]:text-secondaryText [&_textarea]:text-secondaryText`}
      >
        <label htmlFor="input">Input</label>
        <input
          type="text"
          name="input"
          id="input"
          defaultValue={framedata.input}
        />

        <label htmlFor="input">Hit Level</label>
        <input
          type="text"
          name="hit_level"
          id="hit_level"
          defaultValue={framedata.hit_level}
        />

        <label htmlFor="input">Damage</label>
        <input
          type="text"
          name="damage"
          id="damage"
          defaultValue={framedata.damage}
        />

        <label htmlFor="input">Startup</label>
        <input
          type="text"
          name="startup"
          id="startup"
          defaultValue={framedata.startup}
        />

        <label htmlFor="input">Hit</label>
        <input type="text" name="hit" id="hit" defaultValue={framedata.hit} />

        <label htmlFor="input">Block</label>
        <input
          type="text"
          name="block"
          id="block"
          defaultValue={framedata.block}
        />

        <label htmlFor="input">Counter</label>
        <input
          type="text"
          name="counter"
          id="counter"
          defaultValue={framedata.counter}
        />

        <label htmlFor="input">Notes</label>
        <textarea name="input" id="input" defaultValue={framedata.input} />
      </form>
    </FullScreenOverlay>
  );
}
