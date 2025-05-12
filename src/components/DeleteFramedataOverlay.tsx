import { Framedata } from "../__types/apiResponse";
import FullScreenOverlay from "./FullScreenOverlay";

type DeleteFramedataOverlayProps = {
  framedata: Framedata;
  callback: () => unknown;
};
export default function DeleteFramedataOverlay({
  framedata,
  callback,
}: DeleteFramedataOverlayProps) {
  const deleteFramedata = async () => {
    console.log("TODO: delete this", framedata);
  };

  return (
    <FullScreenOverlay>
      <button onClick={callback}>CLOSE</button>
      <h1>Delete?</h1>
      <button onClick={deleteFramedata}>Yes</button>
      <button onClick={callback}>No</button>
    </FullScreenOverlay>
  );
}
