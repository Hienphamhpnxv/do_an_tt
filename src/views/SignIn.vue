<template>
  <!-- <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          is-blur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow"
          btn-background="bg-gradient-success"
          :dark-mode="true"
        />
      </div>
    </div>
  </div> -->
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-info text-gradient">
                    Welcome back
                  </h3>
                  <p class="mb-0">Nhập thông tin email và mật khẩu</p>
                </div>
                <div class="card-body">
                  <form @submit.prevent role="form" class="text-start">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label"
                        >Email</label
                      >
                      <input
                        id="email"
                        v-model="user.email"
                        type="email"
                        class="form-control"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <label>Mật khẩu</label>
                    <vsud-input
                      id="password"
                      v-model="user.password"
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                    <!-- <vsud-switch id="rememberMe" checked
                      >Remember me</vsud-switch
                    > -->
                    <div class="text-center">
                      <vsud-button
                        @click="handleSignin"
                        class="my-4 mb-2"
                        variant="gradient"
                        color="info"
                        full-width
                        >Đăng nhập</vsud-button
                      >
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Chưa có tài khoản?
                    <a
                      href="javascript:;"
                      class="text-info text-gradient font-weight-bold"
                      >Đăng ký</a
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div
                class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8"
              >
                <div
                  class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    backgroundImage: `url(${bgImg})`,
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="page-header vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto d-flex flex-column">
              <div class="container">
                <div class="left">
                  <div class="login">Login</div>
                  <div class="eula">
                    <b>CLB Hỗ trợ Kỹ thuật IT Suppoter</b>
                  </div>
                </div>
                <div class="right">
                  <form class="form">
                    <label for="email">Email</label>
                    <input type="email" id="email" class="email" />
                    <label for="password">Password</label>
                    <input type="password" id="password" class="password" />
                    <div class="group-btn">
                      <input
                        class="btn btn-submit"
                        type="submit"
                        id="submit"
                        value="Submit"
                      />
                    </div>
                    <div class="text-center">
                      <vsud-button
                        class="my-4 mb-2 btn btn-submit"
                        variant="gradient"
                        color="info"
                        full-width
                        @click="handleSignin"
                        >Sign in</vsud-button
                      >
                    </div>
                  </form>
                  <div class="signup-link">
                    <a href="#"><u>Register</u></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </section>
  </main>
  <!-- <app-footer /> -->
</template>

<script>
import { mapActions } from "vuex";

import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import VsudInput from "@/components/VsudInput.vue";
import VsudSwitch from "@/components/VsudSwitch.vue";
import VsudButton from "@/components/VsudButton.vue";
import bgImg from "@/assets/img/curved-images/curved9.jpg";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "SigninPage",
  components: {
    Navbar,
    AppFooter,
    VsudInput,
    VsudSwitch,
    VsudButton,
  },
  data() {
    return {
      bgImg,
      user: {
        email: "",
        password: "",
      },
    };
  },
  beforeMount() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapActions("auth/", ["login"]),
    async handleSignin() {
      const { user } = this;
      console.log(user.email && user.password);
      if (user.email && user.password) {
        await this.login(user).then(() => {
          this.$router.push({ name: "TrangChu" });
          window.location.href = window.location.origin;
        });
      } else {
        console.log("Tài khoản hoặc mật khẩu không đúng");
      }
    },
  },
};
</script>
<style scoped></style>
