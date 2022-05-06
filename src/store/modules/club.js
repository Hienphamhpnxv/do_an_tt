import instance from "../axios.config";
import logoITSupport from "@/assets/img/logo-ct.png";
import logoHit from "@/assets/img/hit.jpg";
import logoTNTN from "@/assets/img/tntn.jpg";
import logoIStar from "@/assets/img/istar.jpg";
import logoFIT from "@/assets/img/fit.jpg";

export const club = {
  namespaced: true,
  state: () => ({
    currentClub: {},
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
    setCurrentClub(state, payload) {
      state.currentClub = payload;
    },
    setClubSchool(state, payload) {
      const data = payload.map((el, index) => {
        return { ...state.clubSchool[index], ...el };
      });
      state.clubSchool = data;
    },
  },
  actions: {
    async getAllClubs(_, payload) {
      await instance
        .get("/club/get-all")
        .then((res) => {
          _.commit("setClubSchool", res.data);
          _.dispatch("setCurrentClub");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setCurrentClub(_, payload) {
      let current = JSON.parse(window.localStorage.getItem("currentClub"));

      if (!current) {
        current = _.state.clubSchool[0];
        window.localStorage.setItem("currentClub", JSON.stringify(current));
      }
      _.commit("setCurrentClub", current);
    },
  },
  getters: {},
};
