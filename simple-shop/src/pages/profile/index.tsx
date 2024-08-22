import { useStateListener } from "origami-state-manager";
import store from "../../utils/store";

export default function Profile() {
  const { isLoggedIn } = useStateListener("user", store);

  return (
    <>
      <h1>User logged in: {`${isLoggedIn}`}</h1>
      {isLoggedIn ? (
        <button onClick={() => (store["user"].value = { isLoggedIn: false })}>
          logout
        </button>
      ) : (
        <button onClick={() => (store["user"].value = { isLoggedIn: true })}>
          Login
        </button>
      )}
    </>
  );
}
