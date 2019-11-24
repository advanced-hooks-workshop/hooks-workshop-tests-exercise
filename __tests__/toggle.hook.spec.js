import { renderHook, act } from "@testing-library/react-hooks";

import { useToggle } from "../src/hooks/toggle.hook";

test("should return the value", () => {
  const { result } = renderHook(() => useToggle(true));

  expect(result.current[0]).toBe(true);
});

test("should allow to change the value", () => {
  const { result } = renderHook(() => useToggle(true));

  act(() => {
    result.current[1]();
  });

  expect(result.current[0]).toBe(false);
});
