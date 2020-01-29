import { renderHook } from "@testing-library/react-hooks";
import { useInterval } from "../src/hooks/interval.hooks";

jest.useFakeTimers();
const wait = delay =>
  jest.advanceTimersByTime(delay);


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
