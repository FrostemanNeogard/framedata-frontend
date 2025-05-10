import { PropsWithChildren } from "react";

export default function FullScreenOverlay({ children }: PropsWithChildren) {
  return (
    <div
      className={`left-0 top-0 text-primaryText fixed w-screen h-screen bg-black/50 z-50 flex`}
    >
      <div className="bg-primary h-3/5 w-2/3 m-auto p-5">{children}</div>
    </div>
  );
}
