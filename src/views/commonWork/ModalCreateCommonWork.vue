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
          <label for="fullname">Câu lạc phụ trách </label>
          <br />
          <button type="button" class="btn btn-success" @click="addClubAssign">
            <i class="fas fa-plus-circle me-2" style="color: white"></i>Thêm
          </button>
          <div ref="clubs">
            <div
              v-for="(club, index) in clubAssign"
              :key="club"
              class="mt-3 d-flex w-100 justify-content-between align-items-center gap-2"
              :ref="`'content-'${club}`"
            >
              <div class="col-4">
                <a-select
                  v-model:value="clubAssign[index].clubId"
                  mode="signle"
                  style="width: 100%"
                  placeholder="Chọn câu lạc phụ trách"
                  option-label-prop="standOfName"
                  :options="clubOptions"
                >
                  <template #option="{ standOfName }">
                    <span>
                      {{ standOfName }}
                    </span>
                  </template>
                </a-select>
              </div>
              <div class="col">
                <input
                  v-model="clubAssign[index].content"
                  type="text"
                  class="form-control"
                  :id="`'content'${club}`"
                  aria-describedby="content"
                />
              </div>
              <div>
                <i
                  class="fas fa-minus-circle ms-2 w-5 cursor-pointer"
                  style="color: red"
                  @click="removeContent(index)"
                ></i>
              </div>
            </div>
          </div>
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
import moment from "moment";
import { COMMON_WORK_STATUS } from "../../utils/constants";
import { mapState, mapMutations, mapActions } from "vuex";
import VsudInput from "@/components/VsudInput.vue";
export default {
  components: {
    VsudInput,
  },
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
  data() {
    return {
      COMMON_WORK_STATUS,
      name: "",
      timeStart: "",
      timeEnd: "",
      description: "",
      workerAssign: [],
      clubAssign: [],
      status: 0,
    };
  },
  created() {
    if (this.isEdit && this.work) {
      this.name = this.work.name;
      this.timeStart = moment(this.work.timeStart).format("YYYY-MM-DD");
      this.timeEnd = moment(this.work.timeEnd).format("YYYY-MM-DD");
      this.description = this.work.description;
      this.clubAssign = this.work.clubWorks;
      this.status = this.work.status;
    }
  },
  computed: {
    ...mapState({
      teamInSchool: (state) => state.club.clubSchool,
    }),
    clubOptions() {
      return this.teamInSchool.map((el) => ({ ...el, value: el._id }));
    },
  },
  methods: {
    ...mapMutations({
      setSpinLoading: "setSpinLoading",
      setIsSuccess: "setIsSuccess",
      setIsDanger: "setIsDanger",
    }),
    ...mapActions({
      addWork: "workCommon/createWork",
      updateUserById: "workCommon/updateUserById",
    }),
    closeModalCreate() {
      this.$emit("closePopup");
    },
    addClubAssign() {
      const obj = { clubId: "", content: "" };
      this.clubAssign.push(obj);
    },
    removeContent(index) {
      this.clubAssign.splice(index, 1);
    },
    async createWork() {
      this.setSpinLoading(true);
      const vm = this;
      const { name, timeStart, timeEnd, description, status } = this;
      const clubWorks = this.clubAssign;
      const data = {
        name,
        clubWorks,
        timeStart,
        timeEnd,
        description,
        status,
      };

      if (this.isEdit) {
        const id = this.work._id;
        await this.updateUserById({ id, data });
        this.setSpinLoading(false);
        this.closeModalCreate();
        this.setIsSuccess();
        // window.location.reload();
      } else {
        await this.addWork(data);
        this.setSpinLoading(false);
        this.setIsDanger();
      }
    },
  },
};
</script>

<style></style>
