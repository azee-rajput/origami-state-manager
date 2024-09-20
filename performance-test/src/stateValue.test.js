import React from "react";
import createStore from "./otg/createStore";
import stateValue from "./otg/stateValue";
import useStateListener from "./otg/useStateListener";
import { render, screen, act } from "@testing-library/react";

// Measure performance utility
const measurePerformance = (label, callback) => {
  const start = performance.now();
  callback();
  const end = performance.now();
  console.log(`${label} took ${end - start} ms`);
};

const initialComplexState = {
  level1: {
    level2: {
      level3: {
        counter: 0,
        array: Array(2).fill({ deep: "counter" }),
      },
    },
  },
};

const osmComplexStateStore = createStore({
  ...initialComplexState,
});

function OSMComplexStateView() {
  const counter = useStateListener(
    "level1.level2.level3.counter",
    osmComplexStateStore
  );

  return (
    <button
      onClick={() => {
        stateValue(
          "level1.level2.level3.counter",
          osmComplexStateStore,
          () => 0
        );
      }}
      data-testid='osm-complex'
    >
      Value: {counter}
    </button>
  );
}

const App = () => (
  <div>
    <h1>Performance Test: OSM stateValue</h1>
    <OSMComplexStateView />
  </div>
);

describe("createStore", () => {
  afterEach(() => {
    // Clear the mock storage
    jest.clearAllMocks();
    let level1 = osmComplexStateStore["level1"].value;
    level1 = {
      ...level1,
      level2: {
        ...level1.level2,
        level3: {
          ...level1.level2.level3,
          counter: 0,
        },
      },
    };
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("Compare performance of state updates for 1000 increments", () => {
    render(<App />);

    measurePerformance("OSM State Update (1000 updates)", () => {
      act(() => {
        for (let i = 0; i < 1000; i++) {
          stateValue(
            "level1.level2.level3.counter",
            osmComplexStateStore,
            (state) => state + 1
          );
        }
      });
    });

    // Ensure correct final values are displayed
    expect(screen.getByTestId("osm-complex").textContent).toBe("Value: 1000");
  });

  test("Compare re-render counts for 1000 state updates", () => {
    let osmRenderCount = 0;

    // Enhanced components to count renders

    function OSMCounterWithRenderCount() {
      osmRenderCount++;
      useStateListener("level1.level2.level3.counter", osmComplexStateStore);
      return (
        <button data-testid='osm-complex-render-count'>
          OSM Render Count: {osmRenderCount}
        </button>
      );
    }

    render(
      <>
        <OSMCounterWithRenderCount />
      </>
    );

    // Trigger state updates
    act(() => {
      for (let i = 0; i < 1000; i++) {
        stateValue(
          "level1.level2.level3.counter",
          osmComplexStateStore,
          (state) => state + 1
        );
      }
    });

    console.log(`OSM Re-renders: ${osmRenderCount}`);

    expect(osmRenderCount).toBeLessThanOrEqual(1000); // OSM should also optimize re-renders
  });
});
