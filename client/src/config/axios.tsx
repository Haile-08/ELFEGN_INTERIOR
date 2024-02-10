import Axios from "axios";
const axiosBaseURL = Axios.create({
  baseURL: "https://elfegn.onrender.com/",
});
export default axiosBaseURL;
