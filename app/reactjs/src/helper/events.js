import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(ref, handler) {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}
