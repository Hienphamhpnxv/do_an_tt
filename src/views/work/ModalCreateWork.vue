<template>
  <div style="min-width: 500px">
    <div class="modal-content p-3 text-black">
      <form>
        <div class="form-group">
          <label for="name">Tên công việc</label>
          <input
            v-model="name"
            type="text"
            class="form-control"
            id="name"
            aria-describedby="name"
            placeholder="Tên công việc"
          />
        </div>
        <div class="form-group">
          <label for="name">Trạng thái hoạt động</label>
          <div class="dropdown">
            <select v-model="status">
              <option
                v-for="(option, index) in COMMON_WORK_STATUS"
                :key="index"
                :value="option.value"
              >
                {{ option.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group d-flex justify-content-between">
          <div class="col-5">
            <label for="timeStart">Thời gian bắt đầu</label>
            <input
              v-model="timeStart"
              type="date"
              class="form-control"
              id="timeStart"
              aria-describedby="timeStart"
            />
          </div>
          <div class="col-5">
            <label for="timeEnd">Thời gian kết thúc</label>
            <input
              v-model="timeEnd"
              type="date"
              class="form-control"
              id="timeEnd"
              aria-describedby="timeEnd"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="fullname">Người thực hiện</label>
          <a-select
            v-model:value="memberWorks"
            mode="multiple"
            style="width: 100%"
            placeholder="Chọn người thực hiện"
            option-label-prop="name"
            :options="memberOptions"
          >
            <template #option="{ name }">
              <span>
                {{ name }}
              </span>
            </template>
          </a-select>
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
          <button type="button" class="btn btn-success" @click="createWork">
            {{ isEdit ? "Chỉnh sửa" : "Tạo" }} công việc
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VsudInput from "@/components/VsudInput.vue";
import moment from "moment";
import { ROLES, COMMON_WORK_STATUS } from "../../utils/constants";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    work: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    VsudInput,
  },
  data() {
    return {
      ROLES,
      COMMON_WORK_STATUS,
      name: "",
      timeStart: "",
      timeEnd: "",
      description: "",
      status: 0,
      memberWorks: [],
    };
  },
  computed: {
    ...mapState({
      members: function (state) {
        return state.user.listUser.filter(
          (el) => el.role[0].standOf !== ROLES["CTV"]
        );
      },
      user: (state) => state.user.user,
    }),
    memberOptions() {
      return this.members.map((el) => ({ ...el, value: el._id }));
    },
  },
  created() {
    if (this.isEdit && this.work) {
      this.name = this.work.name;
      this.timeStart = moment(this.work.timeStart).format("YYYY-MM-DD");
      this.timeEnd = moment(this.work.timeEnd).format("YYYY-MM-DD");
      this.description = this.work.description;
      this.memberWorks = this.work.memberWorks;
      this.status = this.work.status;
    }
  },
  methods: {
    ...mapMutations({
      setSpinLoading: "setSpinLoading",
      setIsSuccess: "setIsSuccess",
      setIsDanger: "setIsDanger",
    }),
    ...mapActions({
      addWork: "work/createWork",
      updateUserById: "work/updateUserById",
    }),
    closeModalCreate() {
      this.$emit("closePopup");
    },
    async createWork() {
      this.setSpinLoading(true);
      const vm = this;
      const { name, timeStart, timeEnd, memberWorks, description, status } =
        this;
      const club = this.user.club._id;
      const data = {
        name,
        timeStart,
        timeEnd,
        memberWorks,
        status,
        description,
        club,
      };
      if (this.isEdit) {
        const id = this.work._id;
        await this.updateUserById({ id, data })
          .then(() => {
            vm.setSpinLoading(false);
            vm.closeModalCreate();
            vm.setIsSuccess();
          })
          .catch(() => {
            vm.setIsDanger();
          });
      } else {
        await this.addWork(data)
          .then((res) => {
            vm.setSpinLoading(false);
            vm.closeModalCreate();
            window.location.reload();
          })
          .catch(() => {
            vm.setIsDanger();
          });
      }
    },
  },
};
</script>

<style></style>
