import { useEffect, useState } from "react";

/**
 * A React hook to get updated state from the store.
 *
 * @param {string} stateName - The name of the state in the store.
 * @param {Record<string, any>} store - The store containing the state.
 * @return {any} The current value of the state.
 */
export default function useStateListener(
  stateName: string,
  store: Record<string, any>
) {
  const [stateValue, setStateValue] = useState(store[stateName].value);

  useEffect(() => {
    store[stateName].subscribe((state: any) => {
      setStateValue(state);
    });
  }, [stateName, store]);

  return stateValue;
}
