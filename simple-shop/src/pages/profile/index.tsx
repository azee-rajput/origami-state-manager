import { stateValue, useStateListener } from "origami-state-manager";
import store from "../../utils/store";

export default function Profile() {
  const isLoggedIn = useStateListener("user.isLoggedIn", store);
  const app = useStateListener("app", store);

  return (
    <>
      <h1>User logged in: {`${isLoggedIn}`}</h1>
      <h1>app: {`${app}`}</h1>
      {isLoggedIn ? (
        <button
          onClick={() =>
            stateValue("user", store, () => ({ isLoggedIn: false }))
          }
        >
          logout
        </button>
      ) : (
        <button
          onClick={() =>
            stateValue("user", store, () => ({ isLoggedIn: true }))
          }
        >
          Login
        </button>
      )}
    </>
  );
}
