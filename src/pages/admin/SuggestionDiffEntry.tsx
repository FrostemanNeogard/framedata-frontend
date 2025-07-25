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
    name: "",
    input: "",
    hitLevel: "",
    damage: "",
    startup: "",
    block: "",
    hit: "",
    counter: "",
    notes: [],
    alternateInputs: [],
    categories: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRealData = async () => {
      const { game, character, input } = suggestionData.target;
      const url = `${import.meta.env.VITE_BASE_API_URL}framedata/${game}/${character}/moves/${input}`;
      const res = await fetch(url);

      if (res.status != 200) {
        if (suggestionData.action != "create") {
          setError("Couldn't find data.");
        }

        setIsLoading(false);
        return;
      }

      const data = await res.json();
      setRealData(data[0]);
      setIsLoading(false);
    };

    if (suggestionData.action != "create") {
      fetchRealData();
    } else {
      setIsLoading(false);
    }
  }, [suggestionData]);

  if (isLoading) {
    return <Throbber />;
  }

  if (error != null) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  if (suggestionData.action == "delete") {
    return (
      <ReactDiffViewer
        oldValue={JSON.stringify(realData, null, 2)}
        newValue={JSON.stringify("", null, 2)}
        splitView={true}
      />
    );
  }

  const fullSuggestion: Partial<Framedata> = {
    name: suggestionData.payload.data?.name ?? realData.name,
    input: suggestionData.payload.data?.input ?? realData.input,
    damage: suggestionData.payload.data?.damage ?? realData.damage,
    startup: suggestionData.payload.data?.startup ?? realData.startup,
    block: suggestionData.payload.data?.block ?? realData.block,
    hit: suggestionData.payload.data?.hit ?? realData.hit,
    counter: suggestionData.payload.data?.counter ?? realData.counter,
    notes: suggestionData.payload.data?.notes ?? realData.notes,
    hitLevel: suggestionData.payload.data?.hitLevel ?? realData.hitLevel,
  };

  const formattedRealData: Partial<Framedata> = {
    name: realData.name,
    input: realData.input,
    damage: realData.damage,
    startup: realData.startup,
    block: realData.block,
    hit: realData.hit,
    counter: realData.counter,
    notes: realData.notes,
    hitLevel: realData.hitLevel,
  };

  return (
    <ReactDiffViewer
      oldValue={JSON.stringify(formattedRealData, null, 2)}
      newValue={JSON.stringify(fullSuggestion, null, 2)}
      splitView={true}
    />
  );
}
