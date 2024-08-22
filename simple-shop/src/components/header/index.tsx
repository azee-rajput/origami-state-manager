import { useStateListener } from "origami-state-manager";
import store from "../../utils/store";
import "./header.css";
export default function Header() {
  const { isLoggedIn } = useStateListener("user", store);

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
            store["user"].value = { isLoggedIn: false };
            store["favorite"].value = [];
          }}
        >
          logout
        </button>
      )}
    </header>
  );
}
