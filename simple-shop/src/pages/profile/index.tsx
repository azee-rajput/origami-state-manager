import { useStateListener } from "oopsies-state-master";
import store from "../../utils/store";

export default function Profile() {
  const { stateValue } = useStateListener("user", store);

  const { isLoggedIn } = stateValue;

  return <h1>User logged in: {`${isLoggedIn}`}</h1>;
}
