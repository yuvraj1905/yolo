import React from "react";
import "../styles/suggestedUsers.css";
import { followUserHandler } from "../Services/PostsManager";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";
import { toastMaker } from "../Services/toastMaker";

const SuggestedUsersCard = ({ data, searchHistoryCard, searchResultsCard }) => {
  const { profileAvatar, username, firstName, lastName, _id } = data;
  const {
    authState: { token },
    dispatchAuthState,
  } = useAuthContext();
  const navigate = useNavigate();
  return (
    <section
      className="suggestedUserCard cursorPointer"
      onClick={() => {
        // console.log("jojojojo");
        dispatchAuthState({
          type: "setSearchInput",
          payload: "",
        });
        dispatchAuthState({
          type: "showRecentSearches",
          payload: false,
        });
        dispatchAuthState({ type: "searchHistoryHandler", payload: username });
        navigate(`/profile/${username}`);
      }}
    >
      <span>
        <img
          src={profileAvatar}
          alt={username}
          className="profilepPictures cursorPointer"
          onClick={(e) => {
            // e.stopPropagation();
            navigate(`/profile/${username}`);
          }}
        />
      </span>
      <span className="followBtnNameUsername">
        <span
          className="followNameUsername cursorPointer"
          onClick={(e) => {
            // e.stopPropagation();
            navigate(`/profile/${username}`);
          }}
        >
          <p>
            {firstName}
            {""} {lastName}
          </p>
          <small style={{ color: "grey" }}>@{username}</small>
        </span>
        {!searchHistoryCard && !searchResultsCard && (
          <button
            className="followBtn cursorPointer"
            onClick={(e) => {
              e.stopPropagation();
              followUserHandler(username, token, dispatchAuthState);
              toastMaker(
                "success",
                `Started following ${firstName} ${lastName}`,
                "bottom-right"
              );
            }}
          >
            Follow
          </button>
        )}
        {searchHistoryCard && (
          <RxCrossCircled
            size={22}
            style={{ marginTop: ".4rem", marginRight: ".75rem" }}
            onClick={(e) => {
              e.stopPropagation();
              dispatchAuthState({
                type: "searchedResultClear",
                payload: username,
              });
            }}
            className="emptySearch cursorPointer "
          />
        )}
      </span>
    </section>
  );
};

export default SuggestedUsersCard;
