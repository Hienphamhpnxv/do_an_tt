export const auth = {
  namespaced: true,
  state: () => ({
    user: null,
  }),
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async login(_, { email, password }) {
      return true;
    },
  },
  getters: {},
};
