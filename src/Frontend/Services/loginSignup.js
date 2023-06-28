import axios from "axios";
import { toastMaker } from "../Services/toastMaker";

export const signupHandler = async (
  firstName,
  lastName,
  username,
  password,
  navigate
) => {
  try {
    const response = await axios.post(`/api/auth/signup`, {
      firstName,
      lastName,
      username,
      password,
    });
    if ((response.status = 200 || response.status === 201)) {
      toastMaker("success", "Sign Up successfull! Taking you to login page");
      navigate("/login");
    }
  } catch (err) {
    toastMaker("error", err.response.data.errors[0]);
  }
};

export const loginHandler = async (
  username,
  password,
  navigate,
  dispatchAuthState
) => {
  try {
    const response = await axios.post(`/api/auth/login`, {
      username,
      password,
    });
    if ((response.status = 200 || response.status === 201)) {
      localStorage.setItem("token", response.data.encodedToken);
      localStorage.setItem(
        "currentUser",
        JSON.stringify(response.data.foundUser)
      );
      dispatchAuthState({
        type: "dataSetter",
        payload: [response.data.encodedToken, { ...response.data.foundUser }],
      });
      navigate("/");
      // toastMaker("success", "Login successfull! ", "bottom-right");
    }
  } catch (err) {
    toastMaker("error", err.response.data.errors[0]);
  }
};
