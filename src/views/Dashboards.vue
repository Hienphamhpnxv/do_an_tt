<template>
  <div class="py-4 container-fluid" style="height: calc(100vh - 160px)">
    <div class="row">
      <div class="d-flex justify-content-center">
        <h3 class="text-uppercase text-warning">
          {{
            isAdmin && !selecteClub
              ? "Câu lạc bộ Khoa công nghệ thông tin"
              : user.club?.name
          }}
        </h3>
      </div>
    </div>
    <div class="mb-4" v-if="isAdmin && selecteClub">
      <vsud-button
        color="dark"
        v-if="isAdmin && selecteClub"
        variant="gradient"
        @click="goToDashboard"
      >
        <i class="fas fa-arrow-left me-2"></i>
        quay lại giao diện chính
      </vsud-button>
    </div>
    <div class="h-75 d-flex accordion-body justify-content-center">
      <div class="w-100 row d-flex justify-content-between">
        <template v-if="isAdmin && !selecteClub">
          <ClubList :dataList="teamInSchool" @select-club="selectClub" />
        </template>
        <template v-else>
          <div
            class="col-3"
            v-for="manage in dummyManagerment"
            :key="manage.id"
          >
            <router-link :to="manage.redirect">
              <div class="card h-75 p-2">
                <div
                  class="overflow-hidden position-relative border-radius-lg bg-cover h-100 cursor-pointer bg-center"
                  :style="{ backgroundImage: 'url(' + manage.image + ')' }"
                >
                  <span class="mask bg-gradient-dark"></span>
                  <div
                    class="card-body position-relative z-index-1 d-flex flex-column h-100 p-3"
                  >
                    <h5
                      class="text-white font-weight-bolder mb-4 pt-2 text-uppercase text-center"
                    >
                      {{ manage.title }}
                    </h5>
                    <!-- <p class="text-white">
                  {{ manage.desc }}
                </p> -->
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <template v-if="user.club?.hasClassroom && isAdmin">
            <router-link :to="classroomManagement.redirect">
              <div class="card h-75 p-2">
                <div
                  class="overflow-hidden position-relative border-radius-lg bg-cover h-100 cursor-pointer bg-center"
                  :style="{
                    backgroundImage: 'url(' + classroomManagement.image + ')',
                  }"
                >
                  <span class="mask bg-gradient-dark"></span>
                  <div
                    class="card-body position-relative z-index-1 d-flex flex-column h-100 p-3"
                  >
                    <h5
                      class="text-white font-weight-bolder mb-4 pt-2 text-uppercase text-center"
                    >
                      {{ classroomManagement.title }}
                    </h5>
                  </div>
                </div>
              </div>
            </router-link>
          </template>
        </template>
      </div>
    </div>
    <div class="row accordion-body position-fixed bottom-0" v-show="user.club">
      <p v-for="(text, index) in content" :key="index">
        {{ text }}
      </p>
      <!-- <p>
        CLB Hỗ Trợ Kỹ Thuật IT Supporter Khoa Công Nghệ Thông Tin- Trường ĐH
        Công Nghiệp Hà Nội
      </p>
      <p>Hotline: 0378982914</p>
      <p>Email: it.supporter@fit-haui.edu.vn</p>
      <p>
        Address: Văn phòng Đoàn thanh niên, tầng 8, nhà A1, ĐH Công nghiệp Hà
        Nội
      </p>
      <p>
        Fanpage:
        <a href="https://www.facebook.com/ITSupport.HaUI">IT Supporter</a>
      </p> -->
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import ClubList from "./club/ClubList.vue";
import Card from "@/examples/Cards/Card.vue";
import ActiveUsersChart from "@/examples/Charts/ActiveUsersChart.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import OrdersCard from "./components/OrdersCard.vue";
import ProjectsCard from "./components/ProjectsCard.vue";
import VsudButton from "@/components/VsudButton.vue";

import image1 from "../assets/img/home-page/img-1.jpg";
import image2 from "../assets/img/home-page/img-2.jpg";
import image3 from "../assets/img/home-page/img-3.jpg";

const dummyManagerment = [
  {
    id: 0,
    title: "Quản lý thành viên",
    desc: " Wealth creation is an evolutionarily recent positive-sum game.It is all about who take the opportunity first.",
    image: image1,
    redirect: "/quan-ly-thanh-vien",
  },
  {
    id: 1,
    title: "Quản lý cộng tác viên",
    desc: " Wealth creation is an evolutionarily recent positive-sum game.It is all about who take the opportunity first.",
    image: image2,
    redirect: "/quan-ly-cong-tac-vien",
  },
  {
    id: 2,
    title: "Quản lý hoạt động",
    desc: " Wealth creation is an evolutionarily recent positive-sum game.It is all about who take the opportunity first.",
    image: image3,
    redirect: "/quan-ly-cong-viec",
  },
];

const classroomManagement = {
  title: "Quản lý lớp học",
  desc: " Wealth creation is an evolutionarily recent positive-sum game.It is all about who take the opportunity first.",
  image: image3,
  redirect: "/quan-ly-lop-hoc",
};

export default {
  name: "DashboardDefault",
  components: {
    Card,
    ActiveUsersChart,
    GradientLineChart,
    ProjectsCard,
    OrdersCard,
    ClubList,
    VsudButton,
  },
  data() {
    return { dummyManagerment, classroomManagement, selecteClub: false };
  },
  computed: {
    ...mapState({
      teamInSchool: (state) => state.club.clubSchool,
      isAdmin: (state) => state.user.isAdmin,
      user: (state) => state.user.user,
      listUser: (state) => state.user.listUser,
    }),
    content() {
      return this.user?.club?.description?.split("\n");
    },
  },
  created() {
    this.$store.state.isTransparent = "bg-transparent";
    if (!this.listUser.length) {
      if (this.isAdmin) {
        this.getAllUser();
      } else {
        this.getAllUserByClub();
      }
    }
  },
  beforeMount() {
    if (this.isAdmin) {
      this.goToDashboard();
    }
  },
  methods: {
    ...mapMutations({
      setClubUer: "user/setClubUer",
      setUserToLocal: "user/setUserToLocal",
    }),
    ...mapActions({
      getAllUserByClub: "user/getAllUserByClub",
      getAllUser: "user/getAllUser",
      deleteUserById: "user/deleteUserById",
    }),
    addClub() {},
    selectClub(data) {
      this.setClubUer(data);
      this.setUserToLocal();
      this.selecteClub = true;
    },
    goToDashboard() {
      this.setClubUer(null);
      this.setUserToLocal();
      this.selecteClub = false;
    },
  },
};
</script>
