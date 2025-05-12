import { PropsWithChildren, useEffect } from "react";

type FullScreenOverlayProps = {
  overrideDefault?: boolean;
};
export default function FullScreenOverlay({
  children,
  overrideDefault,
}: PropsWithChildren<FullScreenOverlayProps>) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "initial";
    };
  }, []);

  return (
    <div
      className={`left-0 top-0 text-primaryText fixed w-screen h-screen bg-black/50 z-50 flex`}
    >
      {overrideDefault ? (
        children
      ) : (
        <div className="bg-primary min-h-3/5 w-2/3 m-auto p-5">{children}</div>
      )}
    </div>
  );
}
