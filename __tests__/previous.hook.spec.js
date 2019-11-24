import { renderHook } from "@testing-library/react-hooks";
import { usePrevious } from "../src/hooks/previous.hook";

test("usePrevious should start from undefined", () => {
  const { result } = renderHook(() => usePrevious(10));

  expect(result.current).toBe(undefined);
});

test("usePrevious should show the previous one on re-render from undefined", () => {
  const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
    initialProps: { value: 10 }
  });
  rerender({ value: 20 });

  expect(result.current).toBe(10);
});
