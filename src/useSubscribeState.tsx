import { useState } from "react";

export default function useSubscribeState(
  stateName: string,
  store: Record<string, any>
) {
  const [stateValue, setStateValue] = useState(store[stateName].getValue());

  store[stateName].registerListener((val: any) => setStateValue(val));

  return stateValue;
}
