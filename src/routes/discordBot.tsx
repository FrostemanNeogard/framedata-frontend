import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/discordBot")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>hello discord</h1>
    </div>
  );
}
