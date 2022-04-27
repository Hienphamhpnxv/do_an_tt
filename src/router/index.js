import { createRouter, createWebHashHistory } from "vue-router";
import Dashboards from "@/views/Dashboards.vue";
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
    },
  },
  {
    path: "/quan-ly-cong-viec",
    name: "WorkManage",
    component: WorkManage,
    meta: {
      name: "Quản lý công việc",
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
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
