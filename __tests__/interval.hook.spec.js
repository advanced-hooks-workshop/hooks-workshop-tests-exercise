import { renderHook } from "@testing-library/react-hooks";
import { useInterval } from "../src/hooks/interval.hooks";

// Better use jest.useFakeTimers, but doesn't work in CodeSandbox
const wait = delay =>
  new Promise(resolve => {
    setTimeout(resolve, delay);
  });

test("interval", async () => {
  const mockCallback = jest.fn(() => console.log("mocked"));
  renderHook(() => useInterval(mockCallback, 10));
  await wait(20);

  expect(mockCallback).toHaveBeenCalled();
});

test("change delay", async () => {
  const mockCallback = jest.fn(() => console.log("mocked"));
  const { rerender } = renderHook(
    ({ callback, delay }) => useInterval(callback, delay),
    {
      initialProps: () => ({ callback: mockCallback, delay: 1000 })
    }
  );
  rerender({ callback: mockCallback, delay: 10 });
  await wait(20);
  expect(mockCallback).toHaveBeenCalled();
});
