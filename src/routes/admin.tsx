import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Suggestion } from "../__types/apiResponse";
import Throbber from "../components/Throbber";
import SuggestionDiffEntry from "../pages/admin/SuggestionDiffEntry";

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  const [suggestionsData, setSuggestionsData] = useState<Suggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] =
    useState<boolean>(true);
  const [isLoadingApproval, setIsLoadingApproval] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const url = `${import.meta.env.VITE_BASE_API_URL}suggestions`;
      const res = await fetch(url);
      const data = await res.json();
      setSuggestionsData(data);
      setIsLoadingSuggestions(false);
    })();
  }, []);

  if (isLoadingSuggestions) {
    return <Throbber />;
  }

  const popSuggestion = () => {
    setSuggestionsData(suggestionsData.slice(1));
  };

  const approveChange = async (id: string) => {
    setIsLoadingApproval(true);
    const res = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}suggestions/approve/${id}`
    );

    if (res.status != 200) {
      console.error("Couldn't approve request");
      return;
    }

    popSuggestion();
    setIsLoadingApproval(false);
  };

  const rejectChange = async (id: string) => {
    setIsLoadingApproval(true);
    const res = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}suggestions/reject/${id}`
    );

    if (res.status != 200) {
      console.error("Couldn't reject request");
      return;
    }

    popSuggestion();
    setIsLoadingApproval(false);
  };

  return (
    <div className="grid gap-3">
      {suggestionsData.map((data, i) => (
        <div
          key={`suggestion-diff-${i}`}
          className="rounded-s bg-secondary p-2 grid gap-2"
        >
          <h1 className="text-xl">
            {data.action} - {data.target.game.toUpperCase()} -{" "}
            {data.target.character.toUpperCase()}
          </h1>
          <SuggestionDiffEntry suggestionData={data} />
          <div className="text-secondaryText flex gap-2">
            <button
              onClick={() => approveChange(data._id)}
              disabled={isLoadingApproval}
              className="rounded p-2 text-l bg-success hover:bg-successDarkened"
            >
              Approve
            </button>
            <button
              onClick={() => rejectChange(data._id)}
              disabled={isLoadingApproval}
              className="rounded p-2 text-l bg-danger hover:bg-dangerDarkened"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
