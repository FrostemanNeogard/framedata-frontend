import { useState } from "react";
import { Framedata } from "../__types/apiResponse";
import FullScreenOverlay from "./FullScreenOverlay";

type FramedataEditMenuProps = { framedata: Framedata };
export default function FramedataEditMenu({
  framedata,
}: FramedataEditMenuProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showInterfaceOverlay, setShowInterfaceOverlay] =
    useState<boolean>(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const toggleEditInterface = () => {
    setShowInterfaceOverlay((prev) => !prev);

    console.log("Toggling interface with framedata:", framedata);
  };

  return (
    <>
      <div className="flex gap-1 h-fit relative">
        <div
          className={`flex flex-col relative transition-all duration-200 z-10 ${showMenu ? "visible" : "hidden"} [&_button]:sticky`}
        >
          <button
            onClick={toggleEditInterface}
            className={`bg-green-400 text-black p-2 rounded-full top-0`}
          ></button>
          <button
            onClick={toggleEditInterface}
            className={`bg-yellow-400 text-black p-2 rounded-full top-1/2 -translate-y-1/2`}
          ></button>
          <button
            onClick={toggleEditInterface}
            className={`bg-red-400 text-black p-2 rounded-full bottom-0`}
          ></button>
        </div>
        <div className="flex flex-col justify-center z-20">
          <button
            onClick={toggleMenu}
            className="bg-blue-400 text-black p-2 rounded-full"
          ></button>
        </div>
      </div>
      {showInterfaceOverlay && (
        <FullScreenOverlay>
          <button onClick={toggleEditInterface}>CLOSE</button>
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
            <input
              type="text"
              name="hit"
              id="hit"
              defaultValue={framedata.hit}
            />

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
      )}
    </>
  );
}
