import instance from "../axios.config";

export const classroom = {
  namespaced: true,
  state: () => ({
    classrooms: [],
  }),
  mutations: {
    setClassrooms(state, payload) {
      state.classrooms = payload;
    },
  },
  actions: {},
  getters: {},
};
