<template>
  <div
    id="sidenav-collapse-main"
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse nav-text="Trang chủ" :to="{ name: 'TrangChu' }">
          <template #icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>
      <li v-if="!isAdmin && user.club?.hasClassroom" class="nav-item">
        <sidenav-collapse nav-text="Lớp học" :to="{ name: 'ClassroomList' }">
          <template #icon>
            <icon name="spaceship" />
          </template>
        </sidenav-collapse>
      </li>
      <li v-if="isAdmin" class="nav-item">
        <sidenav-collapse
          nav-text="Quản lý công việc chung"
          :to="{ name: 'CommonWork' }"
        >
          <template #icon>
            <icon name="office" />
          </template>
        </sidenav-collapse>
      </li>
      <!-- <li class="nav-item">
        <sidenav-collapse nav-text="Tables" :to="{ name: 'Tables' }">
          <template #icon>
            <icon name="tables" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="Billing" :to="{ name: 'Billing' }">
          <template #icon>
            <icon name="billing" />
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse
          nav-text="Virtual Reality"
          :to="{ name: 'Virtual Reality' }"
        >
          <template #icon>
            <icon name="virtual-reality" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="RTL" :to="{ name: 'Rtl' }">
          <template #icon>
            <icon name="rtl-page" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="Profile" :to="{ name: 'Profile' }">
          <template #icon>
            <icon name="customer-support" />
          </template>
        </sidenav-collapse>
      </li> -->
      <li v-if="isAdmin" class="nav-item">
        <sidenav-collapse
          href="javascript:;"
          nav-text="Tài khoàn quản trị"
          :to="{ name: 'AccountManagement' }"
        >
          <template #icon>
            <icon name="customer-support" />
          </template>
        </sidenav-collapse>
      </li>
      <!-- <li v-if="isAdmin" class="nav-item">
        <sidenav-collapse
          href="javascript:;"
          nav-text="Quản lý lớp học"
          :to="{ name: 'ClassroomManagement' }"
        >
          <template #icon>
            <icon name="spaceship" />
          </template>
        </sidenav-collapse>
      </li> -->
      <li class="nav-item">
        <sidenav-collapse
          href="javascript:;"
          nav-text="Đăng xuất"
          :to="{ name: 'Sign In' }"
        >
          <template #icon>
            <icon name="sign-in" />
          </template>
        </sidenav-collapse>
      </li>
      <!-- <li class="nav-item">
        <sidenav-collapse nav-text="Sign Up" :to="{ name: 'Sign Up' }">
          <template #icon>
            <icon name="sign-up" />
          </template>
        </sidenav-collapse>
      </li> -->
    </ul>
  </div>
  <!-- <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <sidenav-card
      :class="cardBg"
      text-primary="Need Help?"
      text-secondary="Please check our docs"
      href="https://www.creative-tim.com/learning-lab/vue/overview/soft-ui-dashboard/"
      link-text="Documentation"
      icon-class="ni ni-diamond"
    />
    <a
      class="btn bg-gradient-success mt-4 w-100"
      href="https://www.creative-tim.com/product/vue-soft-ui-dashboard-pro?ref=vsud"
      type="button"
      >Upgrade to pro</a
    >
  </div> -->
</template>
<script>
import Icon from "@/components/Icon.vue";
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavCard from "./SidenavCard.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "SidenavList",
  components: {
    Icon,
    SidenavCollapse,
    SidenavCard,
  },
  props: {
    cardBg: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      title: "Vite Soft UI Dashboard",
      controls: "dashboardsExamples",
      isActive: "active",
    };
  },
  beforeUnmount() {
    this.logout();
  },
  computed: {
    ...mapState({
      isAdmin: (state) => state.user.isAdmin,
      user: (state) => state.user.user,
    }),
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  },
};
</script>
