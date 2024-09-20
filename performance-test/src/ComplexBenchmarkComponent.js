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

const initialStore = {
  user: {
    name: "John Doe",
    settings: {
      theme: "dark",
      notifications: true,
    },
  },
  items: [
    { id: 1, value: "Item 1" },
    { id: 2, value: "Item 2" },
  ],
};

// Redux Slice with Complex State
const reduxSlice = createSlice({
  name: "complexState",
  initialState: initialStore,
  reducers: {
    updateUserName: (state, action) => {
      state.user.name = action.payload;
    },
    toggleNotifications: (state) => {
      state.user.settings.notifications = !state.user.settings.notifications;
    },
    addItem: (state, action) => {
      state.items.push({ id: state.items.length + 1, value: action.payload });
    },
  },
});

const reduxStore = configureStore({
  reducer: { complexState: reduxSlice.reducer },
});

const ReduxComplexState = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.complexState.user);
  const items = useSelector((state) => state.complexState.items);

  useEffect(() => {
    dispatch(reduxSlice.actions.updateUserName("Jane Doe"));
    dispatch(reduxSlice.actions.toggleNotifications());
    dispatch(reduxSlice.actions.addItem("New Item"));
  }, [dispatch]);

  return (
    <div>
      <div>
        User: {user.name}, Notifications:{" "}
        {user.settings.notifications.toString()}
      </div>
      <div>
        Items:{" "}
        {items.map((item) => (
          <div key={item.id}>{item.value}</div>
        ))}
      </div>
    </div>
  );
};

const ReduxStoreValue = () => {
  const user = useSelector((state) => state.complexState.user);
  const items = useSelector((state) => state.complexState.items);

  return (
    <div>
      <div>
        User: {user.name}, Notifications:{" "}
        {user.settings.notifications.toString()}
      </div>
      <div>
        Items({items.length}):{" "}
        {/* {items.map((item) => (
          <div key={item.id}>{item.value}</div>
        ))} */}
      </div>
    </div>
  );
};

// Zustand Store with Complex State
const useZustandStore = create((set) => ({
  user: initialStore.user,
  items: initialStore.items,
  updateUserName: (name) => set((state) => ({ user: { ...state.user, name } })),
  toggleNotifications: () =>
    set((state) => ({
      user: {
        ...state.user,
        settings: {
          ...state.user.settings,
          notifications: !state.user.settings.notifications,
        },
      },
    })),
  addItem: (value) =>
    set((state) => ({
      items: [...state.items, { id: state.items.length + 1, value }],
    })),
}));

const ZustandComplexState = () => {
  const { user, items, updateUserName, toggleNotifications, addItem } =
    useZustandStore();

  useEffect(() => {
    updateUserName("Jane Doe");
    toggleNotifications();
    addItem("New Item");
  }, [updateUserName, toggleNotifications, addItem]);

  return (
    <div>
      <div>
        User: {user.name}, Notifications:{" "}
        {user.settings.notifications.toString()}
      </div>
      <div>
        Items:{" "}
        {items.map((item) => (
          <div key={item.id}>{item.value}</div>
        ))}
      </div>
    </div>
  );
};

const ZustandStoreValue = () => {
  const { user, items } = useZustandStore();

  return (
    <div>
      <div>
        User: {user.name}, Notifications:{" "}
        {user.settings.notifications.toString()}
      </div>
      <div>
        Items({items.length}):{" "}
        {/* {items.map((item) => (
          <div key={item.id}>{item.value}</div>
        ))} */}
      </div>
    </div>
  );
};

// MobX Store with Complex State
function MobxComplexStateStore() {
  return makeAutoObservable({
    user: initialStore.user,
    items: initialStore.items,
    updateUserName(name) {
      this.user.name = name;
    },
    toggleNotifications() {
      this.user.settings.notifications = !this.user.settings.notifications;
    },
    addItem(value) {
      this.items.push({ id: this.items.length + 1, value });
    },
  });
}

const mobxComplexStateStore = MobxComplexStateStore();

const MobxComplexState = observer(({ state }) => {
  useEffect(() => {
    state.updateUserName("Jane Doe");
    state.toggleNotifications();
    state.addItem("New Item");
  }, []);

  return (
    <div>
      <div>
        User: {state.user.name}, Notifications:{" "}
        {state.user.settings.notifications.toString()}
      </div>
      <div>
        Items:{" "}
        {state.items.map((item) => (
          <div key={item.id}>{item.value}</div>
        ))}
      </div>
    </div>
  );
});

const MobxStoreValue = observer(({ state }) => {
  return (
    <div>
      <div>
        User: {state.user.name}, Notifications:{" "}
        {state.user.settings.notifications.toString()}
      </div>
      <div>
        Items({state.items.length}):{" "}
        {/* {items.map((item) => (
          <div key={item.id}>{item.value}</div>
        ))} */}
      </div>
    </div>
  );
});
// OSM Store with Complex State
const osmStore = osmCreateStore(initialStore);

const OSMComplexState = () => {
  const user = useStateListener("user", osmStore);
  const items = useStateListener("items", osmStore);

  useEffect(() => {
    stateValue("user", osmStore, (state) => ({ ...state, name: "Jane Doe" }));
    stateValue("user", osmStore, (state) => ({
      ...state,
      settings: {
        ...state.settings,
        notifications: !state.settings.notifications,
      },
    }));
    stateValue("items", osmStore, (state) => [
      ...state,
      { id: state.length + 1, value: "New Item" },
    ]);
  }, []);

  return (
    <div>
      <div>
        User: {user.name}, Notifications:{" "}
        {user.settings.notifications.toString()}
      </div>
      <div>
        Items:{" "}
        {items.map((item) => (
          <div key={item.id}>{item.value}</div>
        ))}
      </div>
    </div>
  );
};

const OSMStoreValue = () => {
  const user = useStateListener("user", osmStore);
  const items = useStateListener("items", osmStore);

  return (
    <div>
      <div>
        User: {user.name}, Notifications:{" "}
        {user.settings.notifications.toString()}
      </div>
      <div>
        Items({items.length}):{" "}
        {/* {items.map((item) => (
          <div key={item.id}>{item.value}</div>
        ))} */}
      </div>
    </div>
  );
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
          component={() => <ReduxComplexState />}
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
        component={() => <ZustandComplexState />}
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
      <MobxStoreValue state={mobxComplexStateStore} />
      <Benchmark
        component={() => <MobxComplexState state={mobxComplexStateStore} />}
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
        component={() => <OSMComplexState />}
        onComplete={(result) => handleComplete(result, "osm")}
        samples={50}
        timeout={10000}
        ref={osmRef}
        type='mount'
      ></Benchmark>
    </div>
  );
};

const ComplexBenchmarkComponent = () => {
  return (
    <div>
      <h2>Complex State Management Benchmark</h2>
      <p>update username and notification state. add 100 items in the list</p>
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

export default ComplexBenchmarkComponent;
