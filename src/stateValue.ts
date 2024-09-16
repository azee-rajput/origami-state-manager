function setNestedValue(
  keys: string[],
  obj: Record<string, any>,
  value: (state?: any) => any
): Record<string, any> {
  let current = obj;

  // Create a shallow copy of the object so we don't modify the original
  const newObj = { ...current };

  // Reference to the new object that will be updated
  let pointer = newObj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    // If it's the last key, update the value
    if (i === keys.length - 1) {
      pointer[key] = value(pointer[key]);
    } else {
      // Ensure the next level is an object
      pointer[key] = { ...(pointer[key] || {}) }; // Shallow clone the next level
      pointer = pointer[key]; // Move the pointer to the next level
    }
  }

  return newObj; // Return the updated object
}

function getNestedValue(keys: string[], obj: Record<string, any>): any {
  let current = obj;

  for (const key of keys) {
    if (!current || typeof current !== "object") {
      return undefined;
    }
    current = current[key];
  }

  return current;
}

/**
 * Retrieves a nested value from a state object, and optionally updates it if a
 * value is provided. This function is useful for retrieving nested values from
 * a state object, and for updating nested values in a state object.
 *
 * If a `value` is provided, it will be used to update the nested value. The
 * function will return the updated nested value.
 *
 * @param {string} stateName - The name of the state object.
 * @param {Record<string, any>} store - The store containing the state object.
 * @param {(state?: any) => any} [value] - The value to update the nested value with.
 * @return {any} The nested value, or the updated nested value if a `value` was provided.
 */
export default function stateValue(
  stateName: string,
  store: {
    [x: string]: {
      value: any;
      subscribe: (subscriber: any) => void;
    };
  },
  value?: (state?: any) => any
) {
  const keys = stateName.split(".");
  const firstKey = keys[0];
  const remainingKeys = keys.slice(1);

  let state = store[firstKey]?.value;

  if (!state) {
    throw new Error(`State ${stateName} not found in store.`);
  }

  if (value !== undefined) {
    if (remainingKeys.length === 0) {
      if (state !== value) {
        store[firstKey].value = value(state); // Direct update if it's the first level
      }
    } else {
      // Get updated state with the new nested value
      const updatedState = setNestedValue(remainingKeys, state, value);
      store[firstKey].value = updatedState; // Set the new state
    }
  }

  // Return the nested value if no update is required
  return remainingKeys.length === 0
    ? state
    : getNestedValue(remainingKeys, state);
}
