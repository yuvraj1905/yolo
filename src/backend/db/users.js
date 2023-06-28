import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balak",
    username: "adarshbalak",
    bio: "Hey! I'm adarsh balak.",
    website: "https://github.com/yuvraj1905",
    profileAvatar:
      "https://res.cloudinary.com/yuvraj1905/image/upload/v1687716248/844-8444619_student-png-male-student-cartoon-png_ibwnbv.png",
    password: "adarshBalak123",
    createdAt: "August 2022",
    updatedAt: formatDate(),

    followers: [
      {
        _id: uuid(),
        firstName: "Mayank",
        lastName: "Kumar",
        username: "mayank123",
        profileAvatar: "https://avatars.githubusercontent.com/u/36763315?v=4",
      },
    ],
    following: [
      {
        _id: uuid(),
        firstName: "Mayank",
        lastName: "Kumar",
        username: "mayank123",
        profileAvatar: "https://avatars.githubusercontent.com/u/36763315?v=4",
      },
    ],
  },
  {
    _id: uuid(),
    firstName: "Mayank",
    lastName: "Kumar",
    username: "mayank123",
    password: "mayank123",
    bio: "Yo bro! Brown munde ! Mayank here",
    website: "https://github.com/mayank0801",
    profileAvatar: "https://avatars.githubusercontent.com/u/36763315?v=4",
    createdAt: "January 2023",
    updatedAt: formatDate(),
    following: [
      {
        _id: uuid(),
        firstName: "Adarsh",
        lastName: "Balak",
        username: "adarshbalak",
        profileAvatar:
          "https://media.istockphoto.com/id/1354770626/vector/childhood-education-study-success-like-concept-young-happy-cheerful-smiling-boy-pupil.jpg?s=612x612&w=0&k=20&c=7Mhgf-cdXQrHQHjjuhYaPMT81RFQxthX01gX0OklMQU=",
      },
    ],
    followers: [
      {
        _id: uuid(),
        firstName: "Yuvraj",
        lastName: "Kumar",
        username: "yuvraj123",
        profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
      },
      {
        _id: uuid(),
        firstName: "Anamika",
        lastName: "",
        username: "anamika123",
        profileAvatar:
          "https://media.licdn.com/dms/image/D5603AQH4CjoVxLewyA/profile-displayphoto-shrink_400_400/0/1686765403158?e=1692230400&v=beta&t=TD2bZvpcrwyQ_xRFJWcKGrdedAU3zbyss3ygheSSveA",
      },
      {
        _id: uuid(),
        firstName: "Adarsh",
        lastName: "Balak",
        username: "adarshbalak",
        profileAvatar:
          "https://media.istockphoto.com/id/1354770626/vector/childhood-education-study-success-like-concept-young-happy-cheerful-smiling-boy-pupil.jpg?s=612x612&w=0&k=20&c=7Mhgf-cdXQrHQHjjuhYaPMT81RFQxthX01gX0OklMQU=",
      },
    ],
  },
  {
    _id: uuid(),
    firstName: "Anamika",
    lastName: ".",
    username: "anamika123",
    password: "anamika123",
    bio: "Hey! Anamika here",
    website: "https://github.com/Anamika26102001",
    profileAvatar:
      "https://media.licdn.com/dms/image/D5603AQH4CjoVxLewyA/profile-displayphoto-shrink_400_400/0/1686765403158?e=1692230400&v=beta&t=TD2bZvpcrwyQ_xRFJWcKGrdedAU3zbyss3ygheSSveA",
    createdAt: "February 2022",
    updatedAt: formatDate(),
    following: [
      {
        _id: uuid(),
        firstName: "Mayank",
        lastName: "Kumar",
        username: "mayank123",
        profileAvatar: "https://avatars.githubusercontent.com/u/36763315?v=4",
      },
    ],
    followers: [
      {
        _id: uuid(),
        firstName: "Yuvraj",
        lastName: "Kumar",
        username: "yuvraj123",
        profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
      },
    ],
  },
  {
    _id: uuid(),
    firstName: "Yuvraj",
    lastName: "Kumar",
    username: "yuvraj123",
    password: "yuvraj123",
    bio: "Hey! Yuvraj here",
    website: "https://github.com/yuvraj1905",
    profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
    createdAt: "September 2022",
    updatedAt: formatDate(),
    following: [
      {
        _id: uuid(),
        firstName: "Anamika",
        lastName: "",
        username: "anamika123",
        profileAvatar:
          "https://media.licdn.com/dms/image/D5603AQH4CjoVxLewyA/profile-displayphoto-shrink_400_400/0/1686765403158?e=1692230400&v=beta&t=TD2bZvpcrwyQ_xRFJWcKGrdedAU3zbyss3ygheSSveA",
      },
      {
        _id: uuid(),
        firstName: "Mayank",
        lastName: "Kumar",
        username: "mayank123",
        profileAvatar: "https://avatars.githubusercontent.com/u/36763315?v=4",
      },
    ],
    followers: [
      {
        _id: uuid(),
        firstName: "Harsh",
        lastName: "Vardhan",
        username: "harsh123",
        profileAvatar: "https://avatars.githubusercontent.com/u/67819701?v=4",
      },
    ],
  },
  {
    _id: uuid(),
    firstName: "Harsh",
    lastName: "Vardhan",
    username: "harsh123",
    password: "harsh123",
    bio: "Hey! HARSHVARDHAN here",
    website: "https://github.com/harsh1kashyap",
    profileAvatar: "https://avatars.githubusercontent.com/u/67819701?v=4",
    createdAt: "March 2023",
    updatedAt: formatDate(),
    following: [
      {
        _id: uuid(),
        firstName: "Yuvraj",
        lastName: "Kumar",
        username: "yuvraj123",
        profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
      },
    ],
    followers: [],
  },
];
