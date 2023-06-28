import React, { useState, useRef, useEffect } from "react";
import "../styles/Home.css";
import { useAuthContext } from "../Context/AuthContext";
import { BsEmojiSunglasses, BsImage } from "react-icons/bs";
import { MdInsertEmoticon } from "react-icons/md";
import HomepagePostCard from "../Components/HomepagePostCard";
import { formatDate } from "../../backend/utils/authUtils";
import { cloudinaryImageFetcher, newPostAdder } from "../Services/PostsManager";
import { v4 as uuid } from "uuid";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import EmojiPicker from "emoji-picker-react";
import { toastMaker } from "../Services/toastMaker";
import { useLocation } from "react-router-dom";

const Home = () => {
  const {
    dispatchAuthState,
    authState: {
      showRecentSearches,
      currentUser,
      homePageData: homeData,
      token,
      sortBy,
      emojiSectionOpened,
    },
  } = useAuthContext();

  const [homePageData, setHomePageData] = useState([...homeData]);
  const [loading, setLoading] = useState(true);
  // const [emojiSectionOpened, setEmojiSectionOpened] = useState(false);

  const [inputNewPost, setInputNewPost] = useState("");
  const [mediaNewPost, setMediaNewPost] = useState("");
  const [charLimit, setCharLimit] = useState(120);
  const inputChangeHandler = (e) => {
    setInputNewPost(e.target.value);
    setCharLimit(120 - e.target.value.length);
  };
  const imageRef = useRef(null);
  const newPostImageIconClickHandler = () => {
    imageRef.current.click();
  };
  const newPostImageChangeHandler = (e) => {
    const file = e.target.files[0];
    setMediaNewPost(file);
  };
  const override = {
    display: "block",
    margin: "20rem auto",
  };

  const finalData =
    sortBy === "latest"
      ? [...homePageData].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      : [...homePageData].sort((a, b) => b.likes.likeCount - a.likes.likeCount);
  useEffect(() => {
    dispatchAuthState({
      type: "setSearchInput",
      payload: "",
    });
    dispatchAuthState({
      type: "showRecentSearches",
      payload: false,
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setHomePageData([...homeData]);
  }, [homeData]);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, [currentUser.following]);

  // const location = useLocation();
  // useEffect(() => {
  //   location?.state?.from === "/login" &&
  //     toastMaker("success", "Login successfull! Yolo!", "bottom-right");
  // }, []);
  return (
    <>
      {loading ? (
        <PulseLoader
          color="#87CEEB"
          cssOverride={override}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div
          className="home"
          onClick={() => {
            showRecentSearches &&
              dispatchAuthState({
                type: "showRecentSearches",
                payload: false,
              });
            if (emojiSectionOpened) {
              // e.stopPropagation();
              dispatchAuthState({
                type: "setEmojiSectionOpened",
                payload: false,
              });
            }
          }}
        >
          <h2>Home</h2>
          <section className="createNewPost">
            <section className="imageAndNewPostInput">
              <img
                src={currentUser.profileAvatar}
                alt={currentUser.firstName}
                className="profilepPictures"
              />

              <textarea
                className="textarea"
                placeholder="What is happening?!"
                value={inputNewPost}
                onChange={inputChangeHandler}
              ></textarea>
            </section>
            {mediaNewPost && (
              <section>
                <img
                  src={URL.createObjectURL(mediaNewPost)}
                  className="newPostAddImagePreview"
                  alt=""
                />
                <ImCross
                  onClick={() => setMediaNewPost("")}
                  className="cursorPointer escPreview"
                  color="white"
                  size={19}
                />
              </section>
            )}
            <section className="lastLineOfNewPost">
              <span className="imageUploadAndEmojis ">
                <BsImage
                  size={20}
                  className="cursorPointer"
                  onClick={newPostImageIconClickHandler}
                />
                <BsEmojiSunglasses
                  className="cursorPointer"
                  size={20}
                  onClick={() =>
                    dispatchAuthState({
                      type: "setEmojiSectionOpened",
                      payload: !emojiSectionOpened,
                    })
                  }
                />

                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={imageRef}
                  onChange={newPostImageChangeHandler}
                />
                {/* <MdInsertEmoticon size={23} className="cursorPointer" /> */}
              </span>
              <span className="charcount__and__postBtn">
                {inputNewPost?.length > 0 && (
                  <strong
                    style={{
                      fontSize: "1.2rem",
                      color:
                        charLimit >= 50
                          ? "green"
                          : charLimit > 0 && charLimit < 50
                          ? "orange"
                          : "red",
                    }}
                  >
                    {charLimit}
                  </strong>
                )}
                <button
                  onClick={async (e) => {
                    if (mediaNewPost) {
                      setLoading(true);
                      setTimeout(() => {
                        setLoading(false);
                      }, 3000);
                      const cloudinaryImage = await cloudinaryImageFetcher(
                        mediaNewPost
                      );
                      newPostAdder(
                        {
                          _id: uuid(),
                          firstName: currentUser.firstName,
                          lastName: currentUser.lastName,
                          username: currentUser.username,
                          profileAvatar: currentUser.profileAvatar,
                          content: inputNewPost,

                          likes: {
                            likeCount: 0,
                            dislikedBy: [],
                            likedBy: [],
                          },

                          media: cloudinaryImage.url,
                          createdAt: formatDate(),
                          updatedAt: formatDate(),
                          comments: [],
                        },
                        token,
                        dispatchAuthState
                      );
                    } else {
                      setLoading(true);
                      setTimeout(() => {
                        setLoading(false);
                      }, 1200);
                      newPostAdder(
                        {
                          _id: uuid(),
                          firstName: currentUser.firstName,
                          lastName: currentUser.lastName,
                          username: currentUser.username,
                          profileAvatar: currentUser.profileAvatar,
                          content: inputNewPost,

                          likes: {
                            likeCount: 0,
                            dislikedBy: [],
                            likedBy: [],
                          },

                          media: "",
                          createdAt: formatDate(),
                          updatedAt: formatDate(),
                          comments: [],
                        },
                        token,
                        dispatchAuthState
                      );
                    }
                    setInputNewPost("");
                    setMediaNewPost("");
                  }}
                  className={
                    charLimit >= 0 && charLimit !== 120
                      ? "postBtn"
                      : " disabledPostBtn"
                  }
                  disabled={charLimit >= 0 && charLimit !== 120 ? false : true}
                >
                  Post
                </button>
              </span>
            </section>
            <section
              style={{ display: !emojiSectionOpened ? "none" : "" }}
              className="emojiPicker"
            >
              <EmojiPicker
                onEmojiClick={(emoji, event) => {
                  event.stopPropagation();
                  setInputNewPost((inputNewPost) => inputNewPost + emoji.emoji);
                  setCharLimit((charLimit) => charLimit - 2);
                }}
                searchDisabled={true}
                width={614}
                height={350}
                size={10}
                previewConfig={{ showPreview: false }}
                fontSize=".25rem"
              />
            </section>
          </section>
          <section className="filterPosts">
            <button
              style={{
                // borderRight: "2px solid #eff3f4",
                borderBottom:
                  sortBy === "latest" ? "4px solid #87ceeb" : "none",
              }}
              onClick={() => {
                dispatchAuthState({ type: "sortTrendy", payload: "latest" });
              }}
            >
              Latest
            </button>
            <button
              style={{
                borderBottom:
                  sortBy === "trending" ? "4px solid #87ceeb" : "none",
              }}
              onClick={() => {
                dispatchAuthState({ type: "sortTrendy", payload: "trending" });
              }}
            >
              Trending
            </button>
          </section>
          <section className="homepagePosts">
            {homePageData.length > 0 ? (
              finalData.map((post) => (
                <HomepagePostCard
                  loadingSetter={setLoading}
                  key={post._id}
                  data={post}
                />
              ))
            ) : (
              <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
                No posts to show! Follow people to increase reach !
              </h2>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default Home;
