import { useRef, useEffect } from "react";

export const usePrevious = value => {
  const previousRef = useRef();

  useEffect(() => {
    previousRef.current = value;
  });

  return previousRef.current;
};
