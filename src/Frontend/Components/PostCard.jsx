import React, { useEffect, useRef, useState } from "react";
import "../styles/homepageCard.css";
import {
  AiFillHeart,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineHeart,
} from "react-icons/ai";
import { RiUserUnfollowLine } from "react-icons/ri";
import { BiComment } from "react-icons/bi";
import { BsBookmark, BsImage } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import {
  cloudinaryImageFetcher,
  dislikeHandler,
  likeHandler,
  postDeleteHandler,
  postUpdater,
  unfollowUserHandler,
} from "../Services/PostsManager";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { formatDate } from "../../backend/utils/authUtils";
import { getPostDate } from "../Services/postDateCalculator";

const HomepagePostCard = ({ data }) => {
  const {
    username,
    comments,
    content,
    firstName,
    lastName,
    likes: { likedBy, likeCount },
    media,
    profileAvatar,
    createdAt,
    updatedAt,
    _id,
  } = data;

  const navigate = useNavigate();

  const {
    authState: {
      token,
      currentUser: {
        username: currentUser_username,
        following,
        profileAvatar: currentUser_profileAvatar,
      },
    },
    dispatchAuthState,
  } = useAuthContext();
  const inputRef = useRef(null);

  const [showOptions, setShowOptions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedContentInput, setEditedContentInput] = useState(content);
  const [editedContentMedia, setEditedContentMedia] = useState(media);
  const [editedContentMediaFile, setEditedContentMediaFile] = useState("");

  const editImgRef = useRef(null);
  const editPostImageIconClickHandler = () => {
    editImgRef.current.click();
  };
  const editPostImageChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedContentMediaFile(file);
      setEditedContentMedia(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [showEditModal]);

  return (
    <section
      className="homePagePost"
      onClick={() => !showEditModal && navigate(`/details/${_id}`)}
    >
      <section className="dpAndUsernameDetails">
        <span
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/profile/${username}`);
          }}
        >
          <img
            className="profilepPictures"
            src={
              currentUser_username === username
                ? currentUser_profileAvatar
                : profileAvatar
            }
            alt={username}
          />
        </span>
        <span className="nameDetails">
          <span className="naming">
            <h3
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${username}`);
              }}
            >
              {firstName}
              {""} {lastName}
            </h3>
            <p
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${username}`);
              }}
              style={{ color: "grey", fontSize: ".9rem" }}
            >
              @{username}
            </p>
            <p style={{ color: "grey", fontSize: ".9rem" }}>
              ·{getPostDate(createdAt)}
            </p>
            {new Date(createdAt) !== new Date(updatedAt) && (
              <small style={{ color: "grey", fontSize: ".9rem" }}>
                ·Edited
              </small>
            )}
          </span>
          <SlOptions
            size={20}
            className="cursorPointer optionsBtn"
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(!showOptions);
            }}
          />
          <span
            style={{ display: !showOptions ? "none" : "" }}
            className="optionsModal"
          >
            {currentUser_username === username && (
              <button
                className="postOptionBtns cursorPointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEditModal(true);
                  setShowOptions(false);
                }}
              >
                Edit
              </button>
            )}
            {currentUser_username === username && (
              <button
                className="postOptionBtns cursorPointer"
                onClick={(e) => {
                  e.stopPropagation();
                  postDeleteHandler(_id, token, dispatchAuthState);
                }}
              >
                Delete
              </button>
            )}
            {currentUser_username !== username && (
              <button
                className="postOptionBtns cursorPointer"
                onClick={(e) => {
                  e.stopPropagation();
                  // const { uId } = following.find(
                  //   (userr) => userr.username === username
                  // );
                  unfollowUserHandler(username, token, dispatchAuthState);
                }}
              >
                Unfollow
              </button>
            )}
          </span>
        </span>
      </section>

      <section
        style={{ display: !showEditModal ? "none" : "" }}
        className="editPostModal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span className="dpAndPostContentInput">
          <img
            className="profilepPictures"
            src={currentUser_profileAvatar}
            alt={username}
          />
          <textarea
            ref={inputRef}
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
              ref={editImgRef}
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
                editedContentInput.length > 0 && editedContentInput.length < 121
                  ? "postBtn"
                  : " disabledPostBtn"
              }
              disabled={
                editedContentInput.length > 0 && editedContentInput.length < 120
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
            {likedBy.find((user) => currentUser_username === user.username) ? (
              <AiFillHeart
                size={22}
                className="cursorPointer"
                onClick={(e) => {
                  e.stopPropagation();
                  dislikeHandler(_id, token, dispatchAuthState);
                }}
              />
            ) : (
              <AiOutlineHeart
                size={22}
                className="cursorPointer"
                onClick={(e) => {
                  e.stopPropagation();
                  likeHandler(_id, token, dispatchAuthState);
                }}
              />
            )}
            {likeCount > 0 && likeCount}
          </span>
          <span className="like">
            <BiComment size={20} style={{ cursor: "pointer" }} />
            {comments?.length > 0 && comments?.length}
          </span>
          <BsBookmark size={16} className="cursorPointer" />
        </span>
      </section>
    </section>
  );
};

export default HomepagePostCard;
