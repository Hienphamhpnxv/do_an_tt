<template>
  <div style="min-width: 500px">
    <div class="modal-content p-3 text-black">
      <form>
        <div class="form-group">
          <label for="fullname">Tên câu lạc bộ</label>
          <input
            v-model="member.fullname"
            type="text"
            class="form-control"
            id="fullname"
            aria-describedby="fullname"
            placeholder="Tên câu lạc bộ"
          />
        </div>
        <div class="form-group">
          <label for="fullname">Tên viêt tắt</label>
          <input
            v-model="member.fullname"
            type="text"
            class="form-control"
            id="fullname"
            aria-describedby="fullname"
            placeholder="Tên viêt tắt"
          />
        </div>
        <div class="form-group">
          <label for="birthday">Ngày thành lập</label>
          <input
            v-model="member.birthday"
            type="date"
            class="form-control"
            id="birthday"
            aria-describedby="birthday"
          />
        </div>
        <div class="form-group">
          <label for="fullname">Người thành lập</label>
          <a-select
            v-model:value="workerAssign"
            mode="single"
            style="width: 100%"
            placeholder="Chọn người thành lập câu lạc bộ"
            option-label-prop="name"
            :options="options"
          >
            <template #option="{ name }">
              <span>
                {{ name }}
              </span>
            </template>
          </a-select>
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
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VsudInput from "@/components/VsudInput.vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      member: {
        fullname: "",
        studentCode: "",
        classname: "",
        birthday: "",
        address: "",
        phoneNumber: "",
        email: "",
      },
      options: [
        { value: 1, name: "Bui Van Ha" },
        { value: 5, name: "Hien Pham" },
      ],
      workerAssign: [],
    };
  },
  components: {
    VsudInput,
  },
  methods: {
    ...mapActions({
      addMember: "user/addMember",
    }),
    closeModalCreate() {
      this.$emit("closePopup");
    },
    async createMember() {
      const data = { basicInfo: {}, memberInfo: {} };
      // await this.addMember(data);
    },
  },
};
</script>

<style></style>
