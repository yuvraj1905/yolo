export const dateJoinedCalculator = (userAccountCreationDate) => {
  const year = userAccountCreationDate?.slice(0, 4);
  const month = userAccountCreationDate?.slice(5, 7);
  // console.log(month, year);
  switch (month) {
    case "01": {
      return `January ${year}`;
    }
    case "02": {
      return `February ${year}`;
    }
    case "03": {
      return `March ${year}`;
    }
    case "04": {
      return `April ${year}`;
    }
    case "05": {
      return `May ${year}`;
    }
    case "06": {
      return `June ${year}`;
    }
    case "07": {
      return `July ${year}`;
    }
    case "08": {
      return `August ${year}`;
    }
    case "09": {
      return `September ${year}`;
    }
    case "10": {
      return `October ${year}`;
    }
    case "11": {
      return `November ${year}`;
    }
    case "12": {
      return `December ${year}`;
    }

    default:
      return userAccountCreationDate?.slice(0, 10);
  }
};

export const getPostDate = (postDate) => {
  const datePosted = new Date(postDate); //11-06-2023
  const timeNow = new Date();
  const millisec = Math.floor(timeNow - datePosted);
  const sec = Math.floor(millisec / 1000);
  if (sec > 59) {
    const min = Math.floor(sec / 60);
    if (min > 59) {
      const hours = Math.floor(min / 60);
      if (hours > 23) {
        const days = Math.floor(hours / 24);
        if (days > 30) {
          const months = Math.floor(days / 30);
          if (months > 11) {
            return datePosted.toLocaleDateString("en-us", {
              day: "numeric",
              year: "numeric",
              month: "short",
            });
          } else {
            return `${months}mo ago`;
          }
        } else {
          return `${days}d ago`;
        }
      } else {
        return `${hours}h ago`;
      }
    } else {
      return `${min}min ago`;
    }
  } else {
    return `few seconds ago`;
  }
};
