<template>
  <nav
    v-bind="$attrs"
    id="navbarBlur"
    class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl"
    data-scroll="true"
  >
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs :current-page="currentRouteName" :text-white="textWhite" />
      <div
        id="navbar"
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="$store.state.isRTL ? 'px-0' : 'me-sm-4'"
      >
        <div
          class="pe-md-3 d-flex align-items-center"
          :class="$store.state.isRTL ? 'me-md-auto' : 'ms-md-auto'"
        >
          <div class="input-group">
            <span class="input-group-text text-body">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
            <input
              type="text"
              class="form-control"
              :placeholder="$store.state.isRTL ? 'أكتب هنا...' : 'Type here...'"
            />
          </div>
        </div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-flex align-items-center">
            <!-- avatar -->
            <div class="d-flex align-items-center">
              <div
                class="rounded-circle overflow-hidden border border-red-500 border-1 me-2"
                style="height: 40px; width: 40px"
              >
                <img
                  :src="user?.avatar_url || ''"
                  class="img-thumbnail h-100 cursor-pointer"
                  alt="avatar"
                />
              </div>
              <p class="m-0 cursor-pointer font-normal fs-6">
                {{ user?.name }}
              </p>
            </div>
          </li>
          <!-- <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a
              id="iconNavbarSidenav"
              href="#"
              class="p-0 nav-link text-body"
              @click="toggleSidebar"
            >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </a>
          </li>
          <li class="px-3 nav-item d-flex align-items-center">
            <a
              class="p-0 nav-link"
              :class="textWhite ? textWhite : 'text-body'"
              @click="toggleConfigurator"
            >
              <i class="cursor-pointer fa fa-cog fixed-plugin-button-nav"></i>
            </a>
          </li> -->
          <li
            v-if="isAdmin"
            class="nav-item dropdown d-flex align-items-center ms-2"
            :class="$store.state.isRTL ? 'ps-2' : 'pe-2'"
          >
            <a
              id="dropdownMenuButton"
              href="#"
              class="p-0 nav-link"
              :class="[
                textWhite ? textWhite : 'text-body',
                showMenu ? 'show' : '',
              ]"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click="showMenu = !showMenu"
            >
              <span class="btn btn-light p-2 fw-normal m-0">Chuyển CLB</span>
            </a>
            <ul
              class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4"
              :class="showMenu ? 'show' : ''"
              aria-labelledby="dropdownMenuButton"
            >
              <li class="mb-2" v-for="team in teamInSchool" :key="team.id">
                <a
                  class="dropdown-item border-radius-md"
                  href="javascript:;"
                  @click="transfor(team.id)"
                >
                  <div class="py-1 d-flex">
                    <div class="my-auto">
                      <img
                        :src="team.logo"
                        class="avatar avatar-sm me-3"
                        alt="user image"
                      />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal">
                        <span class="font-weight-bold">{{ team.name }}</span>
                      </h6>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapMutations, mapActions, mapState } from "vuex";

export default {
  name: "NavbarComponent",

  components: {
    Breadcrumbs,
  },
  props: {
    minNav: {
      type: Function,
      default: () => {},
    },
    textWhite: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showMenu: false,
      user: null,
    };
  },
  mounted() {
    this.getUserInfo();
  },
  computed: {
    ...mapState({
      teamInSchool: (state) => state.club.clubSchool,
      isAdmin: (state) => state.user.isAdmin,
    }),
    currentRouteName() {
      return this.$route.meta?.name || this.$route.name;
    },
  },
  created() {
    this.minNav;
  },
  updated() {
    const navbar = document.getElementById("navbarBlur");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10 && this.$store.state.isNavFixed) {
        navbar.classList.add("blur");
        navbar.classList.add("position-sticky");
        navbar.classList.add("shadow-blur");
      } else {
        navbar.classList.remove("blur");
        navbar.classList.remove("position-sticky");
        navbar.classList.remove("shadow-blur");
      }
    });
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),

    toggleSidebar() {
      this.toggleSidebarColor("bg-white");
      this.navbarMinimize();
    },
    getUserInfo() {
      this.user = this.$store.getters["user/getUserInfo"];
    },
    transfor() {
      this.$router.push({ name: "TrangChu" });
    },
  },
};
</script>
