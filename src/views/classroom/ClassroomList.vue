<template>
  <div class="h-100">
    <div class="mb-4">
      <h3>Danh sách {{ nameAttacder }}</h3>
    </div>
    <template v-if="!classrooms.length">
      <h4>Lớp học sẽ được tạo trong thời gian tới!</h4>
    </template>
    <div
      v-else
      class="d-flex flex-wrap gap-3 align-items-start overflow-auto pb-4 pt-2 h-100"
    >
      <div
        class=""
        style="width: calc(100% / 4 - 20px)"
        v-for="classroom in classrooms"
        :key="classroom._id"
      >
        <div class="card">
          <div class="card-body">
            <h5
              class="card-title cursor-pointer"
              @click="accessClass(classroom)"
            >
              {{ classroom.name }}
            </h5>
            <p class="card-text">
              {{ classroom.subject }} - {{ classroom.room }}
            </p>
            <a href="javascript:;" :class="['btn', colorBtn(classroom)]">{{
              nameBtn(classroom)
            }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassroomCreateModal from "./ClassroomCreateModal.vue";
import { mapMutations, mapActions, mapState } from "vuex";
import { ROLES, STATUS_ACTIVE_CLASSROOM } from "../../utils/constants";

export default {
  name: "ClassroomList",
  components: { ClassroomCreateModal },
  data() {
    return {
      STATUS_ACTIVE_CLASSROOM,
      showModalCourseCreate: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      permissionChange: (state) => state.user.permissionChange,
      isAdmin: (state) => state.user.isAdmin,
      classrooms: function (state) {
        if (
          this.user.roles.standOf === ROLES.CN ||
          this.user.roles.standOf === ROLES.PCN
        ) {
          return state.classroom.classrooms;
        } else {
          return state.classroom.classrooms.filter(
            (el) => el.statusActive === STATUS_ACTIVE_CLASSROOM.ACTIVE
          );
        }
      },
      listUser: (state) => state.user.listUser,
    }),
    nameAttacder() {
      return "lớp học";
    },
  },
  created() {
    if (!this.listUser.length) {
      if (this.isAdmin) {
        this.getAllUser();
      } else {
        this.getAllUserByClub();
      }
    }
  },
  methods: {
    ...mapMutations({
      setClassroomAccess: "classroom/setClassroomAccess",
    }),
    ...mapActions({
      getAllUserByClub: "user/getAllUserByClub",
      getAllUser: "user/getAllUser",
    }),
    nameBtn(classroom) {
      switch (classroom.statusActive) {
        case STATUS_ACTIVE_CLASSROOM.PENDING:
          return "Đang chờ xác nhận";
        case STATUS_ACTIVE_CLASSROOM.ACTIVE:
          return "Truy cập lớp học";
        case STATUS_ACTIVE_CLASSROOM.STOP_ACTIVE:
          return "Ngừng hoạt động";
      }
    },
    colorBtn(classroom) {
      switch (classroom.statusActive) {
        case STATUS_ACTIVE_CLASSROOM.PENDING:
          return "btn-warning";
        case STATUS_ACTIVE_CLASSROOM.ACTIVE:
          return "btn-success";
        case STATUS_ACTIVE_CLASSROOM.STOP_ACTIVE:
          return "btn-secondary";
      }
    },
    accessClass(classInfo) {
      this.setClassroomAccess(classInfo);
      this.$router.push({
        name: "ClassroomAccess",
        params: { id: classInfo._id },
      });
    },
  },
};
</script>
<style scoped></style>
