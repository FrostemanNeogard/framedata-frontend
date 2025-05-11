import { useState } from "react";
import { Framedata } from "../__types/apiResponse";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import EditFramedataOverlay from "./EditFramedataOverlay";
import DeleteFramedataOverlay from "./DeleteFramedataOverlay";
import AddFramedataOverlay from "./AddFramedataOverlay";

type FramedataEditMenuProps = { framedata: Framedata };
export default function FramedataEditMenu({
  framedata,
}: FramedataEditMenuProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showAddOverlay, setShowAddOverlay] = useState<boolean>(false);
  const [showEditOverlay, setShowEditOverlay] = useState<boolean>(false);
  const [showDeleteOverlay, setShowDeleteOverlay] = useState<boolean>(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const toggleAddInterface = () => {
    setShowAddOverlay((prev) => !prev);
  };

  const toggleEditInterface = () => {
    setShowEditOverlay((prev) => !prev);
  };

  const toggleDeleteInterface = () => {
    setShowDeleteOverlay((prev) => !prev);
  };

  return (
    <>
      <div className="h-fit relative [&_button]:w-8 [&_button]:h-8 [&_button]:flex [&_button]:items-center [&_button]:justify-center ">
        <div
          className={`flex flex-col relative transition-all [&_button]:z-20 [&_button]:transition-all [&_button]:absolute [&_button]:text-black [&_button]:rounded-full ${showMenu ? "[&_button]:drop-shadow-[0px_0px_10px_rgba(0,0,0,0.8)] [&_button]:opacity-100 [&_button]:pointer-events-auto" : "[&_button]:opacity-0 [&_button]:pointer-events-none"}`}
        >
          <button
            onClick={toggleAddInterface}
            className={`bg-green-400 ${showMenu ? "-translate-x-14" : "translate-y-0 translate-x-0"}`}
          >
            <IoMdAdd />
          </button>
          <button
            onClick={toggleEditInterface}
            className={`bg-yellow-400 ${showMenu ? "translate-y-10 -translate-x-10" : "translate-y-0 translate-x-0"}`}
          >
            <MdEdit />
          </button>
          <button
            onClick={toggleDeleteInterface}
            className={`bg-red-400 ${showMenu ? "translate-y-14" : "translate-y-0 translate-x-0"}`}
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
      {showAddOverlay && (
        <AddFramedataOverlay
          framedata={framedata}
          callback={toggleAddInterface}
        />
      )}
      {showEditOverlay && (
        <EditFramedataOverlay
          framedata={framedata}
          callback={toggleEditInterface}
        />
      )}
      {showDeleteOverlay && (
        <DeleteFramedataOverlay
          framedata={framedata}
          callback={toggleDeleteInterface}
        />
      )}
    </>
  );
}
