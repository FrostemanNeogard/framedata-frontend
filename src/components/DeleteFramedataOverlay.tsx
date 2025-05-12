import { IoMdClose } from "react-icons/io";
import { Framedata } from "../__types/apiResponse";
import FullScreenOverlay from "./FullScreenOverlay";
import { useState } from "react";
import { toast } from "react-toastify";

type DeleteFramedataOverlayProps = {
  framedata: Framedata;
  game: string;
  character: string;
  callback: () => unknown;
};
export default function DeleteFramedataOverlay({
  framedata,
  game,
  character,
  callback,
}: DeleteFramedataOverlayProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteFramedata = async () => {
    const payload = {
      action: "delete",
      target: {
        game,
        character,
        input: framedata.input,
      },
    };

    setIsLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}suggestions`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );

    if (response.status == 201) {
      toast.success("Suggestion sent!");
    } else {
      toast.error("Something went wrong. Please try again later.");
    }
    setIsLoading(false);
    callback();
  };

  return (
    <FullScreenOverlay>
      <div className="flex justify-between">
        <h1 className="text-xl">Suggest framedata entry removal</h1>
        <button
          onClick={callback}
          className="p-2 bg-red-400 hover:bg-red-500 rounded text-black"
          disabled={isLoading}
        >
          <IoMdClose />
        </button>
      </div>
      <p className="text-lg">Selected entry: {framedata.input}</p>
      <br />
      <h1 className="text-lg">Should this entry be removed?</h1>
      <div className="flex gap-2">
        <button
          className="rounded py-1 px-8 text-black bg-green-400 hover:bg-green-500"
          onClick={deleteFramedata}
        >
          Yes
        </button>
        <button
          className="rounded py-1 px-8 text-black bg-red-400 hover:bg-red-500"
          onClick={callback}
        >
          No
        </button>
      </div>
    </FullScreenOverlay>
  );
}
