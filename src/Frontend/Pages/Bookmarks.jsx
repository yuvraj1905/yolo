import React, { useEffect, useState } from "react";
import "../styles/Bookmarks.css";
import { useAuthContext } from "../Context/AuthContext";
import axios from "axios";
import HomepagePostCard from "../Components/HomepagePostCard";
import { PulseLoader } from "react-spinners";

const Bookmarks = () => {
  const {
    dispatchAuthState,
    authState: { currentUser, token, explorePageData },
  } = useAuthContext();
  const [bookmarks, setBookmarks] = useState();
  const [loading, setLoading] = useState(true);
  const override = {
    display: "block",
    margin: "20rem auto",
  };
  useEffect(() => {
    dispatchAuthState({
      type: "setSearchInput",
      payload: "",
    });
    dispatchAuthState({
      type: "showRecentSearches",
      payload: false,
    });
  }, []);
  useEffect(() => {
    const bookmarksFetcher = async () => {
      try {
        const res = await axios.get(`/api/users/bookmark/`, {
          headers: { authorization: token },
        });
        if (res.status === 200 || res.status === 201) {
          setBookmarks([...res.data.bookmarks]);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      } catch (err) {
        console.log(err);
      }
    };
    token && bookmarksFetcher();
  }, [currentUser, explorePageData]);
  useEffect(() => {
    dispatchAuthState({
      type: "showRecentSearches",
      payload: false,
    });
  }, []);
  return (
    <>
      {loading && (
        <PulseLoader
          color="#87CEEB"
          cssOverride={override}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      <div style={{ display: loading ? "none" : "" }} className="bookmarks">
        <h2>Bookmarks</h2>

        <section>
          {[...explorePageData].filter((post) =>
            bookmarks?.some((bm) => post._id === bm)
          ).length > 0 ? (
            [...explorePageData]
              .filter((post) => bookmarks?.some((bm) => post._id === bm))
              .map((post) => <HomepagePostCard data={post} key={post._id} />)
          ) : (
            <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
              No posts bookmarked !
            </h2>
          )}
        </section>
      </div>
    </>
  );
};

export default Bookmarks;
