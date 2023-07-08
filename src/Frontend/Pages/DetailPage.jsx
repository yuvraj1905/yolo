import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import {
  AiFillHeart,
  AiOutlineArrowLeft,
  AiOutlineHeart,
} from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import "../styles/detailsPage.css";
import { BiComment } from "react-icons/bi";
import { BsBookmark, BsImage } from "react-icons/bs";
import {
  addBookmarkHandler,
  addCommentHandler,
  cloudinaryImageFetcher,
  dislikeHandler,
  followUserHandler,
  likeHandler,
  postDeleteHandler,
  postUpdater,
  removeBookmarkHandler,
  unfollowUserHandler,
} from "../Services/PostsManager";
import axios from "axios";
import CommentCard from "../Components/CommentCard";
import { formatDate } from "../../backend/utils/authUtils";
import { v4 as uuid } from "uuid";
import { ImCross } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { getPostDate } from "../Services/postDateCalculator";
import { PulseLoader } from "react-spinners";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toastMaker } from "../Services/toastMaker";

const DetailPage = () => {
  const [loading, setLoading] = useState(true);
  const [dataa, setDataa] = useState({});
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { postId } = useParams();
  const {
    dispatchAuthState,
    authState: {
      token,
      explorePageData,
      currentUser: {
        bookmarks,
        following,
        username: currentUser_username,
        profileAvatar: currentUser_profileAvatar,
      },
    },
  } = useAuthContext();

  const {
    username,
    content,
    firstName,
    lastName,
    likes,
    media,
    profileAvatar,
    createdAt,
    _id,
    updatedAt,
  } = dataa;

  const [likeModalOpened, setLikeModalOpened] = useState(false);
  const [editOptionsModal, setEditOptionsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const inputRefDetailsPage = useRef(null);
  const editImgRefDetailsPage = useRef(null);
  // console.log(content);
  const [editedContentInput, setEditedContentInput] = useState(content);
  const [editedContentMedia, setEditedContentMedia] = useState(media);
  const [editedContentMediaFile, setEditedContentMediaFile] = useState("");
  const editPostImageIconClickHandler = () => {
    editImgRefDetailsPage.current.click();
  };
  const editPostImageChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedContentMediaFile(file);
      setEditedContentMedia(URL.createObjectURL(file));
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/posts/${postId}`);
      const resComment = await axios(`/api/comments/${postId}`);
      // console.log(res.data.post);
      if (res.status === 200 || res.status === 201) {
        const resUser = await axios.get(`/api/users/${res.data.post.username}`);
        // console.log(resUser);
        setDataa({
          ...res.data.post,
          profileAvatar: resUser.data.user.profileAvatar,
        });
        setEditedContentInput(res.data.post.content);
        setEditedContentMedia(res.data.post.media);
      }
      if (resComment.status === 200 || resComment.status === 201) {
        setComments(resComment.data.comments);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const addCommentHandler = (
  //   from_firstName,
  //   from_lastName,
  //   from_username,
  //   from_profileAvatar,
  //   commentToAdd,
  //   postID
  // ) => {
  //   dispatchAuthState({
  //     type: "newCommentAdder",
  //     payload: [
  //       postID,
  //       {
  //         _id: uuid(),
  //         firstName: from_firstName,
  //         lastName: from_lastName,
  //         username: from_username,
  //         profileAvatar: from_profileAvatar,
  //         createdAt: formatDate(),
  //         updatedAt: formatDate(),
  //         comment: commentToAdd,
  //       },
  //     ],
  //   });
  // };

  const override = {
    display: "block",
    margin: "20rem auto",
  };

  useEffect(() => {
    if (inputRefDetailsPage.current) {
      inputRefDetailsPage.current.focus();
    }
  }, [showEditModal]);

  useEffect(() => {
    const fetchDataFunction = async () => {
      await fetchData();
    };
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    fetchDataFunction();
    // setEditedContentInput(content);
    // setEditedContentMedia(media);
  }, [explorePageData]);

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
      <div style={{ display: loading ? "none" : "" }} className="detailsPage">
        <section className="goBackBtn">
          <AiOutlineArrowLeft
            size={18}
            className="cursorPointer gobackfrompost"
            onClick={() =>
              location?.state?.from
                ? navigate(location?.state?.from)
                : navigate("/")
            }
          />
          <h1>Post</h1>
        </section>
        <section className="dpAndUsernameDetails ">
          <span>
            <img
              onClick={() =>
                navigate(`/profile/${username}`, {
                  state: { from: location.pathname },
                })
              }
              className="profilepPictures cursorPointer"
              src={
                currentUser_username === username
                  ? currentUser_profileAvatar
                  : profileAvatar
              }
              alt={username}
            />
          </span>
          <span className="nameDetails ">
            <span className="naming">
              <h3
                className="cursorPointer"
                onClick={() =>
                  navigate(`/profile/${username}`, {
                    state: { from: location.pathname },
                  })
                }
              >
                {firstName}
                {""} {lastName}
              </h3>
              <p
                className="cursorPointer"
                onClick={() =>
                  navigate(`/profile/${username}`, {
                    state: { from: location.pathname },
                  })
                }
                style={{ color: "grey", fontSize: ".9rem" }}
              >
                @{username}
              </p>
              <p style={{ color: "grey", fontSize: ".9rem" }}>
                ·{getPostDate(createdAt)}
              </p>
              {String(new Date(createdAt)) !== String(new Date(updatedAt)) && (
                <small style={{ color: "grey", fontSize: ".9rem" }}>
                  ·Edited
                </small>
              )}
            </span>
            <SlOptions
              size={20}
              className="gobackfrompost cursorPointer"
              onClick={() => setEditOptionsModal(!editOptionsModal)}
            />
            <span
              style={{ display: !editOptionsModal ? "none" : "" }}
              className="optionsModal"
            >
              {currentUser_username === username && (
                <button
                  className="postOptionBtns cursorPointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEditModal(true);
                    setEditOptionsModal(false);
                  }}
                >
                  Edit
                </button>
              )}
              {currentUser_username === username && (
                <button
                  className="postOptionBtns cursorPointer"
                  onClick={async (e) => {
                    e.stopPropagation();
                    await postDeleteHandler(_id, token, dispatchAuthState);
                    location?.state?.from
                      ? navigate(location?.state?.from)
                      : navigate("/");
                  }}
                >
                  Delete
                </button>
              )}
              {currentUser_username !== username && (
                <button
                  onClick={() => {
                    // setEditProfileModalOpened(true);
                    following.find((user) => user.username === username)
                      ? unfollowUserHandler(username, token, dispatchAuthState)
                      : followUserHandler(username, token, dispatchAuthState);
                  }}
                  className="postOptionBtns cursorPointer"
                >
                  {following.find((user) => user.username === username)
                    ? "Unfollow"
                    : "Follow"}
                </button>
              )}
            </span>
          </span>
        </section>
        <section
          style={{ display: !showEditModal ? "none" : "" }}
          className="editPostModal editPostModalDetailPage"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <span className="dpAndPostContentInput">
            <img
              className="profilepPictures"
              src={profileAvatar}
              alt={username}
            />
            <textarea
              ref={inputRefDetailsPage}
              className="textarea editPostTextarea"
              type="text"
              value={editedContentInput}
              onChange={(e) => setEditedContentInput(e.target.value)}
            ></textarea>
          </span>
          <span>
            {editedContentMedia && (
              <section>
                <img
                  src={editedContentMedia}
                  className="newPostAddImagePreview editPostImg"
                  alt=""
                />
                <ImCross
                  onClick={() => setEditedContentMedia("")}
                  className="cursorPointer escPreview escPreviewEdit"
                  color="white"
                  size={19}
                />
              </section>
            )}
          </span>
          <section className="lastLineOfEditPostModal">
            <span>
              <BsImage
                size={22}
                className="cursorPointer"
                onClick={editPostImageIconClickHandler}
              />
              <input
                type="file"
                style={{ display: "none" }}
                ref={editImgRefDetailsPage}
                onChange={editPostImageChangeHandler}
              />
            </span>
            <span className="discardAndPostBtn">
              <button
                className="postBtn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEditModal(false);
                  setEditedContentInput(content);
                  setEditedContentMedia(media);
                  setEditedContentMediaFile("");
                }}
              >
                Discard
              </button>
              <button
                onClick={async (e) => {
                  if (editedContentMedia) {
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                    }, 3000);
                    const cloudinaryImage = await cloudinaryImageFetcher(
                      editedContentMediaFile
                    );
                    postUpdater(
                      {
                        content: editedContentInput,
                        media: cloudinaryImage.url,
                        updatedAt: formatDate(),
                      },
                      _id,
                      token,
                      dispatchAuthState
                    );
                  } else {
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                    }, 1500);
                    postUpdater(
                      {
                        content: editedContentInput,
                        media: "",
                        updatedAt: formatDate(),
                      },
                      _id,
                      token,
                      dispatchAuthState
                    );
                  }
                  setShowEditModal(false);
                  setEditedContentInput(content);
                  setEditedContentMedia(media);
                  setEditedContentMediaFile("");
                }}
                className={
                  editedContentInput?.length > 0 &&
                  editedContentInput?.length < 121
                    ? "postBtn"
                    : " disabledPostBtn"
                }
                disabled={
                  editedContentInput?.length > 0 &&
                  editedContentInput?.length < 120
                    ? false
                    : true
                }
              >
                Save
              </button>
            </span>
            {/* <MdInsertEmoticon size={23} className="cursorPointer" /> */}
          </section>
        </section>
        <section className="postContent">
          <p>{content}</p>
          {media && (
            <span>
              <img className="postImg" src={media} alt="postImg" />
            </span>
          )}
          <span className="likeCommentLine">
            <span className="like">
              {likes?.likedBy?.find(
                (user) => currentUser_username === user.username
              ) ? (
                <AiFillHeart
                  size={22}
                  className="cursorPointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    dislikeHandler(_id, token, dispatchAuthState);
                    setTimeout(() => {
                      toastMaker("success", "disliked post", "bottom-right");
                    }, 1000);
                  }}
                />
              ) : (
                <AiOutlineHeart
                  size={22}
                  className="cursorPointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    likeHandler(_id, token, dispatchAuthState);
                    setTimeout(() => {
                      toastMaker("success", "liked post", "bottom-right");
                    }, 1000);
                  }}
                />
              )}
              {likes?.likeCount > 0 && likes?.likeCount}
            </span>
            <span className="like">
              <BiComment size={20} style={{ cursor: "pointer" }} />
              {comments?.length > 0 && comments?.length}
            </span>
            <span className="like">
              {bookmarks?.find((post) => post === _id) ? (
                <FaBookmark
                  size={15}
                  className="cursorPointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTimeout(() => {
                      toastMaker(
                        "success",
                        "Removed bookmarked",
                        "bottom-right"
                      );
                    }, 500);
                    removeBookmarkHandler(_id, token, dispatchAuthState);
                  }}
                />
              ) : (
                <FaRegBookmark
                  size={15}
                  className="cursorPointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTimeout(() => {
                      toastMaker("success", "Post Bookmarked", "bottom-right");
                    }, 500);
                    addBookmarkHandler(_id, token, dispatchAuthState);
                  }}
                />
              )}
            </span>
          </span>
        </section>
        <section className="totalLikeCommentsLine">
          {likes?.likeCount > 0 && (
            <span
              className="likeOnHover"
              onClick={() => {
                likeModalOpened
                  ? setLikeModalOpened(false)
                  : setLikeModalOpened(true);
              }}
            >
              {likes?.likeCount} likes
            </span>
          )}
          {comments?.length > 0 && (
            <span className="">{comments?.length} comments</span>
          )}
        </section>
        <section
          className="listOfLikes"
          style={{ display: !likeModalOpened ? "none" : "" }}
        >
          <LikedByUserCard
            dataa={likes?.likedBy}
            functionn={setLikeModalOpened}
          />
        </section>
        <section className="postYourComment">
          <span className="postYourCommentDpAndInput">
            <img
              src={currentUser_profileAvatar}
              alt=""
              className="profilepPictures"
            />
            <input
              type="text"
              placeholder="Post your reply"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
          </span>

          <button
            className="postCommentBtn cursorPointer postYourCommentBtn"
            style={{ cursor: commentInput.length < 1 ? "not-allowed" : "" }}
            disabled={commentInput.length > 0 ? false : true}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 1500);
              addCommentHandler(token, postId, commentInput, dispatchAuthState);
              setCommentInput("");
            }}
            // onClick={() =>
            //   addCommentHandler(
            //     currentUser_firstName,
            //     currentUser_lastName,
            //     currentUser_username,
            //     currentUser_profileAvatar,
            //     commentInput,
            //     _id
            //   )
            // }
          >
            Post
          </button>
        </section>
        {[...comments]?.reverse().map((comment) => (
          <CommentCard
            loadingSetter={setLoading}
            data={comment}
            postId={postId}
            key={comment._id}
          />
        ))}
      </div>
    </>
  );
};

export default DetailPage;

export function LikedByUserCard({ dataa, functionn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    authState: {
      token,
      currentUser: {
        username: currentUser_username,
        following,
        bookmarks,
        firstName: currentUser_firstName,
        lastName: currentUser_lastName,
        profileAvatar: currentUser_profileAvatar,
      },
    },
    dispatchAuthState,
  } = useAuthContext();

  return (
    <div className="LikedByUserCard">
      <span className="likedByHeading">
        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            paddingBottom: ".5rem",
            borderBottom: "1px solid ",
            width: "100%",
          }}
        >
          LikedBy
        </p>
        <RxCross1
          className="rxCross cursorPointer"
          onClick={() => {
            functionn(false);
          }}
        />
      </span>
      <section className="likedByUserSection">
        {dataa?.map((data) => {
          const { profileAvatar, firstName, lastName, username } = data;
          return (
            <section
              key={username}
              className="likedByUserSpan"
              onClick={() => {
                navigate(`/profile/${username}`, {
                  state: { from: location.pathname },
                });
              }}
            >
              <img
                src={
                  currentUser_username === username
                    ? currentUser_profileAvatar
                    : profileAvatar
                }
                className="profilepPictures"
                alt=""
              />
              <span>
                <h3>
                  {currentUser_username === username
                    ? currentUser_firstName
                    : firstName}{" "}
                  {currentUser_username === username
                    ? currentUser_lastName
                    : lastName}
                </h3>
                <small>{username}</small>
              </span>
            </section>
          );
        })}
      </section>
    </div>
  );
}
