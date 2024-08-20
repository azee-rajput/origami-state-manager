import { useNavigate } from "react-router-dom";
import store from "../../utils/store";
import { useStateListener } from "origami-state-manager";

export default function Auth({ children }: { children: JSX.Element }) {
  const { isLoggedIn } = useStateListener("user", store);
  const app = useStateListener("app", store);
  const navigate = useNavigate();

  if (typeof isLoggedIn === "undefined") {
    return null;
  }

  if (isLoggedIn !== false) {
    if (app?.redirect) {
      const redirect = app?.redirect;
      store["app"].value = {};
      navigate(redirect);
      return null;
    }

    navigate("/profile");

    return null;
  }

  return children;
}
