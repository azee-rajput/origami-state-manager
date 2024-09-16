import React from "react";
import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import useStateListener from "./useStateListener"; // Adjust the path as needed

// Mocking the store object
const createMockStore = (initialValue) => {
  const listeners = [];
  let value = initialValue;

  return {
    get value() {
      return value;
    },
    set value(newValue) {
      value = newValue;
      listeners.forEach((listener) => listener(value));
    },
    subscribe(listener) {
      listeners.push(listener);
    },
  };
};

// Test component that uses the hook
const TestComponent = ({ stateName, store }) => {
  const stateValue = useStateListener(stateName, store);
  return <div>{stateValue}</div>;
};

describe.only("useStateListener", () => {
  test("should initialize with the correct value and update when the store changes", () => {
    const initialValue = "initialValue";
    const updatedValue = "updatedValue";

    const mockStore = createMockStore(initialValue);

    const { getByText, rerender } = render(
      <TestComponent stateName='testState' store={{ testState: mockStore }} />
    );

    // Assert initial value
    expect(getByText(initialValue)).toBeInTheDocument();

    // Update store value
    act(() => {
      mockStore.value = updatedValue;
    });

    // Rerender component to reflect the updated store value
    rerender(
      <TestComponent stateName='testState' store={{ testState: mockStore }} />
    );

    // Assert updated value
    expect(getByText(updatedValue)).toBeInTheDocument();
  });
});
