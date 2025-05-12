import { IoMdClose } from "react-icons/io";
import { Framedata } from "../__types/apiResponse";
import FullScreenOverlay from "./FullScreenOverlay";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

type AddFramedataOverlayProps = {
  framedata: Framedata;
  callback: () => unknown;
};
export default function AddFramedataOverlay({
  framedata,
  callback,
}: AddFramedataOverlayProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [input, setInput] = useState<string>("");
  const [hitLevel, setHitLevel] = useState<string>("");
  const [damage, setDamage] = useState<string>("");
  const [startup, setStartup] = useState<string>("");
  const [hit, setHit] = useState<string>("");
  const [block, setBlock] = useState<string>("");
  const [counter, setCounter] = useState<string>("");
  const [notes, setNotes] = useState<string[]>([]);
  const [insertAbove, setInsertAbove] = useState<boolean>(false);

  const createFramedata = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      action: "create",
      target: {
        gameCode: "tekken8",
        character: "alisa",
        input: framedata.input,
        insertAbove,
      },
      payload: {
        input,
        hit_level: hitLevel,
        damage,
        startup,
        hit,
        block,
        counter,
        notes,
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

  const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const parsedNotes = value.split("\n");
    setNotes(parsedNotes);
  };

  return (
    <FullScreenOverlay>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <h1 className="text-xl">Create new framedata entry suggestion</h1>
          <button
            onClick={callback}
            className="p-2 bg-red-400 hover:bg-red-500 rounded text-black"
            disabled={isLoading}
          >
            <IoMdClose />
          </button>
        </div>
        <p className="text-lg">Selected entry: {framedata.input}</p>
        <form
          className={`grid [&_input]:text-secondaryText [&_textarea]:text-secondaryText [&_input]:p-1 [&_textarea]:p-1 [&_input]:rounded [&_textarea]:rounded`}
          onSubmit={createFramedata}
        >
          <label htmlFor="input">Input</label>
          <input
            type="text"
            name="input"
            id="input"
            placeholder={`"d/f+2,1" etc...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <label htmlFor="input">Hit Level</label>
          <input
            type="text"
            name="hit-level"
            id="hit-level"
            placeholder={`"m,h,l" etc...`}
            value={hitLevel}
            onChange={(e) => setHitLevel(e.target.value)}
          />

          <label htmlFor="input">Damage</label>
          <input
            type="text"
            name="damage"
            id="damage"
            placeholder="Start typing..."
            value={damage}
            onChange={(e) => setDamage(e.target.value)}
          />

          <label htmlFor="input">Startup</label>
          <input
            type="text"
            name="startup"
            id="startup"
            placeholder="Start typing..."
            value={startup}
            onChange={(e) => setStartup(e.target.value)}
          />

          <label htmlFor="input">Hit</label>
          <input
            type="text"
            name="hit"
            id="hit"
            placeholder="Start typing..."
            value={hit}
            onChange={(e) => setHit(e.target.value)}
          />

          <label htmlFor="input">Block</label>
          <input
            type="text"
            name="block"
            id="block"
            placeholder="Start typing..."
            value={block}
            onChange={(e) => setBlock(e.target.value)}
          />

          <label htmlFor="input">Counter</label>
          <input
            type="text"
            name="counter"
            id="counter"
            placeholder="Start typing..."
            value={counter}
            onChange={(e) => setCounter(e.target.value)}
          />

          <label htmlFor="input">Notes</label>
          <textarea
            name="input"
            id="input"
            placeholder="Start typing..."
            value={notes.join("\n")}
            onChange={handleNoteChange}
          />

          <br />

          <div>
            <p>Insert new entry:</p>
            <input
              type="radio"
              id="insert-above"
              name="insertion-location"
              radioGroup="insertion-location"
              value={1}
              onChange={() => setInsertAbove(true)}
            />
            <label htmlFor="insert-above">Above selected entry</label>
            <br />
            <input
              type="radio"
              id="insert-below"
              name="insertion-location"
              radioGroup="insertion-location"
              defaultChecked
              value={0}
              onChange={() => setInsertAbove(false)}
            />
            <label htmlFor="insert-below">Below selected entry</label>
          </div>

          <br />

          <button
            type="submit"
            className="bg-green-400 hover:bg-green-500 text-black p-1 rounded"
            disabled={isLoading}
          >
            Create
          </button>
        </form>
      </div>
    </FullScreenOverlay>
  );
}
