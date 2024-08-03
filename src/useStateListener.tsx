import { useEffect, useState } from "react";

export default function useStateListener(
  stateName: string,
  store: Record<string, any>
) {
  const [stateValue, setStateValue] = useState(store[stateName].getValue());
  const [localState, setLocalState] = useState(store[stateName].getValue());

  useEffect(() => {
    store[stateName].registerListener((val: any) => setStateValue(val));
  }, [store, stateName]);

  useEffect(() => {
    if (stateValue !== localState) {
      setStateValue(localState);

      store[stateName].setValue(localState);
    }
  }, [localState]);

  useEffect(() => {
    if (stateValue !== localState) {
      setLocalState(stateValue);
    }
  }, [stateValue]);

  return { stateValue, setLocalState };
}
