import { renderHook, act } from "@testing-library/react-hooks";
import { useApiCall } from "../src/hooks/api.hook";

const data = {};

test("useApiCall should return isLoading false", async () => {
  const mockedApiRequest = jest.fn().mockReturnValue(Promise.resolve(data));
  const { result, waitForNextUpdate } = renderHook(() =>
    useApiCall(mockedApiRequest)
  );

  expect(result.current[0]).toEqual({
    isLoading: false
  });
  act(() => {
    result.current[1]();
  });
  expect(result.current[0]).toEqual({
    isLoading: true
  });
  await waitForNextUpdate();
  expect(result.current[0]).toEqual({
    isLoading: false,
    data
  });
});
