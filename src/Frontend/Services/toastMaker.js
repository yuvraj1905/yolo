import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastMaker = (type, content, position = "top-center") => {
  return toast[type](content, {
    position: position,
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
