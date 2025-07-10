import { useEffect, useState } from "react";
import { Framedata, Suggestion } from "../../__types/apiResponse";
import ReactDiffViewer from "react-diff-viewer-continued";
import Throbber from "../../components/Throbber";

type SuggestionDiffEntryProps = {
  suggestionData: Suggestion;
};
export default function SuggestionDiffEntry({
  suggestionData,
}: SuggestionDiffEntryProps) {
  const [realData, setRealData] = useState<Framedata>({
    input: "",
    hitLevel: "",
    damage: "",
    startup: "",
    block: "",
    hit: "",
    counter: "",
    notes: [],
    name: "",
    alternateInputs: [],
    categories: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const { game, character, input } = suggestionData.target;
      const url = `${import.meta.env.VITE_BASE_API_URL}framedata/${game}/${character}/moves/${input}`;
      const res = await fetch(url);
      const data = await res.json();
      setRealData(data[0]);
      setIsLoading(false);
    })();
  }, [suggestionData]);

  if (isLoading) {
    return <Throbber />;
  }

  const fullSuggestion: Partial<Framedata> = {
    name: suggestionData.payload.name ?? realData.name,
    input: suggestionData.payload.input ?? realData.input,
    damage: suggestionData.payload.damage ?? realData.damage,
    startup: suggestionData.payload.startup ?? realData.startup,
    block: suggestionData.payload.block ?? realData.block,
    hit: suggestionData.payload.hit ?? realData.hit,
    counter: suggestionData.payload.counter ?? realData.counter,
    notes: suggestionData.payload.notes ?? realData.notes,
    hitLevel: suggestionData.payload.hitLevel ?? realData.hitLevel,
  };

  const formattedRealData: Partial<Framedata> = { ...realData };
  delete formattedRealData.alternateInputs;
  delete formattedRealData.categories;

  return (
    <ReactDiffViewer
      oldValue={JSON.stringify(formattedRealData, null, 2)}
      newValue={JSON.stringify(fullSuggestion, null, 2)}
      splitView={true}
    />
  );
}
