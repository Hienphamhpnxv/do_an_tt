import instance from "../axios.config";
import logoITSupport from "@/assets/img/logo-ct.png";
import logoHit from "@/assets/img/hit.jpg";

export const club = {
  namespaced: true,
  state: () => ({
    currentClub: {},
    clubSchool: [
      {
        id: 0,
        name: "IT Supporter",
        logo: logoITSupport,
      },
      {
        id: 1,
        name: "HIT",
        logo: logoHit,
      },
    ],
  }),
  mutations: {
    setCurrentClub(state, payload) {
      state.currentClub = payload;
    },
    setClubSchool(state, payload) {
      state.clubSchool = payload;
    },
  },
  actions: {
    async getAllClubs(_, payload) {
      await instance
        .get("/club")
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
