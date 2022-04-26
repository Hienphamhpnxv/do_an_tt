<template>
  <div class="py-4 container-fluid" style="height: calc(100vh - 160px)">
    <div class="row">
      <div class="d-flex justify-content-center">
        <h3 class="text-uppercase text-warning">
          Câu lạc bộ hỗ trợ kỹ thuật it supporter
        </h3>
      </div>
    </div>
    <div class="h-75 d-flex accordion-body justify-content-center">
      <div class="w-100 row d-flex justify-content-between">
        <div class="col-3" v-for="manage in dummyManagerment" :key="manage.id">
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
      </div>
    </div>
    <div class="row accordion-body position-fixed bottom-0">
      <p>
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
      </p>
    </div>
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
    title: "Quản lý công việc",
    desc: " Wealth creation is an evolutionarily recent positive-sum game.It is all about who take the opportunity first.",
    image: image3,
    redirect: "/quan-ly-cong-viec",
  },
  {
    id: 3,
    title: "Dữ liệu lưu trữ",
    desc: " Wealth creation is an evolutionarily recent positive-sum game.It is all about who take the opportunity first.",
    image: image4,
    redirect: "/du-lieu-luu-tru",
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
