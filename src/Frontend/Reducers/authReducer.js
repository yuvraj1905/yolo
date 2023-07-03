export const authReducer = (state, { type, payload }) => {
  switch (type) {
    case "dataSetter": {
      return { ...state, token: payload[0], currentUser: payload[1] };
    }

    case "exploreDataSetter": {
      // console.log(payload);
      return { ...state, explorePageData: [...payload] };
    }

    case "homeDataSetter": {
      return { ...state, homePageData: [...payload] };
    }

    case "suggestedUsersSetter": {
      return { ...state, suggestedUsers: [...payload] };
    }

    case "upudateCurrentUser": {
      return { ...state, currentUser: { ...payload } };
    }

    case "newCommentAdder": {
      const newExploreData = state.explorePageData.map((post) =>
        post._id === payload[0]
          ? { ...post, comments: [{ ...payload[1] }, ...post.comments] }
          : { ...post }
      );
      // console.log(newExploreData, "mooooo");
      return { ...state, explorePageData: [...newExploreData] };
    }

    case "currentUserUpdater": {
      return { ...state, currentUser: { ...payload } };
    }

    case "currentUserBookmarkUpdater": {
      return {
        ...state,
        currentUser: { ...state.currentUser, bookmarks: [...payload] },
      };
    }

    case "logoutHandler": {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      return {
        ...state,
        explorePageData: [],
        homePageData: [],
        suggestedUsers: [],
        // bookmarks: [],
        token: "",
        currentUser: {},
        sortBy: "latest",
        searchHistory: [],
        showRecentSearches: false,
        searchInput: "",
        emojiSectionOpened: false,
      };
    }

    case "searchedResultClear": {
      const updatedSearchHistory = state.searchHistory.filter(
        (item) => item !== payload
      );
      return { ...state, searchHistory: [...updatedSearchHistory] };
    }

    case "showRecentSearches": {
      // console.log(payload, "recieved");
      return { ...state, showRecentSearches: payload };
    }

    case "searchHistoryHandler": {
      const updatedSearchHistory = [
        ...new Set([...state.searchHistory, payload]),
      ];
      // console.log(updatedSearchHistory);
      return { ...state, searchHistory: [...updatedSearchHistory] };
    }

    case "clearSearchHistory": {
      // console.log(payload, "recieved");
      return { ...state, searchHistory: [] };
    }

    case "setSearchInput": {
      // console.log(payload, "recieved");
      return { ...state, searchInput: payload };
    }

    case "setEmojiSectionOpened": {
      return { ...state, emojiSectionOpened: payload };
    }

    case "sortTrendy": {
      // console.log(payload);
      return {
        ...state,
        sortBy: payload,
      };
    }

    default:
      return {
        ...state,
      };
  }
};
