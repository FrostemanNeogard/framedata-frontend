import { createFileRoute } from "@tanstack/react-router";
import FramedataTable from "../components/FramedataTable";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedGame, setSelectedGame] = useState<string>("tekken8");
  const [selectedCharacter, setSelectedCharacter] = useState<string>("ALISA");
  const [characters, setCharacters] = useState<string[]>([]);
  const [payload, setPayload] = useState<{ game: string; character: string }>({
    game: "tekken8",
    character: "ALISA",
  });

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}charactercodes/${selectedGame}`
      );

      if (response.status == 200) {
        const data = await response.json();
        setCharacters(data);
      }
    })();
  }, [selectedGame]);

  const handleGameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGame(e.target.value);
  };

  const handleCharacterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCharacter(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPayload({ game: selectedGame, character: selectedCharacter });
  };

  const games = [
    {
      code: "tekken8",
      name: "Tekken 8",
    },
    {
      code: "tekken7",
      name: "Tekken 7",
    },
    {
      code: "tekkentag2",
      name: "Tekken Tag Tournament 2",
    },
    {
      code: "tekken6",
      name: "Tekken 6",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <form
        className="[&>select]:text-secondary grid grid-rows-2 grid-flow-col gap-x-2 py-5 grid-cols-3"
        onSubmit={handleSubmit}
      >
        <label htmlFor="game-select">Game</label>
        <select
          name="game"
          id="game-select"
          value={selectedGame}
          onChange={handleGameChange}
        >
          {games.map((game, index) => (
            <option value={game.code} key={`game-${index}`}>
              {game.name}
            </option>
          ))}
        </select>
        <label htmlFor="character-select">Character</label>
        <select
          name="character"
          id="character-select"
          value={selectedCharacter}
          onChange={handleCharacterChange}
        >
          {characters.map((character, index) => (
            <option value={character} key={`character-${index}`}>
              {character.toUpperCase()}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="row-span-2 hover:cursor-pointer bg-secondary hover:bg-tertiary transition-all"
        >
          Apply
        </button>
      </form>
      <FramedataTable game={payload.game} character={payload.character} />
    </div>
  );
}
