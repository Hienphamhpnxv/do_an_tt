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
    }),
    memberOptions() {
      return this.members.map((el) => ({ ...el, value: el._id }));
    },
  },
  created() {
    console.log(this.isEdit);
    if (this.isEdit && this.work) {
      this.name = this.work.name;
      this.timeStart = moment(this.work.timeStart).format("YYYY-MM-DD");
      this.timeEnd = moment(this.work.timeEnd).format("YYYY-MM-DD");
      this.description = this.work.description;
      this.memberWorks = this.work.memberWorks;
    }
  },
  mounted() {
    this.getAllUserByClub();
  },
  methods: {
    ...mapMutations({
      setSpinLoading: "setSpinLoading",
    }),
    ...mapActions({
      getAllUserByClub: "user/getAllUserByClub",
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
      const data = {
        name,
        timeStart,
        timeEnd,
        memberWorks,
        status,
        description,
      };
      if (this.isEdit) {
        const id = this.work._id;
        await this.updateUserById({ id, data });
        vm.setSpinLoading(false);
        this.closeModalCreate();
      } else {
        await this.addWork(data).then((res) => {
          vm.setSpinLoading(false);
          window.location.reload();
        });
      }
    },
  },
};
</script>

<style></style>
