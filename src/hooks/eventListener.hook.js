import { useEffect, useRef } from "react";

export function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      element.addEventListener(eventName, savedHandler.current);

      return () => {
        element.removeEventListener(eventName, savedHandler.current);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}
