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
          if (res.data && !res.data.memberId) {
            _.commit("user/setIsAdmin", true, { root: true });
            _.dispatch("club/getAllClubs", null, { root: true });
          }

          if (
            (res.data && res.data.roles.standOf === ROLES.CN) ||
            res.data.roles.standOf === ROLES.PCN
          ) {
            _.commit("user/setPermissionChange", true, { root: true });
          }

          window.localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async signup(_, { email, password }) {
      await instance
        .post("auth/signup", { email, password })
        .then((res) => {
          window.localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout(_, payload) {
      window.localStorage.removeItem("user");
      _.dispatch("user/reset", null, { root: true });
    },
  },
  getters: {
    isLoggedIn(state) {
      const user = window.localStorage.getItem("user");
      return user ? true : false;
    },
  },
};
