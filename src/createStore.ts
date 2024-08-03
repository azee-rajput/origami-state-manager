/**
 * Generates a new object with the values of the specified keys from the subscribed store.
 *
 * @param {Record<string, any>} subscribedStore - The subscribed store object.
 * @param {Array<string>} keys - The keys to extract from the subscribed store.
 * @return {Record<string, any>} The new object with the extracted values.
 */
function storeValues(
  subscribedStore: Record<string, any>,
  keys: Array<string>
): Record<string, any> {
  const store = keys.reduce((acc: Record<string, any>, current: string) => {
    acc[current] = subscribedStore[current].getValue();
    return acc;
  }, {});

  return store;
}

/**
 * Creates a store object with the given store object and store name. If a store name is provided,
 * the store object is retrieved from local storage if it exists, otherwise it is created. The store
 * object is then subscribed to changes and the store object is returned. If a store name is provided,
 * the store object is saved to local storage when it is updated.
 *
 * @param {Record<string, any>} store - The store object to be created.
 * @param {string} [storeName=""] - The name of the store object.
 * @return {Record<string, any>} The subscribed store object.
 */
export default function createStore(
  store: Record<string, any>,
  storeName: string = ""
) {
  const storeObj =
    storeName && localStorage.getItem(storeName)
      ? JSON.parse(localStorage.getItem(storeName) || "{}")
      : store;
  if (storeName && !localStorage.getItem(storeName)) {
    localStorage.setItem(storeName, JSON.stringify(storeObj));
  }
  const storeKeys = Object.keys(storeObj);
  const storeSubscribe: {
    [x: string]: {
      value: any;
      getValue: () => any;
      setValue: (val: any) => void;
      stateListener: (val: any) => void;
      registerListener: (callback: (val: any) => void) => void;
    };
  } = {};
  storeKeys.forEach((key) => {
    storeSubscribe[key] = {
      value: storeObj[key],
      stateListener: function (val: any) {},

      registerListener: function (callback: (val: any) => void) {
        this.stateListener = callback;
      },
      getValue: function () {
        return this.value;
      },
      setValue: function (val: any) {
        this.value = val;
        this.stateListener(val);
        if (storeName) {
          localStorage.setItem(
            storeName,
            JSON.stringify(storeValues(storeSubscribe, storeKeys))
          );
        }
      },
    };
  });

  return storeSubscribe;
}
