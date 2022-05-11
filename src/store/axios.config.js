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
    store.commit("setSpinLoading", true, { root: true });
    return config;
  },
  function (error) {
    store.commit("setSpinLoading", false, { root: true });
    // store.commit("setIsDanger", true, { root: true });
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    store.commit("setSpinLoading", false, { root: true });
    // store.commit("setIsSuccess", true, { root: true });
    return response;
  },
  function (error) {
    store.commit("setSpinLoading", false, { root: true });
    // store.commit("setIsDanger", true, { root: true });
    return Promise.reject(error);
  }
);

export default instance;
