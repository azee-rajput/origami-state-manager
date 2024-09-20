import createStore from "./createStore";
import stateValue from "./stateValue";

describe("createStore", () => {
  afterEach(() => {
    // Clear the mock storage
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("should initialize store with initial values", () => {
    const initialStore = {
      someKey: "initialValue",
    };

    const store: any = createStore(initialStore);

    expect(store.someKey.value).toBe("initialValue");
  });

  test("should update store values and reflect changes", () => {
    const initialStore = {
      someKey: "initialValue",
    };

    const store: any = createStore(initialStore);
    store.someKey.value = "newValue";

    expect(store.someKey.value).toBe("newValue");
  });

  test("should persist store values to localStorage", () => {
    const initialStore = {
      someKey: "initialValue",
    };

    jest.spyOn(Storage.prototype, "setItem");
    Storage.prototype.setItem = jest.fn();

    createStore(initialStore, "testStore");

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "testStore",
      JSON.stringify({ someKey: "initialValue" })
    );
  });

  test("should retrieve store values from localStorage", () => {
    // Set a value in localStorage directly

    jest.spyOn(Storage.prototype, "getItem");
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({ someKey: "storedValue" })
    );

    const store: any = createStore({}, "testStore");

    expect(store["someKey"].value).toBe("storedValue");
  });

  test("should handle top level values", () => {
    const initialStore = {
      user: {
        isLoggedIn: false,
      },
    };

    const store: any = createStore(initialStore);

    expect(JSON.stringify(store["user"].value)).toBe(
      JSON.stringify({
        isLoggedIn: false,
      })
    );

    store["user"].value = { isLoggedIn: true };

    expect(JSON.stringify(store["user"].value)).toBe(
      JSON.stringify({ isLoggedIn: true })
    );
  });
});
