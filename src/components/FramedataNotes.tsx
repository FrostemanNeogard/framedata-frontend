import { useState } from "react";
import { Framedata } from "../__types/apiResponse";
import FullScreenOverlay from "./FullScreenOverlay";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

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
      <div className="h-fit relative [&_button]:w-8 [&_button]:h-8 [&_button]:flex [&_button]:items-center [&_button]:justify-center ">
        <div
          className={`flex flex-col relative transition-all ${showMenu ? "[&_button]:drop-shadow-[0px_0px_10px_rgba(0,0,0,0.8)] [&_button]:opacity-100 [&_button]:pointer-events-auto" : "[&_button]:opacity-0 [&_button]:pointer-events-none"}`}
        >
          <button
            onClick={toggleEditInterface}
            className={`z-20 transition-all absolute bg-green-400 text-black rounded-full ${showMenu ? "-translate-x-14" : "translate-y-0 translate-x-0"}`}
          >
            <IoMdAdd />
          </button>
          <button
            onClick={toggleEditInterface}
            className={`z-20 transition-all absolute bg-yellow-400 text-black rounded-full ${showMenu ? "translate-y-10 -translate-x-10" : "translate-y-0 translate-x-0"}`}
          >
            <MdEdit />
          </button>
          <button
            onClick={toggleEditInterface}
            className={`z-20 transition-all absolute bg-red-400 text-black rounded-full ${showMenu ? "translate-y-14" : "translate-y-0 translate-x-0"}`}
          >
            <MdDelete />
          </button>
        </div>
        <div className="flex flex-col justify-center z-20">
          <button
            onClick={toggleMenu}
            className="bg-blue-400 text-black rounded-full z-10"
          >
            <SlOptionsVertical />
          </button>
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
