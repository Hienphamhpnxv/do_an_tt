import instance from "../axios.config";

export const user = {
  namespaced: true,
  state: () => ({
    user: null,
    isAdmin: false,
    permissionChange: false,
    listUser: [],
  }),
  mutations: {
    setUser(state, payload) {
      state.user = { ...state.user, ...payload };
    },
    setIsAdmin(state, payload) {
      state.isAdmin = payload;
    },
    setPermissionChange(state, payload) {
      state.permissionChange = payload;
    },
    setListUser(state, payload) {
      state.listUser = payload;
    },
    addUserToList(state, payload) {
      state.listUser.push(payload);
    },
    setListAfterDelete(state, payload) {
      state.listUser = state.listUser.filter((el) => el._id !== payload);
    },
    setUserToLocal(state, payload) {
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    setClubUer(state, payload) {
      state.user.club = payload;
    },
  },
  actions: {
    reset(_, payload) {
      _.commit("setUser", null);
      _.commit("setIsAdmin", false);
      _.commit("setPermissionChange", false);
    },
    async addMember(_, payload) {
      await instance
        .post("/user/create", payload)
        .then((res) => {
          if (res.data.data) {
            _.commit("addUserToList", res.data.data);
          }
        })
        .catch((err) => console.log(err));
    },
    async getAllUserByClub(_, payload) {
      _.commit("setSpinLoading", true, { root: true });
      const idClub = JSON.parse(localStorage.getItem("user")).club._id;
      await instance.get(`/user/all-users/${idClub}`).then((res) => {
        if (res.data) {
          _.commit("setListUser", res.data);
          _.commit("setSpinLoading", false, { root: true });
        }
      });
    },
    async getAllUser(_) {
      _.commit("setSpinLoading", true, { root: true });
      await instance.get(`/user/all-users`).then((res) => {
        if (res.data) {
          _.commit("setListUser", res.data);
          _.commit("setSpinLoading", false, { root: true });
        }
      });
    },
    deleteUserById(_, { id }) {
      return new Promise(async (resolve, reject) => {
        await instance
          .delete(`/user/${id}`)
          .then((res) => {
            if (res.data.result) {
              _.commit("setListAfterDelete", id);
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
          .put(`/user/${id}/update`, data)
          .then((res) => {
            if (res.data) {
              _.commit("setUser", res.data.result);
              _.commit("setUserToLocal");
              resolve(true);
            }
          })
          .catch(() => {
            reject(false);
          });
      });
    },
  },
  getters: {
    getUserInfo(state) {
      return state.user;
    },
  },
};
