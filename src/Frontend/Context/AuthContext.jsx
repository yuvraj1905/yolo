import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer } from "../Reducers/authReducer";
import {
  exploreDataFetcher,
  allUsersListFetcher,
} from "../Services/renderingDataFetcher";

const AuthContext = createContext();

const initialAuthObject = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
  currentUser: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : {},
  explorePageData: [],
  homePageData: [],
  suggestedUsers: [],
  sortBy: "latest",
  searchHistory: [],
  showRecentSearches: false,
  searchInput: "",
  emojiSectionOpened: false,
};

export const AuthContextProvider = ({ children }) => {
  const [authState, dispatchAuthState] = useReducer(
    authReducer,
    initialAuthObject
  );

  // console.log(authState.currentUser);
  // console.log(authState.searchHistory);

  const followingList = authState?.currentUser?.following?.map(
    ({ username }) => username
  );

  useEffect(() => {
    const homeData = authState?.explorePageData?.filter(({ username }) =>
      [...followingList, authState.currentUser.username].find(
        (el) => el === username
      )
    );
    dispatchAuthState({ type: "homeDataSetter", payload: homeData });
  }, [authState.explorePageData, authState.currentUser]);

  // console.log(authState.homePageData, "polo");

  useEffect(() => {
    const dataFetcher = async () => {
      const data = await exploreDataFetcher();

      const allUsersList = await allUsersListFetcher();
      const suggestedUsersData = allUsersList?.filter(
        ({ username }) =>
          authState.currentUser.username !== username &&
          !authState.currentUser.following.find(
            (user) => user.username === username
          )
      );

      // console.log(homeData);
      dispatchAuthState({ type: "exploreDataSetter", payload: data });

      dispatchAuthState({
        type: "suggestedUsersSetter",
        payload: suggestedUsersData,
      });
    };
    authState.token && dataFetcher();
  }, [authState.token, authState.currentUser]);

  //explorePageData===allPosts

  return (
    <AuthContext.Provider value={{ authState, dispatchAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
