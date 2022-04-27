<template>
  <div style="min-width: 500px">
    <div class="modal-content p-3 text-black">
      <form>
        <div class="form-group">
          <label for="workName">Tên công việc</label>
          <input
            v-model="workName"
            type="text"
            class="form-control"
            id="workName"
            aria-describedby="workName"
            placeholder="Tên công việc"
          />
        </div>
        <div class="form-group d-flex justify-content-between">
          <div class="col-5">
            <label for="startDate">Thời gian bắt đầu</label>
            <input
              v-model="startDate"
              type="date"
              class="form-control"
              id="startDate"
              aria-describedby="startDate"
            />
          </div>
          <div class="col-5">
            <label for="endDate">Thời gian kết thúc</label>
            <input
              v-model="endDate"
              type="date"
              class="form-control"
              id="endDate"
              aria-describedby="endDate"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="fullname">Người thực hiện</label>
          <a-select
            v-model:value="workerAssign"
            mode="multiple"
            style="width: 100%"
            placeholder="Chọn người thực hiện"
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
        <div class="form-group">
          <label for="workDescription">Mô tả công việc</label>
          <textarea
            v-model="workDescription"
            class="form-control"
            id="workDescription"
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
          <button type="button" class="btn btn-success">Tạo công việc</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VsudInput from "@/components/VsudInput.vue";
export default {
  components: {
    VsudInput,
  },
  data() {
    return {
      workName: "",
      startDate: "",
      endDate: "",
      workDescription: "",
      options: [
        { value: 1, name: "Bui Van Ha" },
        { value: 5, name: "Hien Pham" },
      ],
      workerAssign: [],
    };
  },
  methods: {
    closeModalCreate() {
      this.$emit("closePopup");
    },
  },
};
</script>

<style></style>
