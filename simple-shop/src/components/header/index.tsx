// import { useSubscribeState } from "oopsies-state-master";
import { useStateListener } from "oopsies-state-master";
import store from "../../utils/store";
import "./header.css";
export default function Header() {
  const { stateValue, setLocalState } = useStateListener("user", store);
  const { setLocalState: setFavorites } = useStateListener("favorite", store);

  const { isLoggedIn } = stateValue;

  return (
    <header>
      <a href='/' className='header-nav'>
        Home
      </a>
      <a href='/cart' className='header-nav'>
        Cart
      </a>
      <a href='/settings' className='header-nav'>
        Settings
      </a>
      <a href='/about' className='header-nav'>
        About
      </a>
      <a href='/profile' className='header-nav'>
        Profile
      </a>
      <a href='/login' className='header-nav'>
        Login
      </a>
      {!isLoggedIn ? null : (
        <button
          onClick={() => {
            setLocalState({ isLoggedIn: false });
            setFavorites([]);
          }}
        >
          logout
        </button>
      )}
    </header>
  );
}
