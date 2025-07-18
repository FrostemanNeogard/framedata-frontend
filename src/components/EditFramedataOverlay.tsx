import { IoMdClose } from "react-icons/io";
import { Framedata } from "../__types/apiResponse";
import FullScreenOverlay from "./FullScreenOverlay";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

type EditFramedataOverlayProps = {
  framedata: Framedata;
  game: string;
  character: string;
  callback: () => unknown;
};
export default function EditFramedataOverlay({
  framedata,
  game,
  character,
  callback,
}: EditFramedataOverlayProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [input, setInput] = useState<string>(framedata.input);
  const [hitLevel, setHitLevel] = useState<string>(framedata.hitLevel);
  const [damage, setDamage] = useState<string>(framedata.damage);
  const [startup, setStartup] = useState<string>(framedata.startup);
  const [hit, setHit] = useState<string>(framedata.hit);
  const [block, setBlock] = useState<string>(framedata.block);
  const [counter, setCounter] = useState<string>(framedata.counter);
  const [notes, setNotes] = useState<string[]>(framedata.notes);

  const modifyFramedata = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      action: "modify",
      target: {
        game,
        character,
        input: framedata.input,
      },
      payload: {
        data: {
          input,
          hitLevel: hitLevel,
          damage,
          startup,
          hit,
          block,
          counter,
          notes,
        },
      },
    };

    setIsLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}suggestions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
          <h1 className="text-xl">Suggest framedata entry modification</h1>
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
          onSubmit={modifyFramedata}
        >
          <label htmlFor="input">Input</label>
          <input
            type="text"
            name="input"
            id="input"
            placeholder={`Example: "d/f+2,1"`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <label htmlFor="input">Hit Level</label>
          <input
            type="text"
            name="hit-level"
            id="hit-level"
            placeholder={`Example: "m,h,l"`}
            value={hitLevel}
            onChange={(e) => setHitLevel(e.target.value)}
          />

          <label htmlFor="input">Damage</label>
          <input
            type="text"
            name="damage"
            id="damage"
            placeholder={`Example: "10, 20"`}
            value={damage}
            onChange={(e) => setDamage(e.target.value)}
          />

          <label htmlFor="input">Startup</label>
          <input
            type="text"
            name="startup"
            id="startup"
            placeholder={`Example: "i10"`}
            value={startup}
            onChange={(e) => setStartup(e.target.value)}
          />

          <label htmlFor="input">Hit</label>
          <input
            type="text"
            name="hit"
            id="hit"
            placeholder={`Example: "+8"`}
            value={hit}
            onChange={(e) => setHit(e.target.value)}
          />

          <label htmlFor="input">Block</label>
          <input
            type="text"
            name="block"
            id="block"
            placeholder={`Example: "-5"`}
            value={block}
            onChange={(e) => setBlock(e.target.value)}
          />

          <label htmlFor="input">Counter</label>
          <input
            type="text"
            name="counter"
            id="counter"
            placeholder={`Example: "+12g"`}
            value={counter}
            onChange={(e) => setCounter(e.target.value)}
          />

          <label htmlFor="input">Notes</label>
          <textarea
            name="input"
            id="input"
            placeholder={`Separate notes on new lines`}
            value={notes.join("\n")}
            onChange={handleNoteChange}
          />

          <br />

          <button
            type="submit"
            className="bg-green-400 hover:bg-green-500 text-black p-1 rounded"
            disabled={isLoading}
          >
            Submit
          </button>
        </form>
      </div>
    </FullScreenOverlay>
  );
}
