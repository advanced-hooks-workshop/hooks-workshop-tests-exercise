import { renderHook } from "@testing-library/react-hooks";
import { useFontsize, ThemeProvider } from "../src/hooks/theme.hooks";

test("useFontSize", () => {
  const { result } = renderHook(() => useFontsize(), {
    wrapper: ThemeProvider
  });

  expect(result.current).toBe(14);
});
