import { useCallback, useEffect, useMemo, useState } from "react";
import type { RefObject } from "react";

interface UseLocomotiveScrollResult {
  scrollToSection: (target: string | HTMLElement) => void;
  scrollY: number;
  isReady: boolean;
}

export const useLocomotiveScroll = (
  containerRef: RefObject<HTMLElement | null>,
): UseLocomotiveScrollResult => {
  const [scrollY, setScrollY] = useState(0);
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleScroll = () => {
      setScrollY(window.scrollY || window.pageYOffset || 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef]);

  const scrollToSection = useCallback((target: string | HTMLElement) => {
    if (typeof document === "undefined") return;

    if (typeof target === "string") {
      const selector = target.startsWith("#") ? target : `#${target}`;
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return useMemo(
    () => ({
      scrollToSection,
      scrollY,
      isReady,
    }),
    [scrollToSection, scrollY, isReady],
  );
};
