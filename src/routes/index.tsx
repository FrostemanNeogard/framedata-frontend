import { createFileRoute } from "@tanstack/react-router";
import FramedataTable from "../components/FramedataTable";
import { FormEvent, useState } from "react";
import HorizontalDivider from "../components/HorizontalDivider";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [game, setGame] = useState<string>("tekken8");
  const [character, setCharacter] = useState<string>("alisa");

  const [payload, setPayload] = useState<{ game: string; character: string }>({
    game,
    character,
  });

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPayload({ game, character });
  };

  // TODO: Look into TanStack form
  return (
    <div className="flex flex-col gap-2">
      <form
        action=""
        onSubmit={handleFormSubmit}
        className="[&>select]:text-secondary grid grid-rows-2 grid-flow-col gap-x-2"
      >
        <label htmlFor="game-select">Game</label>
        <select
          name="game-select"
          id="game-select"
          onChange={(e) => setGame(e.target.value)}
        >
          <option value="tekken6">Tekken 6</option>
          <option value="tekkentag2">Tekken Tag Tournament 2</option>
          <option value="tekken7">Tekken 7</option>
          <option value="tekken8">Tekken 8</option>
        </select>
        <label htmlFor="character-select">Character</label>
        <select
          name="character-select"
          id="character-select"
          onChange={(e) => {
            setCharacter(e.target.value);
            handleFormSubmit(e);
          }}
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
