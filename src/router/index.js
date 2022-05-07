import { createRouter, createWebHashHistory } from "vue-router";
import Dashboards from "@/views/Dashboards.vue";
import CommonWork from "@/views/commonWork/CommonWork.vue";
import Dashboard from "@/views/Dashboard.vue";
import Tables from "@/views/Tables.vue";
import Billing from "@/views/Billing.vue";
import VirtualReality from "@/views/VirtualReality.vue";
import Profile from "@/views/Profile.vue";
import Rtl from "@/views/Rtl.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import MemberManage from "@/views/member/MemberManage.vue";
import WorkManage from "@/views/work/WorkManage.vue";
import MemberProfile from "@/views/member/MemberProfile.vue";

import store from "../store";

const routes = [
  // {
  //   path: "/",
  //   name: "/",
  //   redirect: "/dashboard",
  // },
  {
    path: "/",
    name: "/",
    redirect: "/trang-chu",
  },
  {
    path: "/trang-chu",
    name: "TrangChu",
    component: Dashboards,
    meta: {
      name: "Trang chủ",
      requiresAuth: true,
    },
  },
  {
    path: "/cong-viec-chung",
    name: "CommonWork",
    component: CommonWork,
    meta: {
      name: "Công việc chung",
      requiresAuth: true,
    },
  },
  {
    path: "/trang-chu-example",
    name: "TrangChuExam",
    component: Dashboard,
  },
  {
    path: "/quan-ly-thanh-vien",
    name: "ManageMember",
    component: MemberManage,
    meta: {
      name: "Quản lý thành viên",
      requiresAuth: true,
    },
  },
  {
    path: "/quan-ly-cong-tac-vien",
    name: "ManageMemberColab",
    component: MemberManage,
    meta: {
      name: "Quản lý cộng tác viên",
      memberColab: true,
      requiresAuth: true,
    },
  },
  {
    path: "/quan-ly-cong-viec",
    name: "WorkManage",
    component: WorkManage,
    meta: {
      name: "Quản lý hoạt động",
      requiresAuth: true,
    },
  },
  {
    path: "/ca-nhan",
    name: "MemberProfile",
    component: MemberProfile,
    meta: {
      name: "Trang cá nhân",
      requiresAuth: true,
    },
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/rtl-page",
    name: "Rtl",
    component: Rtl,
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from) => {
  const isLoggin = store.getters["auth/isLoggedIn"];
  const user = JSON.parse(window.localStorage.getItem("user"));
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (user) {
    const decodedJwt = parseJwt(user.accessToken);

    if (decodedJwt.exp * 1000 < Date.now()) {
      return {
        path: "/sign-in",
      };
    }
  }

  if (to.meta.requiresAuth && !isLoggin) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: "/sign-in",
    };
  }
});

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default router;
