import { useNavigate } from "react-router-dom";
import store from "../../utils/store";
import { stateValue, useStateListener } from "origami-state-manager";

export default function Auth({ children }: { children: JSX.Element }) {
  const isLoggedIn = useStateListener("user.isLoggedIn", store);
  const app = useStateListener("app", store);
  const navigate = useNavigate();

  if (typeof isLoggedIn === "undefined") {
    return null;
  }

  if (isLoggedIn !== false) {
    if (app?.redirect) {
      const redirect = app?.redirect;
      stateValue("app", store, () => {});
      navigate(redirect);
      return null;
    }

    navigate("/profile");

    return null;
  }

  return children;
}
