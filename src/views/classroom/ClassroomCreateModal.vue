<template>
  <div style="min-width: 500px">
    <div class="modal-content p-3 text-black">
      <form>
        <div class="form-group">
          <label for="name">Tên lớp học</label>
          <input
            v-model="name"
            type="text"
            class="form-control"
            id="name"
            aria-describedby="name"
            placeholder="Tên lớp học"
          />
        </div>
        <div class="form-group">
          <label for="room">Tên phòng học</label>
          <input
            v-model="room"
            type="text"
            class="form-control"
            id="room"
            aria-describedby="room"
            placeholder="Tên phòng học"
          />
        </div>
        <div class="form-group">
          <label for="subject">Tên môn học</label>
          <input
            v-model="subject"
            type="text"
            class="form-control"
            id="subject"
            aria-describedby="subject"
            placeholder="Tên môn học"
          />
        </div>
        <div class="form-group">
          <label for="fullname">Người thực hiện</label>
          <a-select
            v-model:value="mentors"
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
          <label for="description">Mô tả lớp học</label>
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
          <button
            type="button"
            class="btn btn-success"
            @click="createClassroom"
            ref="btn-submit"
          >
            Đăng ký {{ nameAttacder }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VsudInput from "@/components/VsudInput.vue";
import shortid from "shortid";
import { ROLES, COMMON_WORK_STATUS } from "../../utils/constants";
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
      ROLES,
      COMMON_WORK_STATUS,
      name: "",
      subject: "",
      room: "",
      description: "",
      mentors: [],
    };
  },
  components: {
    VsudInput,
  },
  mounted() {
    this.getAllUserByClub();
  },
  computed: {
    ...mapState({
      isAdmin: (state) => state.user.isAdmin,
      members: function (state) {
        return state.user.listUser.filter(
          (el) => el.role[0].standOf !== ROLES["CTV"]
        );
      },
      user: (state) => state.user.user,
    }),
    nameAttacder() {
      return "lớp học";
    },
    memberOptions() {
      return this.members.map((el) => ({ ...el, value: el._id }));
    },
  },
  methods: {
    ...mapActions({
      addMember: "user/addMember",
      getAllRoles: "role/getAllRoles",
      getAllUserByClub: "user/getAllUserByClub",
    }),
    ...mapMutations({
      setSpinLoading: "setSpinLoading",
      setIsSuccess: "setIsSuccess",
      setIsDanger: "setIsDanger",
    }),
    closeModalCreate() {
      this.$emit("closePopup");
    },
    createClassroom() {
      this.$refs["btn-submit"].setAttribute("disabled", true);
      this.setSpinLoading(true);
      const vm = this;
      const code = shortid.generate();
      let { name, subject, room, description, mentors } = this;
      const data = { name, subject, room, description, mentors };

      if (name && subject && room && mentors.length && code) {
        // await this.addMember(data).then((res) => {
        vm.setSpinLoading(false);
        vm.setIsSuccess();
        this.$refs["btn-submit"].removeAttribute("disabled");
        // window.location.reload();
        // });
      } else {
        vm.setSpinLoading(false);
        vm.setIsDanger();
        this.$refs["btn-submit"].removeAttribute("disabled");
      }
    },
  },
};
</script>

<style></style>
