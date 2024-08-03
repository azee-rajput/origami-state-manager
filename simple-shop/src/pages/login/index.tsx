import Auth from "../../components/auth";
import { login } from "../../utils";
import "./login.css";
export default function Login() {
  return (
    <Auth>
      <div>
        <h1>login Page</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <label>
            Email
            <br />
            <input type='email' name='email' />
          </label>
          <br />
          <label>
            password
            <br />
            <input type='password' name='password' />
          </label>
          <br />

          <button type='submit'>Login</button>
        </form>
      </div>
    </Auth>
  );
}
