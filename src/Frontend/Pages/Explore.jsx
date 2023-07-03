// import React, { useEffect } from "react";
// import "../styles/Explore.css";
// import { useAuthContext } from "../Context/AuthContext";
// import HomepagePostCard from "../Components/HomepagePostCard";
// const Explore = () => {
//   const {
//     authState: { explorePageData, currentUser },
//   } = useAuthContext();
//   // console.log("hi");
//   // useEffect(() => {}, [explorePageData, currentUser]);
//   return (
//     <div className="explore">
//       <h2>Explore Yolo</h2>
//       <section className="homepagePosts">
//         {explorePageData.map((post) => (
//           <HomepagePostCard exploreCard key={post._id} data={post} />
//         ))}
//       </section>
//     </div>
//   );
// };

// export default Explore;

// _______________________________________________________

import React, { useEffect, useState } from "react";
import "../styles/Explore.css";
import { useAuthContext } from "../Context/AuthContext";
import HomepagePostCard from "../Components/HomepagePostCard";
import ClipLoader from "react-spinners/ClipLoader";

const Explore = () => {
  const {
    dispatchAuthState,
    authState: { explorePageData, currentUser },
  } = useAuthContext();

  const [pageNumber, setPageNumber] = useState(1);
  // console.log("hi");
  const [loading, setLoading] = useState(false);

  const override = {
    display: "block",
    margin: "1.25rem auto",
  };

  useEffect(() => {
    // onClick={() => {
    dispatchAuthState({
      type: "setSearchInput",
      payload: "",
    });
    dispatchAuthState({
      type: "showRecentSearches",
      payload: false,
    });
    // }}
  }, []);

  // useEffect(() => {
  //   // explorePageData.length > 4 &&
  //   //   explorePageData.slice(0, pageNumber * 4).length !==
  //   //     explorePageData.length &&
  //   window.addEventListener("scroll", () => {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop >=
  //         document.documentElement.scrollHeight &&
  //       explorePageData.slice(0, pageNumber * 4).length !==
  //         explorePageData.length
  //     ) {
  //       setLoading(true);
  //       setTimeout(() => {
  //         setPageNumber(() => pageNumber + 1);
  //         setLoading(false);
  //       }, 500);
  //     }
  //   });

  //   return () =>
  //     window.removeEventListener("scroll", () => {
  //       if (
  //         window.innerHeight + document.documentElement.scrollTop >=
  //           document.documentElement.scrollHeight &&
  //         explorePageData.slice(0, pageNumber * 4).length !==
  //           explorePageData.length
  //       ) {
  //         setLoading(true);
  //         setTimeout(() => {
  //           setPageNumber(() => pageNumber + 1);
  //           setLoading(false);
  //         }, 500);
  //       }
  //     });

  // }, [pageNumber, explorePageData]);

  useEffect(() => {
    const infScrollHandler = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setTimeout(() => {
          setPageNumber((pageNumber) => pageNumber + 1);
          setLoading(false);
        }, 750);
      }
    };

    // [p1,p2,p3,p4,p5]=>explorePageData;
    // [].slice()=>initial 2 data;
    // 2post

    explorePageData.slice(0, pageNumber * 3).length !==
      explorePageData.length &&
      window.addEventListener("scroll", infScrollHandler);
    return () => {
      explorePageData.slice(0, pageNumber * 3).length !==
        explorePageData.length &&
        window.removeEventListener("scroll", infScrollHandler);
    };
  }, [explorePageData, pageNumber]);

  return (
    <div className="explore">
      <h2>Explore Yolo</h2>
      <section className="homepagePosts">
        {explorePageData.slice(0, pageNumber * 3).map((post) => (
          <HomepagePostCard exploreCard key={post._id} data={post} />
        ))}
        {loading && (
          <ClipLoader
            color="grey"
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
        {/* [1,2,1,1,1] */}
        {explorePageData.slice(0, pageNumber * 3).length ===
          explorePageData.length && (
          <p
            style={{
              textAlign: "center",
              padding: "1.25rem 0",
              fontWeight: "700",
            }}
          >
            No more posts to show ! You've covered everything !{" "}
            <button
              onClick={() =>
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
              }
              className="cursorPointer followBtn"
              style={{ padding: ".5rem" }}
            >
              Jump to top
            </button>
          </p>
        )}
      </section>
    </div>
  );
};

export default Explore;
