import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <a href="http://localhost:3000/v1/auth/google/login">Login</a>
    </div>
  );
}
