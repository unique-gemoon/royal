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
export function ScrollBottom(ref, handler) {
  useEffect(() => {
    const listener = event => {
      //To do
      console.log("reached bottom");
      if (ref.current) {
        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        if (scrollTop + clientHeight === scrollHeight) {
          console.log("reached bottom");
          handler(event);
        }
      }
    };

    document.addEventListener("scroll", listener);

    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [ref, handler]);
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useDragover(ref, handler) {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("dragover", listener);

    return () => {
      document.removeEventListener("dragover", listener);
    };
  }, [ref, handler]);
}
export function useDrop(ref, handler) {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("drop", listener);

    return () => {
      document.removeEventListener("drop", listener);
    };
  }, [ref, handler]);
}

