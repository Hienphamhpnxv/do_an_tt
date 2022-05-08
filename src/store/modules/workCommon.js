import instance from "../axios.config";

export const workCommon = {
  namespaced: true,
  state: () => ({
    works: [],
  }),
  mutations: {
    setWorks(state, payload) {
      state.works = payload;
    },
    addWorkToList(state, payload) {
      state.works.push(payload);
    },
    setListAfterDeleteWork(state, payload) {
      state.works = state.works.filter((el) => el._id !== payload);
    },
    setListAfterUpdateWork(state, payload) {
      const index = state.works.findIndex((el) => el._id === payload.id);
      if (index >= 0) {
        state.works.splice(index, 1, {
          ...state.works[index],
          ...payload.data,
        });
      }
    },
  },
  actions: {
    async getAllWorks(_, payload) {
      await instance
        .get(`/work-club/all-work-club`)
        .then((res) => {
          _.commit("setWorks", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async createWork(_, payload) {
      await instance
        .post("/work-club/create-work-club", payload)
        .then((res) => {
          if (res.data) {
            _.commit("addWorkToList", res.data);
          }
          return true;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    },
    async deleteWorkById(_, { id }) {
      return new Promise(async (resolve, reject) => {
        await instance
          .delete(`/work-club/delete-work-club/${id}`)
          .then((res) => {
            if (res.data.result) {
              _.commit("setListAfterDeleteWork", id);
              resolve(true);
            }
          })
          .catch(() => {
            reject(false);
          });
      });
    },
    updateUserById(_, { id, data }) {
      return new Promise(async (resolve, reject) => {
        await instance
          .put(`/work-club/update-work-club/${id}`, data)
          .then(async (res) => {
            if (res.data) {
              const club = [...res.data._doc.clubWorks];
              const teamSchool = [..._.rootState.club.clubSchool];
              const clubInfo = club.reduce((result, el) => {
                const hasClub = teamSchool.find((e) => e._id === el.clubId);
                if (hasClub) {
                  result.push(hasClub);
                }
                return result;
              }, []);
              _.commit("setListAfterUpdateWork", {
                id,
                data: { ...res.data._doc, clubInfo: [...clubInfo] },
              });
              resolve(true);
            }
          })
          .catch(() => {
            reject(false);
          });
      });
    },
  },
  getters: {},
};
