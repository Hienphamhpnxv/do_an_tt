import axios from "axios";
import store from "./index";

const headerJWT = () => {
  if (user && user.accessToken) {
    return {
      "x-access-token": user?.accessToken,
    };
  } else {
    return {};
  }
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 500,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    const userInfo = store.getters["user/getUserInfo"];
    if (userInfo && userInfo.accessToken) {
      config.headers["x-access-token"] = userInfo.accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
