import instance from "../axios.config";

export const classroom = {
  namespaced: true,
  state: () => ({
    classrooms: [],
    classroomAccess: null,
    filterClassroom: null,
  }),
  mutations: {
    setClassrooms(state, payload) {
      state.classrooms = [...state.classrooms, ...payload];
    },
    setFilterClassroom(state, payload) {
      state.filterClassroom = payload;
    },
    setClassroomAccess(state, payload) {
      localStorage.setItem("classroom", JSON.stringify(payload ?? {}));
      state.classroomAccess = payload;
    },
    updateClassroomAfterUpdate(state, payload) {
      const index = state.classrooms.findIndex(
        (el) => el._id === state.classroomAccess._id
      );
      if (index >= 0) {
        state.classrooms.splice(index, 1, {
          ...state.classrooms[index],
          ...payload.data,
        });
      }
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
    async updateStatusClassroom(_, { status }) {
      return new Promise(async (resolve, reject) => {
        const statusActive = status;
        if (_.state.classroomAccess) {
          await instance
            .put(`/classroom/update-class/${_.state.classroomAccess._id}`, {
              statusActive,
            })
            .then((res) => {
              _.commit("updateClassroomAfterUpdate", {
                data: { ...res.data._doc },
              });
              _.commit("setSpinLoading", false, { root: true });
              _.commit("setIsSuccess", true, { root: true });
              resolve(true);
            })
            .catch((err) => {
              _.commit("setSpinLoading", false, { root: true });
              _.commit("setIsDanger", true, { root: true });
              reject(false);
            });
        }
      });
    },
  },
  getters: {},
};
