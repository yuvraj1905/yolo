import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Frontend/Pages/Home";
import Login from "./Frontend/Pages/Login";
import Signup from "./Frontend/Pages/Signup";
import Explore from "./Frontend/Pages/Explore";
import Bookmarks from "./Frontend/Pages/Bookmarks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequiredAuth from "./Frontend/Components/RequiredAuth";
import LeftSide from "./Frontend/Components/LeftSide";
import RightSide from "./Frontend/Components/RightSide";
import { useAuthContext } from "./Frontend/Context/AuthContext";
import DetailPage from "./Frontend/Pages/DetailPage";
import ProfilePage from "./Frontend/Pages/ProfilePage";
import { useEffect, useState } from "react";
import ErrorPage from "./Frontend/Pages/ErrorPage";

function App() {
  const {
    authState: { token },
  } = useAuthContext();

  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, token]);
  return (
    <div className="App">
      {token && <LeftSide />}

      <Routes>
        <Route
          path="/"
          element={
            <RequiredAuth>
              <Home />
            </RequiredAuth>
          }
        />
        <Route
          path="/home"
          element={
            <RequiredAuth>
              <Home />
            </RequiredAuth>
          }
        />

        <Route
          path="/explore"
          element={
            <RequiredAuth>
              <Explore />
            </RequiredAuth>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <RequiredAuth>
              <Bookmarks />
            </RequiredAuth>
          }
        />

        <Route
          path="/details/:postId"
          element={
            <RequiredAuth>
              <DetailPage />
            </RequiredAuth>
          }
        />
        <Route
          path="/profile/:usernamee"
          element={
            <RequiredAuth>
              <ProfilePage />
            </RequiredAuth>
          }
        />

        <Route path="/login" element={<Login />} />
        {/* <Route path="/loginNew" element={<LoginNew />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {token && <RightSide />}
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
