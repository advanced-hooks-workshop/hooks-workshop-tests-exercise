import { useState, useCallback } from "react";

export const useToggle = initialValue => {
  const [value, setValue] = useState(Boolean(initialValue));
  const toggle = useCallback(() => setValue(prev => !prev), []);

  return [value, toggle];
};
