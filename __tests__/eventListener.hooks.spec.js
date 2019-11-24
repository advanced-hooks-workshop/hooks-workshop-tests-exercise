import { renderHook } from "@testing-library/react-hooks";
import { useApiCall } from "../src/hooks/api.hook";
import { useEventListener } from "../src/hooks/eventListener.hook";

const args = [1, 2, 3];

let currentListeners, mockedElement, handler;
beforeEach(() => {
  currentListeners = [];
  mockedElement = {
    addEventListener: jest.fn().mockImplementation((eventName, listener) => {
      currentListeners.push(listener);
    }),
    removeEventListener: jest.fn()
  };
  handler = jest.fn();
});
test("eventListener adds a listener to element", () => {
  renderHook(() => useEventListener("event", handler, mockedElement));

  expect(mockedElement.addEventListener).toHaveBeenCalledTimes(1);
  expect(mockedElement.addEventListener).toHaveBeenCalledWith(
    "event",
    currentListeners[0]
  );
  currentListeners[0](...args);
  expect(handler).toHaveBeenCalledWith(...args);
  expect(handler).toHaveBeenCalledTimes(1);
});

test("eventListener removes a listener from an element", () => {
  const { unmount } = renderHook(() =>
    useEventListener("event", handler, mockedElement)
  );

  unmount();

  expect(mockedElement.removeEventListener).toHaveBeenCalledTimes(1);
  expect(mockedElement.removeEventListener).toHaveBeenCalledWith(
    "event",
    currentListeners[0]
  );
});

test("eventListener is removed and re-added if eventName changes", () => {
  const { rerender } = renderHook(
    ({ eventName }) => useEventListener(eventName, handler, mockedElement),
    {
      initialProps: { eventName: "event" }
    }
  );

  rerender({ eventName: "newEvent" });
  expect(mockedElement.addEventListener).toHaveBeenCalledTimes(2);
  expect(mockedElement.addEventListener).toHaveBeenCalledWith(
    "event",
    currentListeners[0]
  );
  expect(mockedElement.addEventListener).toHaveBeenCalledWith(
    "newEvent",
    currentListeners[1]
  );
  expect(mockedElement.removeEventListener).toHaveBeenCalledTimes(1);
  expect(mockedElement.removeEventListener).toHaveBeenCalledWith(
    "event",
    currentListeners[0]
  );
  currentListeners[1](...args);
  expect(handler).toHaveBeenCalledWith(...args);
  expect(handler).toHaveBeenCalledTimes(1);
});

test("changing handler updates the callback but doesn't remove and re-add the event listener", () => {
  const { rerender } = renderHook(
    ({ handler }) => useEventListener("event", handler, mockedElement),
    {
      initialProps: { handler }
    }
  );
  const newHandler = jest.fn();

  rerender({ handler: newHandler });
  expect(mockedElement.addEventListener).toHaveBeenCalledTimes(1);
  expect(mockedElement.removeEventListener).not.toHaveBeenCalled();
  currentListeners[0](...args);
  expect(handler).not.toHaveBeenCalled();
  expect(newHandler).toHaveBeenCalledTimes(1);
  expect(newHandler).toHaveBeenCalledWith(...args);
});

test("eventListener is removed and re-added if element changes", () => {
  const { rerender } = renderHook(
    ({ element }) => useEventListener("event", handler, element),
    {
      initialProps: { element: mockedElement }
    }
  );
  let newListener;
  const newMockedElement = {
    addEventListener: jest.fn().mockImplementation((eventName, listener) => {
      newListener = listener;
    }),
    removeEventListener: jest.fn()
  };

  rerender({ element: newMockedElement });

  expect(mockedElement.addEventListener).toHaveBeenCalledTimes(1);
  expect(mockedElement.addEventListener).toHaveBeenCalledWith(
    "event",
    currentListeners[0]
  );
  expect(newMockedElement.addEventListener).toHaveBeenCalledTimes(1);
  expect(newMockedElement.addEventListener).toHaveBeenCalledWith(
    "event",
    newListener
  );
  expect(mockedElement.removeEventListener).toHaveBeenCalledTimes(1);
  expect(mockedElement.removeEventListener).toHaveBeenCalledWith(
    "event",
    currentListeners[0]
  );
  expect(newMockedElement.removeEventListener).not.toHaveBeenCalled();
  newListener(...args);
  expect(handler).toHaveBeenCalledWith(...args);
  expect(handler).toHaveBeenCalledTimes(1);
});
