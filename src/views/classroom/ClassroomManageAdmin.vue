<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div
          class="text-end mb-4 d-flex justify-content-end"
          v-if="!classroomAccess"
        >
          <div class="col-5 d-flex justify-content-between">
            <button class="btn btn-primary" @click="setFilterClassroom(null)">
              Toàn bộ
            </button>
            <button class="btn btn-warning" @click="setFilterClassroom(0)">
              Chờ xác nhận
            </button>
            <button class="btn btn-success" @click="setFilterClassroom(1)">
              Đang hoạt động
            </button>
            <button class="btn btn-secondary" @click="setFilterClassroom(2)">
              Ngừng hoạt động
            </button>
          </div>
        </div>
        <div style="height: calc(100vh - 240px)">
          <router-view></router-view>
        </div>
      </div>
      <div
        class="modal fade"
        id="deleteModal"
        tabindex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">Xác thực</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Bạn có đồng ý xóa
              {{ nameAttacder }}
              <!-- <span class="text-danger">{{
                memberDelete && memberDelete.name
              }}</span> -->
              ?
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                ref="button-close"
              >
                hủy bỏ
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="confirmDelete"
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal :value="showModalCourseCreate" body-class="wrap-preview rounded-3">
      <ClassroomCreateModal @close-popup="showModalCourseCreate = false" />
    </Modal>
  </div>
</template>

<script>
import ClassroomCreateModal from "./ClassroomCreateModal.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { STATUS_ACTIVE_CLASSROOM } from "../../utils/constants";

export default {
  name: "Classroom",
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
      classrooms: (state) => state.classroom.classrooms,
      classroomAccess: (state) => state.classroom.classroomAccess,
    }),
    nameAttacder() {
      return "lớp học";
    },
  },
  created() {
    if (!this.classrooms.length) {
      this.getAllClassrooms();
    } else {
      console.log(123);
    }
  },
  methods: {
    ...mapMutations({
      setFilterClassroom: "classroom/setFilterClassroom",
    }),
    ...mapActions({
      getAllClassrooms: "classroom/getAllClassrooms",
    }),
    nameBtn(classroom) {
      switch (classroom.statusActive) {
        case STATUS_ACTIVE_CLASSROOM.PENDING:
          return "Xác nhận";
        default:
          return "Chuyển trạng thái";
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
  },
};
</script>
<style scoped></style>
