<template>
  <div class="py-4 container-fluid" style="height: calc(100vh - 160px)">
    <div class="row">
      <!-- <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <card
          :title="stats.money.title"
          :value="stats.money.value"
          :percentage="stats.money.percentage"
          :icon-class="stats.money.iconClass"
          :icon-background="stats.iconBackground"
          direction-reverse
        ></card>
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <card
          :title="stats.users.title"
          :value="stats.users.value"
          :percentage="stats.users.percentage"
          :icon-class="stats.users.iconClass"
          :icon-background="stats.iconBackground"
          direction-reverse
        ></card>
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <card
          :title="stats.clients.title"
          :value="stats.clients.value"
          :percentage="stats.clients.percentage"
          :icon-class="stats.clients.iconClass"
          :icon-background="stats.iconBackground"
          :percentage-color="stats.clients.percentageColor"
          direction-reverse
        ></card>
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0">
        <card
          :title="stats.sales.title"
          :value="stats.sales.value"
          :percentage="stats.sales.percentage"
          :icon-class="stats.sales.iconClass"
          :icon-background="stats.iconBackground"
          direction-reverse
        ></card>
      </div> -->
      <div class="d-flex justify-content-center">
        <h3 class="text-uppercase text-warning">
          Câu lạc bộ hỗ trợ kỹ thuật it supporter
        </h3>
      </div>
    </div>
    <div class="h-100 d-flex accordion-body justify-content-center">
      <div class="w-100 row d-flex justify-content-between gx-5">
        <div class="col-3" v-for="manage in dummyManagerment" :key="manage.id">
          <div class="card h-75 p-3">
            <div
              class="overflow-hidden position-relative border-radius-lg bg-cover h-100 cursor-pointer bg-center"
              :style="{ backgroundImage: 'url(' + manage.image + ')' }"
            >
              <span class="mask bg-gradient-dark"></span>
              <div
                class="card-body position-relative z-index-1 d-flex flex-column h-100 p-3"
              >
                <h5
                  class="text-white font-weight-bolder mb-4 pt-2 text-uppercase"
                >
                  {{ manage.title }}
                </h5>
                <!-- <p class="text-white">
                  {{ manage.desc }}
                </p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="mt-4 row">
      <div class="mb-4 col-lg-5 mb-lg-0">
        <div class="card z-index-2">
          <div class="p-3 card-body">
            <active-users-chart />
          </div>
        </div>
      </div>
      <div class="col-lg-7">
        <div class="card z-index-2">
          <gradient-line-chart />
        </div>
      </div>
    </div> -->
    <!-- <div class="row my-4">
      <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
        <projects-card />
      </div>
      <div class="col-lg-4 col-md-6">
        <Orders-card />
      </div>
    </div> -->
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import ActiveUsersChart from "@/examples/Charts/ActiveUsersChart.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import OrdersCard from "./components/OrdersCard.vue";
import ProjectsCard from "./components/ProjectsCard.vue";

import image1 from "../assets/img/home-page/img-1.jpg";
import image2 from "../assets/img/home-page/img-2.jpg";
import image3 from "../assets/img/home-page/img-3.jpg";
import image4 from "../assets/img/home-page/img-4.jpg";

const dummyManagerment = [
  {
    id: 0,
    title: "Quản lý thành viên",
    desc: " Wealth creation is an evolutionarily recent positive-sum game.It is all about who take the opportunity first.",
    image: image1,
  },
  {
    id: 1,
    title: "Quản lý cộng tác viên",
    desc: " Wealth creation is an evolutionarily recent positive-sum game.It is all about who take the opportunity first.",
    image: image2,
  },
  {
    id: 2,
    title: "Quản lý công việc",
    desc: " Wealth creation is an evolutionarily recent positive-sum game.It is all about who take the opportunity first.",
    image: image3,
  },
  {
    id: 3,
    title: "Dữ liệu lưu trữ",
    desc: " Wealth creation is an evolutionarily recent positive-sum game.It is all about who take the opportunity first.",
    image: image4,
  },
];

export default {
  name: "DashboardDefault",
  components: {
    Card,
    ActiveUsersChart,
    GradientLineChart,
    ProjectsCard,
    OrdersCard,
  },
  data() {
    return { dummyManagerment };
  },
};
</script>
