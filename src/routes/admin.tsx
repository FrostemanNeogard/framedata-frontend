import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Suggestion } from "../__types/apiResponse";
import Throbber from "../components/Throbber";
import SuggestionDiffEntry from "../pages/admin/SuggestionDiffEntry";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  const [suggestionsData, setSuggestionsData] = useState<Suggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] =
    useState<boolean>(true);
  const [isLoadingApproval, setIsLoadingApproval] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPages, setMaxPages] = useState<number>(0);
  const [totalSuggestions, setTotalSuggestions] = useState<number>(0);
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(false);

  useEffect(() => {
    const token = Cookies.get("accessToken");

    if (!token) {
      toast.error("Missing access token. Please refresh your login.");
    } else {
      setAccessToken(token);
    }

    (async () => {
      const url = `${import.meta.env.VITE_BASE_API_URL}suggestions?page=${currentPage}`;
      const res = await fetch(url);
      const data = await res.json();
      setMaxPages(data.pagination.totalPages);
      setSuggestionsData(data.data);
      setIsLoadingSuggestions(false);
      setTotalSuggestions(data.pagination.totalEntries);
    })();
  }, [currentPage, shouldRefresh]);

  if (isLoadingSuggestions) {
    return <Throbber />;
  }

  const removeSuggestionById = (id: string) => {
    setSuggestionsData((prev) => prev.filter((e) => e._id != id));
    setTotalSuggestions((prev) => prev - 1);

    if (suggestionsData.length <= 1) {
      setShouldRefresh((prev) => !prev);
    }
  };

  const approveChange = async (id: string) => {
    setIsLoadingApproval(true);
    const res = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}suggestions/approve/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.status == 401) {
      toast.error("You do not have permissions to perform this action.");
      return;
    }

    if (res.status != 200) {
      toast.error("An error ocurred. Please try again later.");
      return;
    }

    removeSuggestionById(id);
    setIsLoadingApproval(false);
  };

  const rejectChange = async (id: string) => {
    setIsLoadingApproval(true);
    const res = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}suggestions/reject/${id}`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.status == 401) {
      toast.error("You do not have permissions to perform this action.");
      return;
    }

    if (res.status != 200) {
      toast.error("An error ocurred. Please try again later.");
      return;
    }

    removeSuggestionById(id);
    setIsLoadingApproval(false);
  };

  const incrementPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const decrementPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="grid gap-3">
      <div className="flex gap-2 text-l">
        <button
          disabled={currentPage <= 1}
          onClick={decrementPage}
          className={`rounded p-1 px-2 ${currentPage <= 1 ? "bg-primary" : "bg-secondary hover:bg-secondaryDarkened"}`}
        >
          &lt;
        </button>
        <span className="text-xl">{currentPage}</span>
        <button
          disabled={currentPage >= maxPages}
          onClick={incrementPage}
          className={`rounded p-1 px-2 ${currentPage >= maxPages ? "bg-primary" : "bg-secondary hover:bg-secondaryDarkened"}`}
        >
          &gt;
        </button>
        <h1>Remaining: {totalSuggestions}</h1>
      </div>
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
