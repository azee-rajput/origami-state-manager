import React from "react";
import { render, screen, act } from "@testing-library/react";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import { createStore, stateValue, useStateListener } from "./otg";
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

// MobX Setup
function createMobXTimer() {
  return makeAutoObservable({
    secondsPassed: 0,
    increase() {
      this.secondsPassed += 1;
    },
    reset() {
      this.secondsPassed = 0;
    },
  });
}

const mobxTimer = createMobXTimer();

const MobXTimerView = observer(({ timer }) => (
  <button onClick={() => timer.reset()} data-testid='mobx-timer'>
    Seconds passed: {timer.secondsPassed}
  </button>
));

// OSM Setup
const osmInitialState = { secondsPassed: 0 };
const osmStore = createStore(osmInitialState);

function OSMTimerView() {
  const secondsPassed = useStateListener("secondsPassed", osmStore);

  return (
    <button
      onClick={() => stateValue("secondsPassed", osmStore, () => 0)}
      data-testid='osm-timer'
    >
      Seconds passed: {secondsPassed}
    </button>
  );
}

// Redux Setup using Redux Toolkit
const counterSlice = createSlice({
  name: "counter",
  initialState: {
    secondsPassed: 0,
  },
  reducers: {
    incremented: (state) => {
      state.secondsPassed += 1;
    },
    reset: (state) => {
      state.secondsPassed = 0;
    },
  },
});

const { incremented, reset } = counterSlice.actions;

const reduxStore = configureStore({
  reducer: counterSlice.reducer,
});

function ReduxTimerView() {
  const secondsPassed = useSelector((state) => state.secondsPassed);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(reset())} data-testid='redux-timer'>
      Seconds passed: {secondsPassed}
    </button>
  );
}

// Zustand Setup
const useBearStore = create((set) => ({
  secondsPassed: 0,
  increase: () => set((state) => ({ secondsPassed: state.secondsPassed + 1 })),
  reset: () => set({ secondsPassed: 0 }),
}));

function ZustandTimerView() {
  const secondsPassed = useBearStore((state) => state.secondsPassed);
  const increase = useBearStore((state) => state.increase);
  const reset = useBearStore((state) => state.reset);

  return (
    <button onClick={reset} data-testid='zustand-timer'>
      Seconds passed: {secondsPassed}
    </button>
  );
}

// Render All Components
const App = () => (
  <div>
    <h1>Performance Test: OSM vs Redux vs MobX vs Zustand</h1>
    <MobXTimerView timer={mobxTimer} />
    <OSMTimerView />
    <Provider store={reduxStore}>
      <ReduxTimerView />
    </Provider>
    <ZustandTimerView />
  </div>
);

// Performance Test Code
describe("Performance and Optimization Comparison: OSM vs Redux vs MobX vs Zustand", () => {
  beforeEach(() => {
    // Reset initial states
    stateValue("secondsPassed", osmStore, () => 0);
    mobxTimer.reset();
    reduxStore.dispatch(reset());
    useBearStore.getState().reset();
  });

  test("Compare performance of state updates for 1000 increments", () => {
    render(<App />);

    measurePerformance("MobX State Update (1000 updates)", () => {
      act(() => {
        for (let i = 0; i < 1000; i++) {
          mobxTimer.increase();
        }
      });
    });

    measurePerformance("OSM State Update (1000 updates)", () => {
      act(() => {
        for (let i = 0; i < 1000; i++) {
          stateValue("secondsPassed", osmStore, (state) => state + 1);
        }
      });
    });

    measurePerformance("Redux State Update (1000 updates)", () => {
      act(() => {
        for (let i = 0; i < 1000; i++) {
          reduxStore.dispatch(incremented());
        }
      });
    });

    measurePerformance("Zustand State Update (1000 updates)", () => {
      act(() => {
        for (let i = 0; i < 1000; i++) {
          useBearStore.getState().increase();
        }
      });
    });

    // Ensure correct final values are displayed
    expect(screen.getByTestId("mobx-timer").textContent).toBe(
      "Seconds passed: 1000"
    );
    expect(screen.getByTestId("osm-timer").textContent).toBe(
      "Seconds passed: 1000"
    );
    expect(screen.getByTestId("redux-timer").textContent).toBe(
      "Seconds passed: 1000"
    );
    expect(screen.getByTestId("zustand-timer").textContent).toBe(
      "Seconds passed: 1000"
    );
  });

  test("Compare re-render counts for 1000 state updates", () => {
    let mobxRenderCount = 0;
    let osmRenderCount = 0;
    let reduxRenderCount = 0;
    let zustandRenderCount = 0;

    // Enhanced components to count renders
    const MobXCounterWithRenderCount = observer(({ timer }) => {
      mobxRenderCount++;
      return (
        <button data-testid='mobx-render-count'>
          MobX Render Count: {mobxRenderCount}
        </button>
      );
    });

    function OSMCounterWithRenderCount() {
      osmRenderCount++;
      useStateListener("secondsPassed", osmStore);
      return (
        <button data-testid='osm-render-count'>
          OSM Render Count: {osmRenderCount}
        </button>
      );
    }

    function ReduxCounterWithRenderCount() {
      reduxRenderCount++;
      useSelector((state) => state.secondsPassed);
      return (
        <button data-testid='redux-render-count'>
          Redux Render Count: {reduxRenderCount}
        </button>
      );
    }

    function ZustandCounterWithRenderCount() {
      zustandRenderCount++;
      useBearStore((state) => state.secondsPassed);
      return (
        <button data-testid='zustand-render-count'>
          Zustand Render Count: {zustandRenderCount}
        </button>
      );
    }

    render(
      <>
        <MobXCounterWithRenderCount timer={mobxTimer} />
        <OSMCounterWithRenderCount />
        <Provider store={reduxStore}>
          <ReduxCounterWithRenderCount />
        </Provider>
        <ZustandCounterWithRenderCount />
      </>
    );

    // Trigger state updates
    act(() => {
      for (let i = 0; i < 1000; i++) {
        mobxTimer.increase();
        stateValue("secondsPassed", osmStore, (state) => state + 1);
        reduxStore.dispatch(incremented());
        useBearStore.getState().increase();
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
    expect(zustandRenderCount).toBeLessThanOrEqual(1000); // Zustand should optimize re-renders as well
  });
});
