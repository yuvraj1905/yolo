import axios from "axios";

export const likeHandler = async (postId, authorization, dispatchAuthState) => {
  try {
    const res = await axios.post(
      `/api/posts/like/${postId}`,
      {},
      { headers: { authorization } }
    );
    if (res.status === 200 || res.status === 201) {
      // console.log(res, "likeResult");
      dispatchAuthState({
        type: "exploreDataSetter",
        payload: [...res.data.posts.reverse()],
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const dislikeHandler = async (
  postId,
  authorization,
  dispatchAuthState
) => {
  try {
    const res = await axios.post(
      `/api/posts/dislike/${postId}`,
      {},
      { headers: { authorization } }
    );
    if (res.status === 200 || res.status === 201) {
      // console.log(res, "dislikeResult");
      dispatchAuthState({
        type: "exploreDataSetter",
        payload: [...res.data.posts.reverse()],
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const followUserHandler = async (
  followUserName,
  authorization,
  dispatchAuthState
) => {
  try {
    const res = await axios.post(
      `/api/users/follow/${followUserName}`,
      {},
      { headers: { authorization } }
    );
    if (res.status === 200 || res.status === 201) {
      dispatchAuthState({
        type: "upudateCurrentUser",
        payload: { ...res.data.user },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const addCommentHandler = async (
  token,
  postId,
  commentData,
  dispatchAuthState
) => {
  try {
    const res = await axios.post(
      `/api/comments/add/${postId}`,
      { commentData },
      {
        headers: { authorization: token },
      }
    );
    if (res.status === 200 || res.status === 201) {
      // console.log(res);
      dispatchAuthState({
        type: "exploreDataSetter",
        payload: [...res.data.posts.reverse()],
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const editExistingCommentHandler = async (
  token,
  postId,
  commentId,
  commentData,
  dispatchAuthState
) => {
  // console.log(postId);
  try {
    const res = await axios.post(
      `/api/comments/edit/${postId}/${commentId}`,
      { commentData },
      {
        headers: { authorization: token },
      }
    );
    if (res.status === 200 || res.status === 201) {
      // console.log(res);
      dispatchAuthState({
        type: "exploreDataSetter",
        payload: [...res.data.posts.reverse()],
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteCommentHandler = async (
  token,
  postId,
  commentId,

  dispatchAuthState
) => {
  console.log(postId);
  try {
    const res = await axios.post(
      `/api/comments/delete/${postId}/${commentId}`,
      {},
      {
        headers: { authorization: token },
      }
    );
    if (res.status === 200 || res.status === 201) {
      // console.log(res);
      dispatchAuthState({
        type: "exploreDataSetter",
        payload: [...res.data.posts.reverse()],
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const cloudinaryImageFetcher = async (mediaNewPost) => {
  const dataForCloudinary = new FormData();
  dataForCloudinary.append("file", mediaNewPost);
  dataForCloudinary.append("upload_preset", "yolo_neogcamp");
  dataForCloudinary.append("cloud_name", "yuvraj1905");
  const urlToReturn = fetch(
    "https://api.cloudinary.com/v1_1/yuvraj1905/image/upload",
    {
      method: "post",
      body: dataForCloudinary,
    }
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => console.log(e));

  return urlToReturn;
};

export const newPostAdder = async (data, encodedToken, dispatchAuthState) => {
  try {
    const res = await axios.post(
      "/api/posts",
      { postData: { ...data } },
      { headers: { authorization: encodedToken } }
    );
    if (res.status === 200 || res.status === 201) {
      dispatchAuthState({
        type: "exploreDataSetter",
        payload: [...res.data.posts.reverse()],
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const postUpdater = async (
  data,
  postId,
  encodedToken,
  dispatchAuthState
) => {
  try {
    const res = await axios.post(
      `/api/posts/edit/${postId}`,
      { postData: { ...data } },
      { headers: { authorization: encodedToken } }
    );
    if (res.status === 200 || res.status === 201) {
      dispatchAuthState({
        type: "exploreDataSetter",
        payload: [...res.data.posts.reverse()],
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const postDeleteHandler = async (
  postId,
  encodedToken,
  dispatchAuthState
) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`, {
      headers: { authorization: encodedToken },
    });
    if (res.status === 200 || res.status === 201) {
      dispatchAuthState({
        type: "exploreDataSetter",
        payload: [...res.data.posts.reverse()],
      });
    }
  } catch (e) {
    console.log(e);
  }
};
export const unfollowUserHandler = async (
  unfollowUsername,
  encodedToken,
  dispatchAuthState
) => {
  try {
    const res2 = await axios.post(
      `/api/users/unfollow/${unfollowUsername}`,
      {},
      {
        headers: { authorization: encodedToken },
      }
    );
    if ((res2.status === 200) | (res2.status === 201)) {
      dispatchAuthState({
        type: "currentUserUpdater",
        payload: res2.data.user,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const addBookmarkHandler = async (
  postId,
  encodedToken,
  dispatchAuthState
) => {
  // console.log(encodedToken, postId);
  try {
    const res = await axios.post(
      `/api/users/bookmark/${postId}/`,
      {},
      {
        headers: { authorization: encodedToken },
      }
    );
    if ((res.status === 200) | (res.status === 201)) {
      dispatchAuthState({
        type: "currentUserBookmarkUpdater",
        payload: res.data.bookmarks,
      });
      // console.log(res);
    }
  } catch (e) {
    console.log(e, "add");
  }
};

export const removeBookmarkHandler = async (
  postId,
  encodedToken,
  dispatchAuthState
) => {
  try {
    const res = await axios.post(
      `/api/users/remove-bookmark/${postId}`,
      {},
      {
        headers: { authorization: encodedToken },
      }
    );
    if ((res.status === 200) | (res.status === 201)) {
      dispatchAuthState({
        type: "currentUserBookmarkUpdater",
        payload: res.data.bookmarks,
      });
      // console.log(res);
    }
  } catch (e) {
    console.log(e, "remove");
  }
};

export const userFinder = async (usernamee) => {
  try {
    const res = await axios.get(`/api/users/${usernamee}`);
    if (res.status === 200 || res.status === 201) {
      return { ...res.data.user };
    }
  } catch (err) {
    console.log(err);
  }
};
