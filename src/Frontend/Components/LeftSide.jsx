import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import "../styles/LeftSide.css";
import { SlOptions } from "react-icons/sl";
import logo from "../assets/logo.png";
// import { BiSolidHomeCircle } from "react-icons/bi";
import {
  RiAccountCircleFill,
  RiAccountCircleLine,
  RiHome7Fill,
  RiHome7Line,
} from "react-icons/ri";
import { MdExplore, MdOutlineExplore } from "react-icons/md";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const LeftSide = () => {
  const {
    dispatchAuthState,
    authState: { currentUser, showRecentSearches },
  } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutBtn, setLogoutBtn] = useState(false);
  return (
    <div
      className="leftSide"
      onClick={() => {
        dispatchAuthState({
          type: "setSearchInput",
          payload: "",
        });
        dispatchAuthState({
          type: "showRecentSearches",
          payload: false,
        });
      }}
    >
      <section className="logo__and__navlinks">
        <div className="logo">
          {/* <img src={logo} alt="" height="60px" width="60px" /> */}
          <img
            className="cursorPointer"
            onClick={() => navigate("/")}
            src="https://play-lh.googleusercontent.com/4AkZWfEkCu4ni6c01hsTTDvGy96qVDllWpSg1i_EGln5nF9sbHs8X5mXBVWtjaQWfKab"
            alt=""
            height="60px"
            width="60px"
          />

          {/* <h2 style={{ fontFamily: "Orbitron" }}>YOLO</h2> */}
        </div>
        <section className="navlinks">
          <NavLink to="/">
            <span className="navlinkSpan">
              {location.pathname === "/" ? (
                <RiHome7Fill size={30} />
              ) : (
                <RiHome7Line size={30} />
              )}{" "}
              <p
                style={{
                  fontWeight: location.pathname === "/" ? 700 : 500,
                }}
              >
                Home
              </p>
            </span>
          </NavLink>
          <NavLink to="/explore">
            <span className="navlinkSpan">
              {location.pathname === "/explore" ? (
                <MdExplore size={30} />
              ) : (
                <MdOutlineExplore size={30} />
              )}{" "}
              <p
                style={{
                  fontWeight: location.pathname === "/explore" ? 700 : 500,
                }}
              >
                Explore
              </p>
            </span>
          </NavLink>
          <NavLink to="/bookmarks">
            {" "}
            <span style={{ marginLeft: "-0.14rem" }} className="navlinkSpan">
              {location.pathname === "/bookmarks" ? (
                <FaBookmark style={{ paddingRight: ".2rem" }} size={23} />
              ) : (
                <FaRegBookmark style={{ paddingRight: ".2rem" }} size={23} />
              )}{" "}
              <p
                style={{
                  fontWeight: location.pathname === "/bookmarks" ? 700 : 500,
                }}
              >
                Bookmark
              </p>
            </span>
          </NavLink>
          <NavLink to={`/profile/${currentUser.username}`}>
            <span className="navlinkSpan">
              {location.pathname === `/profile/${currentUser.username}` ? (
                <RiAccountCircleFill size={30} />
              ) : (
                <RiAccountCircleLine size={30} />
              )}{" "}
              <p
                style={{
                  fontWeight:
                    location.pathname === `/profile/${currentUser.username}`
                      ? 700
                      : 500,
                }}
              >
                Profile
              </p>
            </span>
          </NavLink>
        </section>
      </section>
      <section
        onClick={() => setLogoutBtn(!logoutBtn)}
        style={{ borderRadius: logoutBtn ? "40px" : "36px" }}
        className=" cursorPointer userName__and__logout"
      >
        <section className="userrr">
          <span>
            <img
              // style={{ marginLeft: "-1rem" }}
              src={currentUser.profileAvatar}
              className="profilepPictures"
              alt=""
            />
          </span>
          <span className="oneLine">
            <p style={{ fontWeight: 600 }}>
              {currentUser.firstName}
              {""} {currentUser.lastName}
            </p>
            <small style={{ color: "grey" }}>@{currentUser.username}</small>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatchAuthState({ type: "logoutHandler" });
              }}
              style={{ display: !logoutBtn ? "none" : "" }}
              className="logOut__btn cursorPointer"
            >
              Log out
            </button>
          </span>
        </section>
        <span>
          <SlOptions
            size={20}
            className="gobackfrompost"
            onClick={() => setLogoutBtn(!logoutBtn)}
          />
        </span>
      </section>
    </div>
  );
};

export default LeftSide;
