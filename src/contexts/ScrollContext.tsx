import { createContext, useContext } from "react";

interface ScrollContextValue {
  scrollToSection: (target: string | HTMLElement) => void;
}

const ScrollContext = createContext<ScrollContextValue>({
  scrollToSection: (target) => {
    if (typeof target === "string") {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    target.scrollIntoView({ behavior: "smooth" });
  },
});

export const ScrollProvider = ScrollContext.Provider;

export const useScrollContext = () => useContext(ScrollContext);
