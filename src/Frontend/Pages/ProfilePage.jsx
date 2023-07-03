import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/profilePage.css";
import {
  AiFillCamera,
  AiOutlineArrowLeft,
  AiOutlineLink,
} from "react-icons/ai";
import { MdOutlineDetails } from "react-icons/md";
import { RxCalendar, RxCross1 } from "react-icons/rx";
import { FaUserFriends } from "react-icons/fa";
import {
  cloudinaryImageFetcher,
  followUserHandler,
  unfollowUserHandler,
} from "../Services/PostsManager";
import { useAuthContext } from "../Context/AuthContext";
import { profileUpdaterFunction } from "../Services/renderingDataFetcher";
import HomepagePostCard from "../Components/HomepagePostCard";
import { PulseLoader } from "react-spinners";
import { dateJoinedCalculator } from "../Services/postDateCalculator";

const ProfilePage = () => {
  const [dataa, setDataa] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    dispatchAuthState,
    authState: { token, currentUser, explorePageData },
  } = useAuthContext();
  const { usernamee } = useParams();
  const [followingListOpen, setFollowingListOpen] = useState(false);
  const [followerListOpen, setFollowerListOpen] = useState(false);

  //   console.log(usernamee);
  useEffect(() => {
    dispatchAuthState({
      type: "showRecentSearches",
      payload: false,
    });
    dispatchAuthState({
      type: "setSearchInput",
      payload: "",
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [usernamee]);
  const {
    _id,
    firstName,
    lastName,
    username,
    bio,
    website,
    profileAvatar,
    createdAt,
    followers,
    following,
  } = dataa;

  const [firstNamee, setFirstNamee] = useState("");
  const [lastNamee, setLastNamee] = useState("");
  const [bioo, setBioo] = useState("");
  const [websitee, setWebsitee] = useState("");
  const [editProfileAvatarFile, setEditProfileAvatarFile] = useState("");
  const [editProfileAvatar, setEditProfileAvatar] = useState("");
  const [editProfileModalOpened, setEditProfileModalOpened] = useState(false);
  const [followingg, setFollowingg] = useState([]);
  const [followerss, setFollowerss] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const editProfileDpRef = useRef(null);

  const selectNewPictureClickHandler = () => {
    editProfileDpRef.current.click();
  };

  const editProfileAvatarHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditProfileAvatarFile(file);
      setEditProfileAvatar(URL.createObjectURL(file));
    }
  };

  const profileDataUpdateHandler = async (e) => {
    e.stopPropagation();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    if (editProfileAvatarFile) {
      const cloudinaryImage = await cloudinaryImageFetcher(
        editProfileAvatarFile
      );
      profileUpdaterFunction(
        {
          firstName: firstNamee,
          lastName: lastNamee,
          bio: bioo,
          website: websitee,
          profileAvatar: cloudinaryImage.url,
        },
        token,
        dispatchAuthState
      );
    } else {
      profileUpdaterFunction(
        {
          firstName: firstNamee,
          lastName: lastNamee,
          bio: bioo,
          website: websitee,
          profileAvatar: editProfileAvatar,
        },
        token,
        dispatchAuthState
      );
    }
    setEditProfileModalOpened(false);
    setEditProfileAvatarFile("");
  };

  const ppUpdateDiscardHandler = (e) => {
    e.stopPropagation();
    setFirstNamee(firstName);
    setLastNamee(lastName);
    setBioo(bio);
    setWebsitee(website);
    setEditProfileAvatar(profileAvatar);
    setEditProfileModalOpened(false);
    setEditProfileAvatarFile("");
  };

  const avatars = [
    "https://png.pngtree.com/png-clipart/20210619/ourlarge/pngtree-instagram-social-media-men-round-glasses-avatar-png-image_3483988.jpg",
    "https://png.pngtree.com/png-clipart/20210619/ourlarge/pngtree-instagram-lady-social-media-flat-style-avatar-png-image_3483977.jpg",
    "https://images.assetsdelivery.com/compings_v2/elvie15veronika/elvie15veronika2005/elvie15veronika200500053.jpg",
    "https://media.istockphoto.com/id/1227320122/es/vector/lindo-icono-de-avatar-de-chica-vectorial-bonito-retrato-de-dama.jpg?s=170667a&w=0&k=20&c=cWF7e0o_IU-ZJpWb2G8ZocBPM6hY6W5EyRY3m_eUUK8=",
    "https://img.freepik.com/premium-vector/hippie-old-woman-avatar-vector-illustration_621685-62.jpg?w=2000",
    "https://img.freepik.com/premium-vector/portrait-elderly-man-wearing-glasses-avatar-grandfather-social-media_645574-624.jpg",
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`/api/users/${usernamee}`);
        if (res.status === 200 || res.status === 201) {
          const res2 = await axios.get(
            `/api/posts/user/${res.data.user.username}`
          );
          if (res2.status === 200 || res2.status === 201) {
            setDataa({ ...res.data.user });
            setUserPosts([
              ...res2.data.posts.map((post) => ({
                ...post,
                profileAvatar: res.data.user.profileAvatar,
              })),
            ]);
            setFirstNamee(res.data.user.firstName);
            setLastNamee(res.data.user.lastName);
            setBioo(res.data.user.bio);
            setWebsitee(res.data.user.website);
            setEditProfileAvatar(res.data.user.profileAvatar);
            // setLoading(false);
            setFollowerss([...res.data.user.followers]);
            setFollowingg([...res.data.user.following]);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, [currentUser, usernamee, explorePageData]);
  const override = {
    display: "block",
    margin: "20rem auto",
  };

  useEffect(() => {
    setFollowerListOpen(false);
    setFollowingListOpen(false);
  }, [usernamee]);

  // useEffect(() => {}, []);
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

      <div style={{ display: loading ? "none" : "" }} className="profilePage">
        <section className="goBackBtnProfilePage">
          <AiOutlineArrowLeft
            size={18}
            className="cursorPointer gobackfrompost"
            onClick={() =>
              location?.state?.from
                ? navigate(location?.state?.from)
                : navigate("/")
            }
          />
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.2rem",
            }}
          >
            <h2>
              {firstName} {lastName}
            </h2>
            <p style={{ color: "grey", fontWeight: 700 }}>
              {userPosts.length} posts
            </p>
          </span>
        </section>
        <section
          className="profilePageInfo"
          onClick={() => {
            followingListOpen && setFollowingListOpen(false);
            followerListOpen && setFollowerListOpen(false);
          }}
        >
          <span>
            <img src={profileAvatar} alt={username} className="ppDp" />
          </span>
          <span className="ppDetails">
            <span
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3>
                {firstName} {lastName}
              </h3>
              <small style={{ color: "grey" }}>@{username}</small>
            </span>
            <p className="website linkkDate">
              <MdOutlineDetails />
              <span>{bio}</span>
            </p>
            <span className="website ">
              <AiOutlineLink /> {""} <Link to={website}>{website}</Link>
            </span>
            <p className="website linkkDate">
              <RxCalendar style={{ alignSelf: "flex-start" }} />
              <span style={{ alignSelf: "flex-end" }}>
                Joined {dateJoinedCalculator(createdAt)}
              </span>
            </p>
            <span className="centering">
              <FaUserFriends />
              <p
                onClick={() => {
                  if (!followerListOpen) {
                    setFollowingListOpen(false);
                    setFollowerListOpen(true);
                  } else {
                    setFollowerListOpen(false);
                  }
                }}
                className="website linkk"
              >
                Followers:{""}
                <span style={{ fontWeight: "bold" }}>
                  {followers?.length}
                </span>{" "}
              </p>
              <p
                onClick={() => {
                  if (!followingListOpen) {
                    setFollowerListOpen(false);
                    setFollowingListOpen(true);
                  } else {
                    setFollowingListOpen(false);
                  }
                }}
                className="website linkk"
              >
                Following:{""}
                <span style={{ fontWeight: "bold" }}>
                  {following?.length}
                </span>{" "}
              </p>
            </span>
            <span style={{ display: !followerListOpen ? "none" : "" }}>
              <FollowList
                dataa={followerss}
                functionn={setFollowerListOpen}
                follower
              />
            </span>
            <span style={{ display: !followingListOpen ? "none" : "" }}>
              <FollowList dataa={followingg} functionn={setFollowingListOpen} />
            </span>
          </span>
          {currentUser.username === username && (
            <button
              onClick={() => {
                setEditProfileModalOpened(true);
              }}
              className="cursorPointer editProfileBtn"
            >
              Edit Profile
            </button>
          )}
          {currentUser.username !== username && (
            <button
              onClick={() => {
                // setEditProfileModalOpened(true);
                followerss.find(
                  (user) => user.username === currentUser.username
                )
                  ? unfollowUserHandler(username, token, dispatchAuthState)
                  : followUserHandler(username, token, dispatchAuthState);
              }}
              className="cursorPointer folUnfolBtn"
            >
              {followerss.find((user) => user.username === currentUser.username)
                ? "following"
                : "Follow"}
            </button>
          )}
        </section>
        <section
          style={{ display: !editProfileModalOpened ? "none" : "" }}
          className="editProfileModal"
        >
          <span onClick={selectNewPictureClickHandler}>
            <img src={editProfileAvatar} alt="" className="ppDp dpChangeSpan" />
            <AiFillCamera
              className="changeDpIcon dpChangeSpan"
              size={30}
              color="white"
            />
          </span>

          <input
            type="file"
            style={{ display: "none" }}
            onChange={editProfileAvatarHandler}
            ref={editProfileDpRef}
          />
          <span className="editProfileDetails">
            <label htmlFor="firstName">FirstName: </label>
            <input
              type="text"
              style={{ width: "14rem" }}
              id="firstName"
              value={firstNamee}
              onChange={(e) => setFirstNamee(e.target.value)}
            />
            <label htmlFor="lastName">LastName: </label>
            <input
              type="text"
              style={{ width: "14rem", marginLeft: "0.03rem" }}
              id="lastName"
              value={lastNamee}
              onChange={(e) => setLastNamee(e.target.value)}
            />
            <label htmlFor="bio">Bio: </label>
            <input
              type="text"
              style={{ width: "14rem", marginLeft: "0.03rem" }}
              id="bio"
              value={bioo}
              onChange={(e) => setBioo(e.target.value)}
            />
            <label htmlFor="website">Website: </label>
            <input
              type="text"
              style={{ width: "14rem", marginLeft: "0.03rem" }}
              id="website"
              value={websitee}
              onChange={(e) => setWebsitee(e.target.value)}
            />
          </span>
          <span className="newAvatarsSpan">
            <p className="updateAvatarTitle">Try all new Yo-avatars</p>
            <span className="avatarOptions">
              {avatars.map((avatar) => (
                <img
                  key={avatar}
                  onClick={() => setEditProfileAvatar(avatar)}
                  src={avatar}
                  alt=""
                  className="profilepPictures profilee"
                />
              ))}
            </span>
            <span className="ppSaveDiscardBtns">
              <button onClick={ppUpdateDiscardHandler}>Discard</button>
              <button onClick={profileDataUpdateHandler}>Update</button>
            </span>
          </span>
        </section>
        <section style={{ marginTop: ".1rem" }}>
          {[...userPosts].reverse().map((post) => (
            <HomepagePostCard
              loadingSetter={setLoading}
              data={post}
              dpCard
              key={post._id}
            />
          ))}
        </section>
      </div>
    </>
  );
};

export default ProfilePage;

export function FollowList({ dataa, functionn, follower }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="LikedByUserCard ppCardFollow">
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
          {follower ? "Followers" : "Following"}
        </p>
        <RxCross1
          className="rxCross cursorPointer"
          onClick={() => {
            functionn(false);
          }}
        />
      </span>
      <section className="likedByUserSection">
        {dataa.map((data) => {
          const { _id, profileAvatar, firstName, lastName, username } = data;
          return (
            <section
              key={_id}
              className="likedByUserSpan"
              onClick={() => {
                navigate(`/profile/${username}`, {
                  state: { from: location.pathname },
                });
              }}
            >
              <img src={profileAvatar} className="profilepPictures" alt="" />
              <span>
                <h3>
                  {firstName} {lastName}
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
