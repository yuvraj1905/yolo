import React, { useEffect, useRef, useState } from "react";
import "../styles/RightSide.css";
import { useAuthContext } from "../Context/AuthContext";
import SuggestedUsersCard from "./SuggestedUsersCard";
import { BiSearchAlt2 } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { PulseLoader } from "react-spinners";

const RightSide = () => {
  const {
    dispatchAuthState,
    authState: {
      token,
      searchInput,
      suggestedUsers,
      searchHistory,
      showRecentSearches,
      currentUser,
    },
  } = useAuthContext();
  const [allUsers, setAllUsers] = useState([]);
  const override = {
    display: "block",
    margin: "7rem auto",
  };
  const [loading, setLoading] = useState(true);

  const searchResultArray = [...allUsers]?.filter(
    ({ username, firstName, lastName }) =>
      currentUser.username !== username &&
      (username.toLowerCase().includes(searchInput.toLowerCase()) ||
        firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        lastName.toLowerCase().includes(searchInput.toLowerCase()))
  );

  const searchBarRef = useRef();
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get("/api/users");
        if (res.status === 200) setAllUsers([...res.data.users]);
      } catch (err) {
        console.log(err);
      }
    };
    token && getAllUsers();
    // setTimeout(() => {
    // setLoading(false);
    // }, 2500);
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [currentUser.following]);

  return (
    <div
      className="rightSide"
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
      <section className="searchUsersSpan">
        <section
          onClick={(e) => {
            e.stopPropagation();
            //   if (showRecentSearches) {
            //     dispatchAuthState({
            //       type: "showRecentSearches",
            //       payload: true,
            //     });
            //     searchBarRef.current.focus();
            //   }
          }}
          className="searchUserResult"
          style={{ display: !showRecentSearches ? "none" : "" }}
        >
          {searchInput.length === 0 ? (
            <section>
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: ".5rem",
                }}
              >
                <p style={{ fontWeight: 600 }}>Recent</p>
                <p
                  onClick={() =>
                    dispatchAuthState({ type: "clearSearchHistory" })
                  }
                  className="cursorPointer clearBtn"
                >
                  Clear history
                </p>
              </span>
              <span>
                {searchHistory?.length > 0 &&
                  allUsers?.length > 0 &&
                  [...searchHistory].reverse()?.map((search) => {
                    const userFound = allUsers?.find(
                      ({ username, firstName, lastName }) =>
                        username.toLowerCase() === search.toLowerCase() ||
                        firstName.toLowerCase() === search.toLowerCase() ||
                        lastName.toLowerCase() === search.toLowerCase()
                    );
                    if (userFound) {
                      return (
                        <SuggestedUsersCard
                          data={userFound}
                          searchHistoryCard
                        />
                      );
                    } else return null;
                  })}
                {searchHistory?.length < 1 && (
                  <p
                    style={{
                      margin: "auto",
                      textAlign: "center",
                      marginTop: "5rem",
                    }}
                  >
                    No recent searches
                  </p>
                )}
              </span>
            </section>
          ) : (
            <section>
              {searchResultArray?.length > 0 ? (
                searchResultArray.map((user) => (
                  <SuggestedUsersCard data={user} searchResultsCard />
                ))
              ) : (
                <p
                  style={{
                    margin: "auto",
                    textAlign: "center",
                    marginTop: "5rem",
                  }}
                >
                  No recent searches
                </p>
              )}
            </section>
          )}
        </section>
        <BiSearchAlt2 />
        <input
          onFocus={() =>
            dispatchAuthState({
              type: "showRecentSearches",
              payload: true,
            })
          }
          onClick={(e) => e.stopPropagation()}
          // onBlur={() =>
          //   dispatchAuthState({
          //     type: "showRecentSearches",
          //     payload: false,
          //   })
          // }
          ref={searchBarRef}
          value={searchInput}
          onChange={(e) =>
            dispatchAuthState({
              type: "setSearchInput",
              payload: e.target.value,
            })
          }
          className="search__users"
          type="text"
          placeholder="search users"
        />
        {searchInput.length > 0 && (
          <RxCross2
            onClick={() =>
              dispatchAuthState({ type: "setSearchInput", payload: "" })
            }
            className="emptySearch cursorPointer "
          />
        )}
      </section>
      {loading && (
        <PulseLoader
          color="#87CEEB"
          cssOverride={override}
          size={18}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}

      {suggestedUsers?.length > 0 ? (
        <section
          style={{ display: loading ? "none" : "" }}
          className="suggestedUsersSection"
        >
          <h2>Suggested users</h2>
          <section className="suggested__user">
            {[...suggestedUsers?.slice(0, 3)]?.map((user) => (
              <SuggestedUsersCard key={user._id} data={user} />
            ))}
          </section>
        </section>
      ) : (
        <section
          style={{ display: loading ? "none" : "" }}
          className="suggestedUsersSection"
        >
          <h2>No more suggestions</h2>
        </section>
      )}
    </div>
  );
};

export default RightSide;
