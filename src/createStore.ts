const createSignal = (
  initialValue: any,
  persistent?: {
    storeName: string;
    storeKeys: string[];
    storeSubscribe: Record<
      string,
      {
        value: any;
        subscribe: (subscriber: (value: any) => void) => void;
      }
    >;
  }
) => {
  const storeName = persistent?.storeName;
  const storeSubscribe = persistent?.storeSubscribe;
  const storeKeys = persistent?.storeKeys;
  let _value = initialValue;
  const subscribers: Array<(value: any) => void> = [];

  const notify = () => {
    subscribers.forEach((subscriber) => subscriber(_value));
  };

  return {
    get value() {
      return _value;
    },
    set value(v: any) {
      _value = v;
      notify();
      if (storeName && storeKeys && storeSubscribe) {
        localStorage.setItem(
          storeName,
          JSON.stringify(storeValues(storeSubscribe, storeKeys))
        );
      }
    },
    subscribe: (subscriber: (value: any) => void) => {
      subscribers.push(subscriber);
    },
  };
};

const storeValues = (
  subscribedStore: Record<
    string,
    {
      value: any;
      subscribe: (subscriber: (value: any) => void) => void;
    }
  >,
  keys: string[]
): Record<string, any> => {
  return keys.reduce((acc: Record<string, any>, current: string) => {
    acc[current] = subscribedStore[current]?.value;
    return acc;
  }, {});
};

const createStore = (
  store: Record<string, any>,
  storeName: string = ""
): Record<
  string,
  {
    value: any;
    subscribe: (subscriber: (value: any) => void) => void;
  }
> => {
  const storeObj =
    storeName && localStorage.getItem(storeName)
      ? JSON.parse(localStorage.getItem(storeName) || "{}")
      : store;

  if (storeName && !localStorage.getItem(storeName)) {
    localStorage.setItem(storeName, JSON.stringify(storeObj));
  }

  const storeKeys = Object.keys(storeObj);
  const storeSubscribe: Record<
    string,
    {
      value: any;
      subscribe: (subscriber: (value: any) => void) => void;
    }
  > = {};

  storeKeys.forEach((key) => {
    storeSubscribe[key] = createSignal(storeObj[key], {
      storeName,
      storeKeys,
      storeSubscribe,
    });
  });

  return storeSubscribe;
};

export default createStore;
