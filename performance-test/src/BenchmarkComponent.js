import { useEffect, useRef, useState } from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { create } from "zustand";
import { observer } from "mobx-react-lite";
import { makeAutoObservable } from "mobx";
import { Benchmark } from "react-component-benchmark";
import osmCreateStore from "./otg/createStore";
import useStateListener from "./otg/useStateListener";
import stateValue from "./otg/stateValue";

// Redux Setup
const reduxSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

const reduxStore = configureStore({
  reducer: { counter: reduxSlice.reducer },
});

const ReduxCounter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);

  useEffect(() => {
    dispatch(reduxSlice.actions.increment());
  }, [dispatch]);

  return <div>Redux Count: {count}</div>;
};

const ReduxStoreValue = () => {
  const count = useSelector((state) => state.counter.count);
  return <div>Redux Count: {count}</div>;
};

// Zustand Setup
const useZustandStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  setCount: (value) => set({ count: value }),
}));

const ZustandCounter = () => {
  const { count, increment } = useZustandStore();
  useEffect(() => {
    increment();
  }, [increment]);

  return <div>Zustand Count: {count}</div>;
};

const ZustandStoreValue = () => {
  const { count } = useZustandStore();
  return <div>Zustand Count: {count}</div>;
};

// MobX Setup
function MobxCounterStore() {
  return makeAutoObservable({
    count: 0,
    increment() {
      this.count += 1;
    },
    reset() {
      this.count = 0;
    },
  });
}

const mobxCounterStore = MobxCounterStore();

const MobxCounter = observer(({ counter }) => {
  useEffect(() => {
    counter.increment();
  }, []);

  return <div>MobX Count: {counter.count}</div>;
});

const MobxStoreValue = observer(({ counter }) => {
  return <div>MobX Count: {counter.count}</div>;
});

// Origami-State-Manager (OSM) Setup
const osmStore = osmCreateStore({ count: 0 });

const OSMCounter = () => {
  const count = useStateListener("count", osmStore);
  useEffect(() => {
    stateValue("count", osmStore, (state) => state + 1);
  }, []);

  return <div>OSM Count: {count}</div>;
};

const OSMStoreValue = () => {
  const count = useStateListener("count", osmStore);

  return <div>OSM Count: {count}</div>;
};

const ReduxBenchmarkComponent = () => {
  const reduxRef = useRef(null);
  const [reduxResults, setReduxResults] = useState({});

  const handleComplete = (benchmarkResults, libName) => {
    delete benchmarkResults["samples"];
    if (libName === "redux") setReduxResults(benchmarkResults);
    console.log(libName);
    console.table(benchmarkResults);
  };

  useEffect(() => {
    reduxRef.current.start();
  }, []);

  return (
    <Provider store={reduxStore}>
      <div>
        <hr />

        <h3>Redux</h3>
        <button onClick={() => reduxRef.current.start()}>
          Start Redux Benchmark
        </button>
        <button onClick={() => setReduxResults({})}>Reset</button>
        <pre>{JSON.stringify(reduxResults, null, 2)}</pre>

        <ReduxStoreValue />
        <Benchmark
          component={() => <ReduxCounter />}
          onComplete={(result) => handleComplete(result, "redux")}
          samples={50}
          timeout={10000}
          ref={reduxRef}
          type='mount'
        ></Benchmark>
      </div>
    </Provider>
  );
};

const ZustandBenchmarkComponent = () => {
  const zustandRef = useRef(null);
  const [zustandResults, setZustandResults] = useState({});

  const handleComplete = (benchmarkResults, libName) => {
    delete benchmarkResults["samples"];
    if (libName === "zustand") setZustandResults(benchmarkResults);
    console.log(libName);
    console.table(benchmarkResults);
  };

  useEffect(() => {
    zustandRef.current.start();
  }, []);

  return (
    <div>
      <hr />
      <h3>Zustand</h3>
      <button onClick={() => zustandRef.current.start()}>
        Start Zustand Benchmark
      </button>
      <button onClick={() => setZustandResults({})}>Reset</button>
      <pre>{JSON.stringify(zustandResults, null, 2)}</pre>
      <ZustandStoreValue />

      <Benchmark
        component={() => <ZustandCounter />}
        onComplete={(result) => handleComplete(result, "zustand")}
        samples={50}
        timeout={10000}
        ref={zustandRef}
        type='mount'
      ></Benchmark>
    </div>
  );
};

const MobxBenchmarkComponent = () => {
  const mobxRef = useRef(null);
  const [mobxResults, setMobxResults] = useState({});

  const handleComplete = (benchmarkResults, libName) => {
    delete benchmarkResults["samples"];
    if (libName === "mobx") setMobxResults(benchmarkResults);
    console.log(libName);
    console.table(benchmarkResults);
  };

  useEffect(() => {
    mobxRef.current.start();
  }, []);

  return (
    <div>
      <hr />
      <h3>MobX</h3>
      <button onClick={() => mobxRef.current.start()}>
        Start MobX Benchmark
      </button>
      <button onClick={() => setMobxResults({})}>Reset</button>
      <pre>{JSON.stringify(mobxResults, null, 2)}</pre>
      <MobxStoreValue counter={mobxCounterStore} />
      <Benchmark
        component={() => <MobxCounter counter={mobxCounterStore} />}
        onComplete={(result) => handleComplete(result, "mobx")}
        samples={50}
        timeout={10000}
        ref={mobxRef}
        type='mount'
      ></Benchmark>
    </div>
  );
};

const OsmBenchmarkComponent = () => {
  const osmRef = useRef(null);
  const [osmResults, setOsmResults] = useState({});

  const handleComplete = (benchmarkResults, libName) => {
    delete benchmarkResults["samples"];
    if (libName === "osm") setOsmResults(benchmarkResults);
    console.log(libName);
    console.table(benchmarkResults);
  };

  useEffect(() => {
    osmRef.current.start();
  }, []);

  return (
    <div>
      <hr />
      <h3>Origami-State-Manager (OSM)</h3>
      <button onClick={() => osmRef.current.start()}>
        Start OSM Benchmark
      </button>
      <button onClick={() => setOsmResults({})}>Reset</button>
      <pre>{JSON.stringify(osmResults, null, 2)}</pre>
      <OSMStoreValue />

      <Benchmark
        component={() => <OSMCounter />}
        onComplete={(result) => handleComplete(result, "osm")}
        samples={50}
        timeout={10000}
        ref={osmRef}
        type='mount'
      ></Benchmark>
    </div>
  );
};

// Benchmark Component
const BenchmarkComponent = () => {
  return (
    <div>
      <h2>State Management Benchmark</h2>
      <p>Update counter state 100 times</p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {/* Redux benchmark */}
        <ReduxBenchmarkComponent />

        {/* Zustand benchmark */}
        <ZustandBenchmarkComponent />

        {/* Mobx benchmark */}
        <MobxBenchmarkComponent />

        {/* OSM benchmark */}
        <OsmBenchmarkComponent />
      </div>
    </div>
  );
};

export default BenchmarkComponent;
