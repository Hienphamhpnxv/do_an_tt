<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="text-end mb-4 d-flex justify-content-end">
          <!-- <vsud-button
            color="dark"
            variant="gradient"
            v-if="permissionChange || (!permissionChange && isAdmin)"
            @click="showModalCourseCreate = true"
          >
            <i class="fas fa-plus me-2"></i>
            Thêm {{ nameAttacder }}
          </vsud-button> -->
          <div class="col-5 d-flex justify-content-between">
            <button class="btn btn-primary" @click="filter = null">
              Toàn bộ
            </button>
            <button class="btn btn-warning" @click="filter = 0">
              Chờ xác nhận
            </button>
            <button class="btn btn-success" @click="filter = 1">
              Đang hoạt động
            </button>
            <button class="btn btn-secondary" @click="filter = 2">
              Ngừng hoạt động
            </button>
          </div>
        </div>
        <div class="mb-4">
          <h3>Danh sách {{ nameAttacder }}</h3>
        </div>
        <div v-if="!classrooms.length">
          <h4>Lớp học sẽ được tạo trong thời gian tới!</h4>
        </div>
        <div
          v-else
          class="d-flex flex-wrap gap-3 align-items-start overflow-auto pb-4 pt-2"
          style="height: calc(100vh - 240px)"
        >
          <div
            class=""
            style="width: calc(100% / 4 - 20px)"
            v-for="classroom in classroomsFilter"
            :key="classroom._id"
          >
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ classroom.name }}</h5>
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
import { mapActions, mapState } from "vuex";
import { STATUS_ACTIVE_CLASSROOM } from "../../utils/constants";

export default {
  name: "Course",
  components: { ClassroomCreateModal },
  data() {
    return {
      STATUS_ACTIVE_CLASSROOM,
      showModalCourseCreate: false,
      filter: null,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      permissionChange: (state) => state.user.permissionChange,
      isAdmin: (state) => state.user.isAdmin,
      classrooms: (state) => state.classroom.classrooms,
    }),
    nameAttacder() {
      return "lớp học";
    },
    classroomsFilter() {
      if (this.filter === null) {
        return this.classrooms;
      } else {
        return this.classrooms.filter((el) => el.statusActive === this.filter);
      }
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
