<template>
  <div class="container-fluid">
    <div
      class="mt-4 page-header min-height-300 border-radius-xl"
      :style="{
        backgroundImage: `url(${bgImg})`,

        backgroundPositionY: '50%',
      }"
    >
      <span class="mask bg-gradient-success opacity-6"></span>
    </div>
    <div class="mx-4 overflow-hidden card card-body blur shadow-blur mt-n6">
      <div class="row gx-4">
        <div class="col-auto">
          <div class="avatar avatar-xl position-relative">
            <img
              :src="user.avatar_url"
              alt="profile_image"
              class="shadow-sm w-100 border-radius-lg"
            />
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1">{{ user.name }}</h5>
            <p class="mb-0 text-sm font-weight-bold"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="py-4 container-fluid">
    <div class="mt-3 row">
      <div class="mt-4 col-24 mt-md-0"><member-card /></div>
    </div>
  </div>
</template>

<script>
import VsudSwitch from "@/components/VsudSwitch.vue";
import MemberCard from "./MemberCard.vue";
import VsudAvatar from "../../components/VsudAvatar.vue";
import sophie from "@/assets/img/kal-visuals-square.jpg";
import marie from "@/assets/img/marie.jpg";
import ivana from "@/assets/img/ivana-square.jpg";
import peterson from "@/assets/img/team-4.jpg";
import nick from "@/assets/img/team-3.jpg";
import bgImg from "@/assets/img/curved-images/curved14.jpg";
import ProjectsCard from "./../components/ProjectOverviewCard.vue";

import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";

import avatar from "@/assets/img/ivana-square.jpg";
import { mapState } from "vuex";

export default {
  name: "MemberProfile",
  components: {
    VsudSwitch,
    MemberCard,
    VsudAvatar,
    ProjectsCard,
  },
  data() {
    return {
      showMenu: false,
      sophie,
      marie,
      ivana,
      peterson,
      nick,
      bgImg,
      avatar,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  mounted() {
    this.$store.state.isAbsolute = true;
    this.$store.state.isNavFixed = false;
    setNavPills();
    setTooltip();
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
};
</script>
