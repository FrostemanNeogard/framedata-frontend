import { useEffect, useState } from "react";
import useScreenSize from "./useScreenSize";
import { breakpoints } from "../config";

export default function useScreenType() {
  const screenSize = useScreenSize();
  const [isMobile, setIsMobile] = useState<boolean>(
    screenSize.width < breakpoints.mobileNum
  );
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    if (screenSize.width >= breakpoints.mobileNum) {
      setIsMobile(false);
      setIsDesktop(true);
      return;
    }

    setIsMobile(true);
    setIsDesktop(false);
  }, [screenSize]);

  return { isMobile, isDesktop };
}
