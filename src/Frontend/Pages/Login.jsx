import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { loginHandler } from "../Services/loginSignup";
import { useAuthContext } from "../Context/AuthContext";
import entryGif from "../assets/entryGif.gif";
import "../styles/loginPage.css";

const Login = () => {
  const navigate = useNavigate();
  const { dispatchAuthState } = useAuthContext();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(true);

  return (
    <div className="loginPage">
      <img src={entryGif} alt="" className="entryGif" />
      <section className="loginDetailsSection">
        <img
          className="entryLogo"
          src="https://play-lh.googleusercontent.com/4AkZWfEkCu4ni6c01hsTTDvGy96qVDllWpSg1i_EGln5nF9sbHs8X5mXBVWtjaQWfKab"
          alt="yoloLogo"
        />
        <form
          className="loginForm"
          onSubmit={(e) => {
            e.preventDefault();
            loginHandler(username, password, navigate, dispatchAuthState);
          }}
        >
          <input
            value={username}
            autoComplete="off"
            onChange={(e) => setusername(e.target.value)}
            placeholder="Enter username"
            type="text"
            id="input_username"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter password"
            type={showPass ? "password" : "text"}
            id="input_password"
          />
          <span
            className="seePassword cursorPointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <BiShow /> : <BiHide />}
          </span>
          <button className="loginBtn cursorPointer" type="submit">
            Login
          </button>
          <button
            onClick={(e) => {
              setusername("adarshbalak");
              setPassword("adarshBalak123");
              loginHandler(
                "adarshbalak",
                "adarshBalak123",
                navigate,
                dispatchAuthState
              );
            }}
            className="guestLoginBtn cursorPointer"
          >
            Login as guest
          </button>
          <p>
            New to Yolo?{" "}
            <span
              className="cursorPointer loginSignUPSwitch"
              style={{ fontWeight: 700 }}
              onClick={() => navigate("/signup")}
            >
              Sign up!
            </span>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Login;
