<template>
  <div style="min-width: 500px">
    <div class="modal-content p-3 text-black">
      <h5 class="text-center">Thay đổi mật khẩu</h5>
      <form>
        <div class="form-group">
          <label for="name">Mật khẩu cũ</label>
          <input
            v-model="oldPassword"
            type="password"
            class="form-control"
            id="oldPassword"
            aria-describedby="oldPassword"
            placeholder="Mật khẩu cũ"
          />
        </div>
        <div class="form-group">
          <label for="name">Mật khẩu mới</label>
          <input
            v-model="newPassword"
            type="password"
            class="form-control"
            id="newPassword"
            aria-describedby="newPassword"
            placeholder="Mật khẩu mới"
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
            Thay đổi mật khẩu
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
  data() {
    return {
      oldPassword: "",
      newPassword: "",
    };
  },
  components: {
    VsudInput,
  },
  computed: {
    ...mapState({
      roles: (state) => state.role.roles,
      user: (state) => state.user.user,
    }),
  },
  beforeUnmount() {
    this.oldPassword = "";
    this.newPassword = "";
  },
  methods: {
    ...mapActions({
      updatePasswordUserById: "user/updatePasswordUserById",
      logout: "auth/logout",
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
      this.setSpinLoading(true);
      const vm = this;
      const id = this.user._id;
      const { oldPassword, newPassword } = this;

      const data = {
        oldPassword,
        newPassword,
      };
      if (oldPassword && newPassword) {
        await this.updatePasswordUserById({ id, data })
          .then((res) => {
            vm.setSpinLoading(false);
            vm.closeModalCreate();
            vm.setIsSuccess();
            vm.logout();
            window.location.reload();
          })
          .catch(() => {
            vm.setSpinLoading(false);
            vm.setIsDanger();
          });
      } else {
        vm.setSpinLoading(false);
        vm.setIsDanger();
      }
    },
  },
};
</script>

<style></style>
