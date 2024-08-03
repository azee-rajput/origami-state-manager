import store from "../../utils/store";

export default function Auth({ children }: { children: JSX.Element }) {
  const { isLoggedIn } = store["user"].getValue();

  if (typeof isLoggedIn === "undefined") {
    return null;
  }

  if (isLoggedIn !== false) {
    window.location.href = "/profile";

    return null;
  }

  return children;
}
