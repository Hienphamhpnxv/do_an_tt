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
      <!-- <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-info text-gradient">Welcome back</h3>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                  <form role="form" class="text-start">
                    <label>Email</label>
                    <vsud-input type="email" placeholder="Email" name="email" />
                    <label>Password</label>
                    <vsud-input type="password" placeholder="Password" name="password" />
                    <vsud-switch id="rememberMe" checked>Remember me</vsud-switch>
                    <div class="text-center">
                      <vsud-button
                        class="my-4 mb-2"
                        variant="gradient"
                        color="info"
                        full-width
                      >Sign in</vsud-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <a
                      href="javascript:;"
                      class="text-info text-gradient font-weight-bold"
                    >Sign up</a>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8">
                <div
                  class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    backgroundImage:
                      `url(${bgImg})`,
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="page-header vh-100">
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
                    <!-- <div class="group-btn">
                      <input
                        class="btn btn-submit"
                        type="submit"
                        id="submit"
                        value="Submit"
                      />
                    </div> -->
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
      </div>
    </section>
  </main>
  <!-- <app-footer /> -->
</template>

<script>
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
    handleSignin() {
      console.log(this.$route);
      this.$router.push({ name: "TrangChu", query: { redirect: "/" } });
      window.location.href = window.location.origin;
    },
  },
};
</script>
<style scoped>
::selection {
  background: #2d2f36;
}

::-moz-selection {
  background: #2d2f36;
}

body {
  background: white;
  font-family: "Inter UI", sans-serif;
  margin: 0;
  padding: 20px;
}

.page {
  background: #e2e2e5;
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  position: absolute;
  place-content: center;
  width: calc(100% - 40px);
}

@media (max-width: 767px) {
  .page {
    height: auto;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
}

.container {
  display: flex;
  height: 320px;
  margin: 0 auto;
  width: 640px;
}

@media (max-width: 767px) {
  .container {
    flex-direction: column;
    height: 630px;
    width: 320px;
  }
}

.left {
  background: white;
  height: calc(100% - 40px);
  top: 20px;
  position: relative;
  width: 55%;
}

@media (max-width: 767px) {
  .left {
    height: 100%;
    left: 20px;
    width: calc(100% - 40px);
    max-height: 270px;
  }
}

.login {
  font-size: 50px;
  font-weight: 900;
  margin: 50px 40px 40px;
}

.eula {
  color: #999;
  font-size: 14px;
  line-height: 1.5;
  margin: 40px;
}

.right {
  background: #474a59;
  box-shadow: 0px 0px 40px 16px rgba(0, 0, 0, 0.22);
  color: #f1f1f2;
  position: relative;
  width: 50%;
}

@media (max-width: 767px) {
  .right {
    flex-shrink: 0;
    height: 100%;
    width: 100%;
    max-height: 350px;
  }
}

svg {
  position: absolute;
  width: 320px;
}

path {
  fill: none;
  stroke: url(#linearGradient);
  stroke-width: 4;
  stroke-dasharray: 240 1386;
}

.form {
  margin: 40px;
  position: absolute;
}

label {
  color: #c2c2c5;
  display: block;
  font-size: 14px;
  height: 16px;
  margin-top: 20px;
  margin-bottom: 5px;
}

input {
  background: transparent;
  border: 0;
  color: #f2f2f2;
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  outline: none !important;
  width: 100%;
}

input::-moz-focus-inner {
  border: 0;
}

.btn {
  width: 50%;
  cursor: pointer;
}

.btn-submit {
  background: orange;
  color: #fff;
  margin-top: 40px;
  transition: color 300ms;
  font-size: 20px;
}

.group-btn {
  display: flex;
  justify-content: center;
}

.email,
.password {
  border: 1px solid orange;
}

.signup-link {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}

.signup-link a {
  color: #fff;
  text-decoration: none;
  font-size: 13px;
  cursor: pointer;
}
</style>
