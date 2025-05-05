import { createFileRoute } from "@tanstack/react-router";
import FramedataTable from "../components/FramedataTable";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [payload, setPayload] = useState({
    game: "tekken8",
    character: "alisa",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-2">
      <form className="[&>select]:text-secondary grid grid-rows-2 grid-flow-col gap-x-2">
        <label htmlFor="game-select">Game</label>
        <select
          name="game"
          id="game-select"
          value={payload.game}
          onChange={handleChange}
        >
          <option value="tekken6">Tekken 6</option>
          <option value="tekkentag2">Tekken Tag Tournament 2</option>
          <option value="tekken7">Tekken 7</option>
          <option value="tekken8">Tekken 8</option>
        </select>
        <label htmlFor="character-select">Character</label>
        <select
          name="character"
          id="character-select"
          value={payload.character}
          onChange={handleChange}
        >
          <option value="alisa">Alisa</option>
          <option value="anna">Anna</option>
          <option value="asuka">Asuka</option>
          <option value="bryan">Bryan</option>
          <option value="claudio">Claudio</option>
        </select>
      </form>
      <FramedataTable game={payload.game} character={payload.character} />
    </div>
  );
}
