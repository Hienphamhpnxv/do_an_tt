import instance from "../axios.config";

export const classroom = {
  namespaced: true,
  state: () => ({
    classrooms: [],
  }),
  mutations: {
    setClassrooms(state, payload) {
      state.classrooms = [...state.classrooms, ...payload];
    },
  },
  actions: {
    createClassroom(_, payload) {
      return new Promise(async (resolve, reject) => {
        await instance
          .post("/classroom/create-class", payload)
          .then((res) => {
            _.commit("setIsSuccess", true, { root: true });
            const data = res.data.result;
            _.commit("setClassrooms", [data]);
            resolve(data);
          })
          .catch((err) => {
            _.commit("setIsDanger", true, { root: true });
            reject(err);
          });
      });
    },
    getAllClassrooms(_) {
      return new Promise(async (resolve, reject) => {
        const clubId = _.rootState.user.user?.club._id;
        if (clubId) {
          await instance
            .get(`/classroom/get-all-class/${clubId}`)
            .then((res) => {
              const data = res.data.result;
              _.commit("setClassrooms", data);
              resolve(data);
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
    },
  },
  getters: {},
};
