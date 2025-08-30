/**
 * Creates a signal that can be used to store and notify subscribers of changes.
 *
 * @param {any} initialValue - The initial value of the signal.
 * @param {object} persistent - An optional object containing settings for persisting the signal's value.
 * @param {string} persistent.storeName - The name of the store where the signal's value will be persisted.
 * @param {string[]} persistent.storeKeys - An array of keys that will be used to store the signal's value.
 * @param {object} persistent.storeSubscribe - An object containing subscription settings for the store.
 * @return {object} An object with get and set methods for the signal's value, as well as a subscribe method for adding subscribers.
 */
function createSignal(initialValue, persistent) {
  const storeName = persistent?.storeName;
  const storeSubscribe = persistent?.storeSubscribe;
  const storeKeys = persistent?.storeKeys;
  let _value = initialValue;
  let subscribers = [];

  function notify() {
    for (let subscriber of subscribers) {
      subscriber(_value);
    }
  }

  return {
    get value() {
      return _value;
    },
    set value(v) {
      _value = v;
      notify();
      if (storeName && storeKeys && storeSubscribe) {
        localStorage.setItem(
          storeName,
          JSON.stringify(storeValues(storeSubscribe, storeKeys))
        );
      }
    },
    subscribe: (subscriber) => {
      subscribers.push(subscriber);
    },
  };
}

/**
 * Generates a new object with the values of the specified keys from the subscribed store.
 *
 * @param {object} subscribedStore - The subscribed store object.
 * @param {Array<string>} keys - The keys to extract from the subscribed store.
 * @return {object} The new object with the extracted values.
 */
function storeValues(subscribedStore, keys) {
  const store = keys.reduce((acc, current) => {
    acc[current] = subscribedStore[current]?.value;
    return acc;
  }, {});

  return store;
}

/**
 * Creates a store with the given initial state and store name.
 *
 * If a store name is provided, it will be used to store the state in local storage to persist the store.
 * If the store name is not found in local storage, the initial state will be used.
 *
 * @param {object} store - The initial state of the store.
 * @param {string} [storeName=""] - The name of the store.
 * @return {object} - The store object with subscribe functionality.
 */
export default function createStore(store, storeName = "") {
  const storeObj =
    storeName && localStorage.getItem(storeName)
      ? JSON.parse(localStorage.getItem(storeName) || "{}")
      : store;
  if (storeName && !localStorage.getItem(storeName)) {
    localStorage.setItem(storeName, JSON.stringify(storeObj));
  }
  const storeKeys = Object.keys(storeObj);
  const storeSubscribe = {};
  storeKeys.forEach((key) => {
    storeSubscribe[key] = createSignal(storeObj[key], {
      storeName,
      storeKeys,
      storeSubscribe,
    });
  });

  return storeSubscribe;
}
