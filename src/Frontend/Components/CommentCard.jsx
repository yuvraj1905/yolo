import React, { useEffect, useRef, useState } from "react";
import { SlOptions } from "react-icons/sl";
import { useAuthContext } from "../Context/AuthContext";
import "../styles/commentCard.css";
import {
  deleteCommentHandler,
  editExistingCommentHandler,
} from "../Services/PostsManager";
import { useLocation, useNavigate } from "react-router-dom";
import { getPostDate } from "../Services/postDateCalculator";

const CommentCard = ({ data, postId, loadingSetter }) => {
  const {
    dispatchAuthState,
    authState: {
      token,
      currentUser: { username: currentUser_username },
    },
  } = useAuthContext();
  const {
    _id,
    firstName,
    lastName,
    username,
    profileAvatar,
    createdAt,
    comment,
    updatedAt,
  } = data;
  const [editCommentInput, setEditCommentInput] = useState("");
  const [editCommentModal, setEditCommentModal] = useState(false);
  const [openOptionsCommentModal, setOpenOptionsCommentModal] = useState(false);

  const inputCmmnt = useRef(null);

  const editCommentHandler = () => {
    setEditCommentModal(true);
    setOpenOptionsCommentModal(false);
  };
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (inputCmmnt.current) {
      inputCmmnt.current.focus();
    }
  }, [editCommentModal]);

  return (
    <div className="commentCardOne">
      <section className="dpAndUsernameDetails">
        <span>
          <img
            onClick={() =>
              navigate(`/profile/${username}`, {
                state: { from: location.pathname },
              })
            }
            className="profilepPictures cursorPointer"
            src={profileAvatar}
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
          {currentUser_username === username && (
            <SlOptions
              size={20}
              className="cursorPointer optionsBtn"
              onClick={() =>
                setOpenOptionsCommentModal(!openOptionsCommentModal)
              }
            />
          )}
        </span>
      </section>{" "}
      {currentUser_username === username && (
        <section
          className="openOptionsCommentModal"
          style={{ display: !openOptionsCommentModal ? "none" : "" }}
        >
          <p
            className="commentOption"
            onClick={() => {
              setEditCommentInput(comment);
              editCommentHandler();
            }}
          >
            Edit
          </p>
          <p
            className="commentOption"
            onClick={() => {
              loadingSetter(true);
              setTimeout(() => {
                loadingSetter(false);
              }, 1000);
              setOpenOptionsCommentModal(false);
              deleteCommentHandler(token, postId, _id, dispatchAuthState);
            }}
          >
            Delete
          </p>
        </section>
      )}
      {currentUser_username === username && (
        <section
          className="editCommentModal"
          style={{ display: !editCommentModal ? "none" : "" }}
        >
          <span className="dpAndCommentInput">
            <img
              className="profilepPictures"
              src={profileAvatar}
              alt={username}
            />
            <input
              ref={inputCmmnt}
              type="text"
              value={editCommentInput}
              onChange={(e) => setEditCommentInput(e.target.value)}
            />
          </span>
          <span className="editCommentBtns">
            <button
              className="cursorPointer editCommentBtn"
              onClick={() => {
                setEditCommentInput("");
                setEditCommentModal(false);
                setOpenOptionsCommentModal(false);
              }}
            >
              Discard
            </button>
            <button
              className="cursorPointer editCommentBtn"
              onClick={() => {
                loadingSetter(true);
                setTimeout(() => {
                  loadingSetter(false);
                }, 2500);
                editExistingCommentHandler(
                  token,
                  postId,
                  _id,
                  editCommentInput,
                  dispatchAuthState
                );
                setEditCommentInput("");
                setEditCommentModal(false);
              }}
            >
              save
            </button>
          </span>
        </section>
      )}
      <section className="actualCommentLine">{comment}</section>
    </div>
  );
};

export default CommentCard;
