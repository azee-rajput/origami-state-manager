import { useEffect, useReducer } from "react";
import stateValue from "./stateValue";

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
  const firstKey = stateName.split(".")[0];

  const [, dispatch] = useReducer(
    (currentState: any, newValue: any) => newValue,
    store[firstKey]?.value
  );

  useEffect(() => {
    // Subscribe to top-level changes
    store[firstKey].subscribe((state: any) => {
      dispatch(state);
    });
  }, [firstKey, store]);

  // Use `stateValue` to get nested values if necessary
  return stateValue(stateName, store);
}
