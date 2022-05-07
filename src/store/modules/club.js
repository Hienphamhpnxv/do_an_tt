import instance from "../axios.config";
import logoITSupport from "@/assets/img/logo-ct.png";
import logoHit from "@/assets/img/hit.jpg";
import logoTNTN from "@/assets/img/tntn.jpg";
import logoIStar from "@/assets/img/istar.jpg";
import logoFIT from "@/assets/img/fit.jpg";

export const club = {
  namespaced: true,
  state: () => ({
    clubSchool: [
      {
        logo: logoITSupport,
      },
      {
        logo: logoHit,
      },
      {
        logo: logoTNTN,
      },
      {
        logo: logoIStar,
      },
      {
        logo: logoFIT,
      },
    ],
  }),
  mutations: {
    setClubSchool(state, payload) {
      const data = payload.map((el, index) => {
        return { ...state.clubSchool[index], ...el };
      });
      state.clubSchool = data;
    },
    setAddClub(state, payload) {
      state.clubSchool.push(payload);
    },
  },
  actions: {
    async getAllClubs(_, payload) {
      await instance
        .get("/club/get-all")
        .then((res) => {
          _.commit("setClubSchool", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createClub(_, payload) {
      return new Promise(async (resolve, reject) => {
        await instance
          .post("/club/create-club", payload)
          .then((res) => {
            _.commit("setAddClub", res.data);
            resolve(true);
          })
          .catch((err) => {
            reject(false);
          });
      });
    },
  },
  getters: {},
};
