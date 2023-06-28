import axios from "axios";

export const exploreDataFetcher = async () => {
  try {
    const response = await axios.get("/api/posts");
    if (response.status === 200 || response.status === 201) {
      return [...response.data.posts.reverse()];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const allUsersListFetcher = async () => {
  try {
    const response = await axios.get("/api/users");
    if (response.status === 200 || response.status === 201) {
      return [...response.data.users];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const profileUpdaterFunction = async (
  userData,
  encodedToken,
  dispatchAuthState
) => {
  try {
    const res = await axios.post(
      `/api/users/edit`,
      { userData },
      { headers: { authorization: encodedToken } }
    );
    if (res.status === 200 || res.status === 201) {
      dispatchAuthState({
        type: "upudateCurrentUser",
        payload: { ...res.data.user },
      });
    }
  } catch (e) {
    console.log(e);
  }
};
