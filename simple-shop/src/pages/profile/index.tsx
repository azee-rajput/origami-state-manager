import { stateValue, useStateListener } from "origami-state-manager";
import store from "../../utils/store";

export default function Profile() {
  const isLoggedIn = useStateListener("user.isLoggedIn", store);
  const user = useStateListener("user", store);
  const favorite = useStateListener("favorite", store);
  const cart = useStateListener("cart", store);

  return (
    <>
      <h1>User logged in: {`${isLoggedIn}`}</h1>
      <pre>user: {`${JSON.stringify(user || {})}`}</pre>
      <pre>cart: {`${JSON.stringify(cart || {})}`}</pre>
      <pre>favorite: {`${JSON.stringify(favorite || {})}`}</pre>
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
