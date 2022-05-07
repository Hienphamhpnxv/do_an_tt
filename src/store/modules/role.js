import instance from "../axios.config";

export const role = {
  namespaced: true,
  state: () => ({
    roles: [],
  }),
  mutations: {
    setRoles(state, payload) {
      state.roles = payload;
    },
  },
  actions: {
    async getAllRoles(_, payload) {
      await instance
        .get("/role/all-role")
        .then((res) => {
          _.commit("setRoles", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {},
};
