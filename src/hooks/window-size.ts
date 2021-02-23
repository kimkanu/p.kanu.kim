import { useState, useEffect } from "preact/hooks";

interface WindowSize {
  width: number;
  height: number;
}

export default function useWindowSize(): WindowSize {
  function getSize(): WindowSize {
    if (typeof window === "undefined") {
      return {
        width: 0,
        height: 0,
      };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize(): void {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);

    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}
