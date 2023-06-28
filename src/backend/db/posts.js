import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: "p1",
    firstName: "Adarsh",
    lastName: "Balak",
    username: "adarshbalak",
    profileAvatar:
      "https://res.cloudinary.com/yuvraj1905/image/upload/v1687716248/844-8444619_student-png-male-student-cartoon-png_ibwnbv.png",
    content: "I'm proud of my father.",

    likes: {
      likeCount: 4,
      dislikedBy: [],
      likedBy: [
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
            "https://res.cloudinary.com/yuvraj1905/image/upload/v1687716248/844-8444619_student-png-male-student-cartoon-png_ibwnbv.png",
        },
        {
          _id: uuid(),
          firstName: "Yuvraj",
          lastName: "Kumar",
          username: "yuvraj123",
          profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
        },
        {
          _id: uuid(),
          firstName: "Harsh",
          lastName: "Vardhan",
          username: "harsh123",
          profileAvatar: "https://avatars.githubusercontent.com/u/67819701?v=4",
        },
      ],
    },

    media:
      "https://res.cloudinary.com/yuvraj1905/image/upload/v1687949692/happy-father-s-day_24908-59789_gfee2v.avif",
    createdAt: "2023-05-11",
    updatedAt: "2023-05-11",
    comments: [
      {
        _id: uuid(),
        firstName: "Mayank",
        lastName: "Kumar",
        username: "mayank123",
        profileAvatar: "https://avatars.githubusercontent.com/u/36763315?v=4",
        createdAt: "2023-05-11",
        updatedAt: "2023-05-11",
        comment: "me too!",
      },
    ],
  },
  {
    _id: "p2",
    firstName: "Mayank",
    lastName: "Kumar",
    username: "mayank123",
    profileAvatar: "https://avatars.githubusercontent.com/u/36763315?v=4",
    content: "Brown munde ! AP Dhillon is best",

    likes: {
      likeCount: 2,
      dislikedBy: [],
      likedBy: [
        {
          _id: uuid(),
          firstName: "Yuvraj",
          lastName: "Kumar",
          username: "yuvraj123",
          profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
        },
        {
          _id: uuid(),
          firstName: "Harsh",
          lastName: "Vardhan",
          username: "harsh123",
          profileAvatar: "https://avatars.githubusercontent.com/u/67819701?v=4",
        },
      ],
    },

    media: "",
    createdAt: "2023-06-12",
    updatedAt: "2023-06-12",
    comments: [
      {
        _id: uuid(),
        firstName: "Yuvraj",
        lastName: "Kumar",
        username: "yuvraj123",
        profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
        createdAt: "2023-06-09",
        updatedAt: "2023-06-09",
        comment: "Yo!",
      },
      {
        _id: uuid(),
        firstName: "Harsh",
        lastName: "Vardhan",
        username: "harsh123",
        profileAvatar: "https://avatars.githubusercontent.com/u/67819701?v=4",
        createdAt: "2023-06-09",
        updatedAt: "2023-06-09",
        comment: "nice nice!",
      },
    ],
  },
  {
    _id: "p3",
    firstName: "Adarsh",
    lastName: "Balak",
    username: "adarshbalak",
    profileAvatar:
      "https://res.cloudinary.com/yuvraj1905/image/upload/v1687716248/844-8444619_student-png-male-student-cartoon-png_ibwnbv.png",
    content: `Be courageous. Challenge orthodoxy. Stand up for what you believe in. Make sure you have stories to cherish lifetime.`,
    // link: "https://yo-shop-neogcamp.netlify.app/",

    likes: {
      likeCount: 2,
      dislikedBy: [],
      likedBy: [
        {
          _id: uuid(),
          firstName: "Yuvraj",
          lastName: "Kumar",
          username: "yuvraj123",
          profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
        },
        {
          _id: uuid(),
          firstName: "Harsh",
          lastName: "Vardhan",
          username: "harsh123",
          profileAvatar: "https://avatars.githubusercontent.com/u/67819701?v=4",
        },
      ],
    },

    media: "",
    createdAt: "2023-06-25",
    updatedAt: "2023-06-25",
    comments: [
      {
        _id: uuid(),
        firstName: "Yuvraj",
        lastName: "Kumar",
        username: "yuvraj123",
        profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
        createdAt: "2023-02-19",
        updatedAt: formatDate(),
        comment: "Yo!",
      },
      {
        _id: uuid(),
        firstName: "Harsh",
        lastName: "Vardhan",
        username: "harsh123",
        profileAvatar: "https://avatars.githubusercontent.com/u/67819701?v=4",
        createdAt: "2023-02-19",
        updatedAt: "2023-02-19",
        comment: "nice nice!",
      },
    ],
  },

  {
    _id: "p4",
    firstName: "Yuvraj",
    lastName: "Kumar",
    username: "yuvraj123",
    profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
    content: "Why this kolaveri-Di ?",
    media: "",
    createdAt: "2023-06-21",
    updatedAt: "2023-06-21",

    likes: {
      likeCount: 2,
      dislikedBy: [],
      likedBy: [
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
          firstName: "Harsh",
          lastName: "Vardhan",
          username: "harsh123",
          profileAvatar: "https://avatars.githubusercontent.com/u/67819701?v=4",
        },
      ],
    },

    comments: [
      {
        _id: uuid(),
        firstName: "Anamika",
        lastName: "",
        username: "anamika123",
        profileAvatar:
          "https://media.licdn.com/dms/image/D5603AQH4CjoVxLewyA/profile-displayphoto-shrink_400_400/0/1686765403158?e=1692230400&v=beta&t=TD2bZvpcrwyQ_xRFJWcKGrdedAU3zbyss3ygheSSveA",
        createdAt: "2023-04-21",
        updatedAt: formatDate(),
        comment: "Haha!",
      },
      {
        _id: uuid(),
        firstName: "Harsh",
        lastName: "Vardhan",
        username: "harsh123",
        profileAvatar: "https://avatars.githubusercontent.com/u/67819701?v=4",
        createdAt: "2023-04-21",
        updatedAt: "2023-04-21",
        comment: "nice nice!",
      },
    ],
  },
  {
    _id: "p5",
    firstName: "Yuvraj",
    lastName: "Kumar",
    username: "yuvraj123",
    profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
    content: "Visited kedarnath! Jai shiv ji !!",
    media:
      "https://res.cloudinary.com/yuvraj1905/image/upload/v1687578017/91370194_gkqi4s.webp",
    createdAt: "2023-04-21",
    updatedAt: "2023-04-21",

    likes: {
      likeCount: 2,
      dislikedBy: [],
      likedBy: [
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
            "https://res.cloudinary.com/yuvraj1905/image/upload/v1687716248/844-8444619_student-png-male-student-cartoon-png_ibwnbv.png",
        },
        {
          _id: uuid(),
          firstName: "Yuvraj",
          lastName: "Kumar",
          username: "yuvraj123",
          profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
        },
        {
          _id: uuid(),
          firstName: "Harsh",
          lastName: "Vardhan",
          username: "harsh123",
          profileAvatar: "https://avatars.githubusercontent.com/u/67819701?v=4",
        },
      ],
    },

    comments: [
      {
        _id: uuid(),
        firstName: "Anamika",
        lastName: "",
        username: "anamika123",
        profileAvatar:
          "https://media.licdn.com/dms/image/D5603AQH4CjoVxLewyA/profile-displayphoto-shrink_400_400/0/1686765403158?e=1692230400&v=beta&t=TD2bZvpcrwyQ_xRFJWcKGrdedAU3zbyss3ygheSSveA",
        createdAt: "2023-04-21",
        updatedAt: formatDate(),
        comment: "Jai Shiv!",
      },
      {
        _id: uuid(),
        firstName: "Harsh",
        lastName: "Vardhan",
        username: "harsh123",
        profileAvatar: "https://avatars.githubusercontent.com/u/67819701?v=4",
        createdAt: "2023-04-21",
        updatedAt: "2023-04-21",
        comment: "nice nice!",
      },
    ],
  },
  {
    _id: "p6",
    firstName: "Anamika",
    lastName: "",
    username: "anamika123",
    profileAvatar:
      "https://media.licdn.com/dms/image/D5603AQH4CjoVxLewyA/profile-displayphoto-shrink_400_400/0/1686765403158?e=1692230400&v=beta&t=TD2bZvpcrwyQ_xRFJWcKGrdedAU3zbyss3ygheSSveA",
    content: "Started learning Java",

    likes: {
      likeCount: 2,
      dislikedBy: [],
      likedBy: [
        {
          _id: uuid(),
          firstName: "Yuvraj",
          lastName: "Kumar",
          username: "yuvraj123",
          profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
        },
        {
          _id: uuid(),
          firstName: "Harsh",
          lastName: "Vardhan",
          username: "harsh123",
          profileAvatar: "https://avatars.githubusercontent.com/u/67819701?v=4",
        },
      ],
    },

    media: "",
    createdAt: "2023-02-19",
    updatedAt: "2023-02-19",
    comments: [
      {
        _id: uuid(),
        firstName: "Yuvraj",
        lastName: "Kumar",
        username: "yuvraj123",
        profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
        createdAt: "2023-02-19",
        updatedAt: formatDate(),
        comment: "Yo!",
      },
      {
        _id: uuid(),
        firstName: "Harsh",
        lastName: "Vardhan",
        username: "harsh123",
        profileAvatar: "https://avatars.githubusercontent.com/u/67819701?v=4",
        createdAt: "2023-02-19",
        updatedAt: formatDate(),
        comment: "nice nice!",
      },
    ],
  },
  {
    _id: "p7",
    firstName: "Harsh",
    lastName: "Vardhan",
    username: "harsh123",
    profileAvatar: "https://avatars.githubusercontent.com/u/67819701?v=4",
    content: "I'm going to hit gym from tom.",

    likes: {
      likeCount: 2,
      dislikedBy: [],
      likedBy: [
        {
          _id: uuid(),
          firstName: "Yuvraj",
          lastName: "Kumar",
          username: "yuvraj123",
          profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
        },
        {
          _id: uuid(),
          firstName: "Mayank",
          lastName: "Kumar",
          username: "mayank123",
          profileAvatar: "https://avatars.githubusercontent.com/u/36763315?v=4",
        },
      ],
    },

    media: "",
    createdAt: "2023-06-04",
    updatedAt: "2023-06-04",
    comments: [
      {
        _id: uuid(),
        firstName: "Mayank",
        lastName: "Kumar",
        username: "mayank123",
        profileAvatar: "https://avatars.githubusercontent.com/u/36763315?v=4",
        createdAt: "2023-06-04",
        updatedAt: formatDate(),
        comment: "Waao !",
      },
    ],
  },
  {
    _id: "p8",
    firstName: "Harsh",
    lastName: "Vardhan",
    username: "harsh123",
    profileAvatar: "https://avatars.githubusercontent.com/u/67819701?v=4",
    content: "Lifting new challenges ! ",

    likes: {
      likeCount: 2,
      dislikedBy: [],
      likedBy: [
        {
          _id: uuid(),
          firstName: "Yuvraj",
          lastName: "Kumar",
          username: "yuvraj123",
          profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
        },
        {
          _id: uuid(),
          firstName: "Mayank",
          lastName: "Kumar",
          username: "mayank123",
          profileAvatar: "https://avatars.githubusercontent.com/u/36763315?v=4",
        },
      ],
    },

    media:
      "https://res.cloudinary.com/yuvraj1905/image/upload/v1687949883/gym_management-min_z042yf.jpg",
    createdAt: "2023-06-05",
    updatedAt: "2023-06-05",
    comments: [
      {
        _id: uuid(),
        firstName: "Mayank",
        lastName: "Kumar",
        username: "mayank123",
        profileAvatar: "https://avatars.githubusercontent.com/u/36763315?v=4",
        createdAt: "2023-06-05",
        updatedAt: formatDate(),
        comment: "Very nice !",
      },
    ],
  },
  {
    _id: "p9",
    firstName: "Anamika",
    lastName: "",
    username: "anamika123",
    profileAvatar:
      "https://media.licdn.com/dms/image/D5603AQH4CjoVxLewyA/profile-displayphoto-shrink_400_400/0/1686765403158?e=1692230400&v=beta&t=TD2bZvpcrwyQ_xRFJWcKGrdedAU3zbyss3ygheSSveA",
    content: "CSK champions for the 5th time!",

    likes: {
      likeCount: 5,
      dislikedBy: [],
      likedBy: [
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
            "https://res.cloudinary.com/yuvraj1905/image/upload/v1687716248/844-8444619_student-png-male-student-cartoon-png_ibwnbv.png",
        },
        {
          _id: uuid(),
          firstName: "Yuvraj",
          lastName: "Kumar",
          username: "yuvraj123",
          profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
        },
        {
          _id: uuid(),
          firstName: "Harsh",
          lastName: "Vardhan",
          username: "harsh123",
          profileAvatar: "https://avatars.githubusercontent.com/u/67819701?v=4",
        },
        {
          _id: uuid(),
          firstName: "Mayank",
          lastName: "Kumar",
          username: "mayank123",
          profileAvatar: "https://avatars.githubusercontent.com/u/36763315?v=4",
        },
      ],
    },

    media:
      "https://res.cloudinary.com/yuvraj1905/image/upload/v1687949942/ipl-2023-winner-chennai-super-kings-csk_nkwc6o.jpg",
    createdAt: "2023-06-17",
    updatedAt: "2023-06-17",
    comments: [
      {
        _id: uuid(),
        firstName: "Yuvraj",
        lastName: "Kumar",
        username: "yuvraj123",
        profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
        createdAt: "2023-02-19",
        updatedAt: formatDate(),
        comment: "Yo!",
      },
      {
        _id: uuid(),
        firstName: "Harsh",
        lastName: "Vardhan",
        username: "harsh123",
        profileAvatar: "https://avatars.githubusercontent.com/u/67819701?v=4",
        createdAt: "2023-02-19",
        updatedAt: formatDate(),
        comment: "nice nice!",
      },
    ],
  },
  {
    _id: "p10",
    firstName: "Mayank",
    lastName: "Kumar",
    username: "mayank123",
    profileAvatar: "https://avatars.githubusercontent.com/u/36763315?v=4",
    content: "New sensation",

    likes: {
      likeCount: 3,
      dislikedBy: [],
      likedBy: [
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
            "https://res.cloudinary.com/yuvraj1905/image/upload/v1687716248/844-8444619_student-png-male-student-cartoon-png_ibwnbv.png",
        },
        {
          _id: uuid(),
          firstName: "Yuvraj",
          lastName: "Kumar",
          username: "yuvraj123",
          profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
        },
      ],
    },

    media:
      "https://res.cloudinary.com/yuvraj1905/image/upload/v1687950009/ap-dhillon-stock-1-min_bzihym.jpg",
    createdAt: "2023-06-09",
    updatedAt: "2023-06-09",
    comments: [
      {
        _id: uuid(),
        firstName: "Yuvraj",
        lastName: "Kumar",
        username: "yuvraj123",
        profileAvatar: "https://avatars.githubusercontent.com/u/94983216?v=4",
        createdAt: "2023-06-12",
        updatedAt: formatDate(),
        comment: "Yo!",
      },
      {
        _id: uuid(),
        firstName: "Harsh",
        lastName: "Vardhan",
        username: "harsh123",
        profileAvatar: "https://avatars.githubusercontent.com/u/67819701?v=4",
        createdAt: "2023-06-12",
        updatedAt: formatDate(),
        comment: "nice nice!",
      },
    ],
  },
];
