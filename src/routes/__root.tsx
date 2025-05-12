import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <div className="min-h-dvh bg-primary font-primary text-primary grid grid-rows-[auto_1fr_auto] [&>*]:p-1 md:[&>*]:px-[10vmax]">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

function NotFoundComponent() {
  return (
    <div>
      <h1>Page not found.</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
}
