import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import Cookies from "js-cookie";

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

  useEffect(() => {
    Cookies.set("accessToken", token, { expires: 7 });
  }, [token]);

  return <div>Logged in successfully</div>;
}
