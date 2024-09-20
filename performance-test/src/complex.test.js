import React from "react";
import { render, screen, act } from "@testing-library/react";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import { createStore, useStateListener, stateValue } from "./otg";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { create } from "zustand";

// Measure performance utility
const measurePerformance = (label, callback) => {
  const start = performance.now();
  callback();
  const end = performance.now();
  console.log(`${label} took ${end - start} ms`);
};

// Example of a complex nested state object
const initialComplexState = {
  level1: {
    level2: {
      level3: {
        counter: 0,
        array: Array(1000).fill({ deep: "counter" }),
      },
    },
  },
};

// MobX Setup with complex state
class MobXComplexState {
  constructor() {
    this.state = { ...initialComplexState };
    makeAutoObservable(this);
  }

  incrementValue() {
    this.state.level1.level2.level3.counter += 1;
  }

  reset() {
    this.state = { ...initialComplexState };
  }
}

const mobxComplexState = new MobXComplexState();

const MobXComplexStateView = observer(({ state }) => (
  <button onClick={() => state.reset()} data-testid='mobx-complex'>
    Value: {state.state.level1.level2.level3.counter}
  </button>
));

// OSM Setup with complex state
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

// Redux Setup with complex state
const reduxComplexSlice = createSlice({
  name: "complex",
  initialState: { ...initialComplexState },
  reducers: {
    incremented: (state) => {
      state.level1.level2.level3.counter += 1;
    },
    reset: (state) => {
      return { ...initialComplexState };
    },
  },
});

const { incremented: reduxIncremented, reset: reduxReset } =
  reduxComplexSlice.actions;

const reduxComplexStore = configureStore({
  reducer: reduxComplexSlice.reducer,
});

function ReduxComplexStateView() {
  const state = useSelector((state) => state.level1.level2.level3);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(reduxReset())} data-testid='redux-complex'>
      Value: {state.counter}
    </button>
  );
}

// Zustand Setup with complex state
const useComplexZustandStore = create((set) => ({
  ...initialComplexState,
  incrementValue: () =>
    set((state) => ({
      level1: {
        level2: {
          level3: {
            ...state.level1.level2.level3,
            counter: state.level1.level2.level3.counter + 1,
          },
        },
      },
    })),
  reset: () => set({ ...initialComplexState }),
}));

function ZustandComplexStateView() {
  const state = useComplexZustandStore((state) => state.level1.level2.level3);
  const reset = useComplexZustandStore((state) => state.reset);

  return (
    <button onClick={reset} data-testid='zustand-complex'>
      Value: {state.counter}
    </button>
  );
}

// Render All Components
const App = () => (
  <div>
    <h1>
      Performance Test: OSM vs Redux vs MobX vs Zustand with Complex State
    </h1>
    <MobXComplexStateView state={mobxComplexState} />
    <OSMComplexStateView />
    <Provider store={reduxComplexStore}>
      <ReduxComplexStateView />
    </Provider>
    <ZustandComplexStateView />
  </div>
);

// Performance Test Code
describe("Performance and Optimization Comparison with Complex State", () => {
  beforeEach(() => {
    // Reset initial states
    mobxComplexState.reset();
    stateValue("level1.level2.level3.counter", osmComplexStateStore, () => 0);
    reduxComplexStore.dispatch(reduxReset());
    useComplexZustandStore.getState().reset();
  });

  test("Compare performance of state updates for 1000 increments", () => {
    render(<App />);

    measurePerformance("MobX State Update (1000 updates)", () => {
      act(() => {
        for (let i = 0; i < 1000; i++) {
          mobxComplexState.incrementValue();
        }
      });
    });

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

    measurePerformance("Redux State Update (1000 updates)", () => {
      act(() => {
        for (let i = 0; i < 1000; i++) {
          reduxComplexStore.dispatch(reduxIncremented());
        }
      });
    });

    measurePerformance("Zustand State Update (1000 updates)", () => {
      act(() => {
        for (let i = 0; i < 1000; i++) {
          useComplexZustandStore.getState().incrementValue();
        }
      });
    });

    // Ensure correct final values are displayed
    expect(screen.getByTestId("mobx-complex").textContent).toBe("Value: 1000");
    expect(screen.getByTestId("osm-complex").textContent).toBe("Value: 1000");
    expect(screen.getByTestId("redux-complex").textContent).toBe("Value: 1000");
    expect(screen.getByTestId("zustand-complex").textContent).toBe(
      "Value: 1000"
    );
  });

  test("Compare re-render counts for 1000 state updates", () => {
    let mobxRenderCount = 0;
    let osmRenderCount = 0;
    let reduxRenderCount = 0;
    let zustandRenderCount = 0;

    // Enhanced components to count renders
    const MobXCounterWithRenderCount = observer(({ state }) => {
      mobxRenderCount++;
      return (
        <button data-testid='mobx-complex-render-count'>
          MobX Render Count: {mobxRenderCount}
        </button>
      );
    });

    function OSMCounterWithRenderCount() {
      osmRenderCount++;
      useStateListener("level1.level2.level3.counter", osmComplexStateStore);
      return (
        <button data-testid='osm-complex-render-count'>
          OSM Render Count: {osmRenderCount}
        </button>
      );
    }

    function ReduxCounterWithRenderCount() {
      reduxRenderCount++;
      useSelector((state) => state.level1.level2.level3);
      return (
        <button data-testid='redux-complex-render-count'>
          Redux Render Count: {reduxRenderCount}
        </button>
      );
    }

    function ZustandCounterWithRenderCount() {
      zustandRenderCount++;
      useComplexZustandStore((state) => state.level1.level2.level3);
      return (
        <button data-testid='zustand-complex-render-count'>
          Zustand Render Count: {zustandRenderCount}
        </button>
      );
    }

    render(
      <>
        <MobXCounterWithRenderCount state={mobxComplexState} />
        <OSMCounterWithRenderCount />
        <Provider store={reduxComplexStore}>
          <ReduxCounterWithRenderCount />
        </Provider>
        <ZustandCounterWithRenderCount />
      </>
    );

    // Trigger state updates
    act(() => {
      for (let i = 0; i < 1000; i++) {
        mobxComplexState.incrementValue();

        stateValue(
          "level1.level2.level3.counter",
          osmComplexStateStore,
          (state) => state + 1
        );
        reduxComplexStore.dispatch(reduxIncremented());
        useComplexZustandStore.getState().incrementValue();
      }
    });

    console.log(`MobX Re-renders: ${mobxRenderCount}`);
    console.log(`OSM Re-renders: ${osmRenderCount}`);
    console.log(`Redux Re-renders: ${reduxRenderCount}`);
    console.log(`Zustand Re-renders: ${zustandRenderCount}`);

    // Verify re-render counts (lower is better for performance)
    expect(mobxRenderCount).toBeLessThanOrEqual(1000); // MobX optimizes for minimal re-renders
    expect(osmRenderCount).toBeLessThanOrEqual(1000); // OSM should also optimize re-renders
    expect(reduxRenderCount).toBeLessThanOrEqual(1000); // Redux may render once per update
    expect(zustandRenderCount).toBeLessThanOrEqual(1000);
  });
});
