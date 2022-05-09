<template>
  <div style="min-width: 500px">
    <div class="modal-content p-3 text-black">
      <form>
        <div class="form-group">
          <label for="clubname">Tên câu lạc bộ</label>
          <input
            v-model="clubname"
            type="text"
            class="form-control"
            id="clubname"
            aria-describedby="clubname"
            placeholder="Tên câu lạc bộ"
          />
        </div>
        <div class="form-group">
          <label for="standOfName">Tên viêt tắt</label>
          <input
            v-model="standOfName"
            type="text"
            class="form-control"
            id="standOfName"
            aria-describedby="standOfName"
            placeholder="Tên viêt tắt"
          />
        </div>
        <div class="form-group">
          <label for="foundedTime">Ngày thành lập</label>
          <input
            v-model="foundedTime"
            type="date"
            class="form-control"
            id="foundedTime"
            aria-describedby="foundedTime"
          />
        </div>
        <div class="form-group">
          <label for="description">Mô tả công việc</label>
          <textarea
            v-model="description"
            class="form-control"
            id="description"
            rows="3"
          ></textarea>
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
import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      clubname: "",
      standOfName: "",
      foundedTime: "",
      founder: [],
      logo: "",
      options: [
        { value: 1, name: "Bui Van Ha" },
        { value: 5, name: "Hien Pham" },
      ],
    };
  },
  components: {
    VsudInput,
  },
  methods: {
    ...mapActions({
      createClub: "club/createClub",
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
      const { clubname, standOfName, foundedTime, description } = this;
      const data = {
        name: clubname,
        standOfName,
        foundedTime,
        description,
      };

      await this.createClub(data)
        .then((res) => {
          // thong bao thanh cong
          const idSetTimeout = setTimeout(() => {
            this.closeModalCreate();
            this.setSpinLoading(false);
            this.setIsSuccess();
            clearTimeout(idSetTimeout);
          }, 500);
        })
        .catch((err) => {
          const idSetTimeout = setTimeout(() => {
            this.setSpinLoading(false);
            this.setIsDanger();
            clearTimeout(idSetTimeout);
          }, 500);
        });
    },
  },
};
</script>

<style></style>
