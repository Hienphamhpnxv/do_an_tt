import instance from "../axios.config";

export const user = {
  namespaced: true,
  state: () => ({
    user: null,
    isAdmin: false,
  }),
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setIsAdmin(state, payload) {
      state.isAdmin = payload;
    },
  },
  actions: {
    reset(_, payload) {
      _.commit("setUser", null);
      _.commit("setIsAdmin", false);
    },
    async addMember(_, payload) {
      await instance
        .post("/user", payload)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  },
  getters: {
    getUserInfo(state) {
      return state.user;
    },
  },
};
