import { ROLES } from "../utils/constants";
import { createStore } from "vuex";
import { auth } from "./modules/auth";
import { user } from "./modules/user";
import { club } from "./modules/club";
import { role } from "./modules/role";
import { work } from "./modules/work";
import { workCommon } from "./modules/workCommon";
import { classroom } from "./modules/classroom";
import { document } from "./modules/document";

const store = createStore({
  namespaced: true,
  modules: {
    auth,
    user,
    club,
    role,
    work,
    workCommon,
    classroom,
    document,
  },
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isTransparent: "",
    isRTL: false,
    mcolor: "",
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    spinLoading: false,
    isSuccess: false,
    isDanger: false,
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      const sidenav = document.getElementById("sidenav-main");

      if (sidenav_show.classList.contains("g-sidenav-pinned")) {
        sidenav_show.classList.remove("g-sidenav-pinned");
        setTimeout(function () {
          sidenav.classList.remove("bg-white");
        }, 100);
        sidenav.classList.remove("bg-transparent");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-pinned");
        sidenav.classList.add("bg-white");
        sidenav.classList.remove("bg-transparent");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.isTransparent = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    setSpinLoading(state, payload) {
      state.spinLoading = payload;
    },
    setIsSuccess(state, payload) {
      state.isSuccess = true;
      const id = setTimeout(() => {
        state.isSuccess = false;
        clearTimeout(id);
      }, 1100);
    },
    setIsDanger(state, payload) {
      state.isDanger = true;
      const id = setTimeout(() => {
        state.isDanger = false;
        clearTimeout(id);
      }, 1100);
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
  },
  getters: {},
});

if (window.performance) {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const classroom = JSON.parse(localStorage.getItem("classroom") ?? "{}");

  if (user && !user.memberId) {
    store.commit("user/setIsAdmin", true);
    store.dispatch("club/getAllClubs");
  }
  if (
    user &&
    (user.roles.standOf === ROLES.CN || user.roles.standOf === ROLES.PCN)
  ) {
    store.commit("user/setPermissionChange", true);
    store.commit("classroom/setClassroomAccess", classroom);
  }

  if (user && (!user.memberId || user.roles.standOf === ROLES.QL)) {
    store.commit("user/setIsAdmin", true, { root: true });
    store.dispatch("club/getAllClubs", null, { root: true });
  }

  store.commit("user/setUser", user);
  store.dispatch("club/getAllClubs");
  store.dispatch("role/getAllRoles");
}

export default store;
