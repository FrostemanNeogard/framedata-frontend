import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <nav className="bg-secondary">
      <ul className="flex gap-3">
        <Link to="/">Home</Link>
        <Link to="/bot">Discord Bot</Link>
      </ul>
    </nav>
  );
}
