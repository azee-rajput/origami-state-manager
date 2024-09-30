const setNestedValue = (
  keys: string[],
  obj: Record<string, any>,
  value: (state?: any) => any
): Record<string, any> => {
  let current = obj;

  // Create a shallow copy of the object so we don't modify the original
  const newObj = { ...current };

  // Reference to the new object that will be updated
  let pointer = newObj;

  keys.forEach((key, i) => {
    // If it's the last key, update the value
    if (i === keys.length - 1) {
      pointer[key] = value(pointer[key]);
    } else {
      // Ensure the next level is an object
      pointer[key] = { ...(pointer[key] || {}) }; // Shallow clone the next level
      pointer = pointer[key]; // Move the pointer to the next level
    }
  });

  return newObj; // Return the updated object
};

const getNestedValue = (keys: string[], obj: Record<string, any>): any => {
  let current = obj;

  for (const key of keys) {
    if (!current || typeof current !== "object") {
      return undefined;
    }
    current = current[key];
  }

  return current;
};

const stateValue = (
  stateName: string,
  store: Record<
    string,
    {
      value: any;
      subscribe: (subscriber: any) => void;
    }
  >,
  value?: (state?: any) => any
) => {
  const keys = stateName.split(".");
  const firstKey = keys[0];
  const remainingKeys = keys.slice(1);

  let state = store[firstKey]?.value;

  if (state === undefined) {
    throw new Error(`State ${stateName} not found in store.`);
  }

  if (value !== undefined) {
    if (remainingKeys.length === 0) {
      if (state !== value(state)) {
        store[firstKey].value = value(state);
      }
    } else {
      const updatedState = setNestedValue(remainingKeys, state, value);
      store[firstKey].value = updatedState;
    }
  }

  return remainingKeys.length === 0
    ? state
    : getNestedValue(remainingKeys, state);
};

export default stateValue;
