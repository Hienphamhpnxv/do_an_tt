<template>
  <div style="min-width: 500px">
    <div class="modal-content p-3 text-black">
      <form>
        <div class="form-group">
          <label for="name">Họ và tên</label>
          <input
            v-model="name"
            type="text"
            class="form-control"
            id="name"
            aria-describedby="name"
            placeholder="Họ và tên"
          />
        </div>
        <div class="form-group">
          <label for="name">Mật khẩu</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="password"
            aria-describedby="password"
            placeholder="Mật khẩu"
          />
        </div>
        <div class="form-group d-flex align-items-center gap-3">
          <div class="col-6">
            <label for="birthday">Ngày sinh</label>
            <input
              v-model="birthday"
              type="date"
              class="form-control"
              id="birthday"
              aria-describedby="birthday"
            />
          </div>
          <div class="col-6">
            <label for="address">Giới tính</label><br />
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="0"
                v-model="gender"
              />
              <label class="form-check-label" for="male">Nam</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                id="female"
                v-model="gender"
                value="1"
              />
              <label class="form-check-label" for="female">Nữ</label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="phone">Số điện thoại</label>
          <input
            v-model="phone"
            type="text"
            class="form-control"
            id="phone"
            aria-describedby="phone"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="email"
            aria-describedby="email"
          />
        </div>
        <div class="form-group">
          <label for="address">Quê quán</label>
          <input
            v-model="address"
            type="text"
            class="form-control"
            id="address"
            aria-describedby="address"
          />
        </div>
        <div class="form-group d-flex justify-content-between">
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="closeModalCreate"
          >
            Hủy bỏ
          </button>
          <button type="button" class="btn btn-success" @click="createMember">
            Đăng ký giảng viên
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VsudInput from "@/components/VsudInput.vue";
import { mapMutations, mapActions, mapState } from "vuex";

export default {
  props: {
    isMemberColab: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: "",
      password: "",
      birthday: "",
      address: "",
      phone: "",
      email: "",
      gender: "",
    };
  },
  components: {
    VsudInput,
  },
  computed: {
    ...mapState({
      isAdmin: (state) => state.user.isAdmin,
    }),
  },
  methods: {
    ...mapActions({
      signup: "auth/signup",
    }),
    ...mapMutations({
      setSpinLoading: "setSpinLoading",
      setIsSuccess: "setIsSuccess",
      setIsDanger: "setIsDanger",
    }),
    closeModalCreate() {
      this.$emit("closePopup");
    },
    async createMember() {
      const vm = this;
      let { name, password, birthday, address, phone, email, gender } = this;
      const data = {
        basicInfo: {
          name,
          password,
          birthday,
          address,
          phone,
          email,
          gender,
          role: "GV",
        },
      };

      if (name && password && email && this.isAdmin) {
        await this.signup(data);
      } else {
        vm.setIsDanger();
      }
    },
  },
};
</script>

<style></style>
