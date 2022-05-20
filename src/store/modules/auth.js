import instance from "../axios.config";
import { ROLES } from "../../utils/constants";

export const auth = {
  namespaced: true,
  state: () => ({
    // user: null,
  }),
  mutations: {},
  actions: {
    async login(_, { email, password }) {
      await instance
        .post("auth/signin", { email, password })
        .then((res) => {
          _.commit("user/setUser", res.data, { root: true });
          if (
            res.data &&
            (!res.data.memberId || res.data.roles.standOf === ROLES.QL)
          ) {
            _.commit("user/setIsAdmin", true, { root: true });
            _.dispatch("club/getAllClubs", null, { root: true });
          }

          if (
            (res.data && res.data.roles.standOf === ROLES.CN) ||
            res.data.roles.standOf === ROLES.PCN
          ) {
            _.commit("user/setPermissionChange", true, { root: true });
          }

          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async signup(_, payload) {
      await instance
        .post("auth/signup", payload)
        .then((res) => {
          _.commit("setSpinLoading", false, { root: true });
          _.commit("setIsSuccess", true, { root: true });
        })
        .catch((err) => {
          _.commit("setSpinLoading", false, { root: true });
          _.commit("setIsDanger", true, { root: true });
        });
    },
    logout(_, payload) {
      localStorage.removeItem("user");
      localStorage.removeItem("classroom");
      _.dispatch("user/reset", null, { root: true });
    },
  },
  getters: {
    isLoggedIn(state) {
      const user = localStorage.getItem("user");
      return user ? true : false;
    },
  },
};
