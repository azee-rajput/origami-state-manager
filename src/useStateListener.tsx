import { useEffect, useReducer } from "react";
import stateValue from "./stateValue";

const useStateListener = (
  stateName: string,
  store: Record<string, any>
): any => {
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
};

export default useStateListener;
