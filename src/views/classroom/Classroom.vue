<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="d-flex gap-3 justify-content-end">
          <div class="text-end mb-4">
            <vsud-button
              v-if="permissionChange && !isClassroomAccess"
              color="dark"
              variant="gradient"
              @click="showModalCourseCreate = true"
            >
              <i class="fas fa-plus me-2"></i>
              Tạo mới {{ nameAttacder }}
            </vsud-button>
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
import moment from "moment";
import ClassroomCreateModal from "./ClassroomCreateModal.vue";
import { mapMutations, mapActions, mapState } from "vuex";
import { STATUS_ACTIVE_CLASSROOM } from "../../utils/constants";

export default {
  name: "Classrooms",
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
      listUser: (state) => state.user.listUser,
    }),
    nameAttacder() {
      return "lớp học";
    },
    isStatusNotActive() {
      return this.classroomAccess.statusActive === 0;
    },
    isStatusNotWork() {
      return this.classroomAccess.statusActive === 2;
    },
    isClassroomAccess() {
      return this.classroomAccess && Object.keys(this.classroomAccess).length;
    },
  },
  created() {
    if (!this.classrooms.length) {
      this.getAllClassrooms();
    }

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
      getAllClassrooms: "classroom/getAllClassrooms",
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
  },
};
</script>
<style scoped></style>
