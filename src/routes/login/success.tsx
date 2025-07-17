import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";

type LoginSuccessSearch = {
  token: string;
};

export const Route = createFileRoute("/login/success")({
  validateSearch: (search: LoginSuccessSearch) => {
    if (typeof search.token != "string" || search.token.trim() == "") {
      throw new Error("No token provided.");
    }

    return { token: search.token.trim() };
  },

  component: RouteComponent,
});

function RouteComponent() {
  const { token } = useSearch({ from: "/login/success" });

  useEffect(() => {}, [token]);

  return (
    <div>
      Logged in successfully
      <button onClick={() => {}}>Show cookie</button>
    </div>
  );
}
