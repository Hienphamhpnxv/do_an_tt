<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="text-end mb-4">
          <!-- <vsud-button
            color="dark"
            variant="gradient"
            v-if="permissionChange || (!permissionChange && isAdmin)"
            @click="showModalCourseCreate = true"
          >
            <i class="fas fa-plus me-2"></i>
            Thêm {{ nameAttacder }}
          </vsud-button> -->
          <vsud-button
            color="dark"
            variant="gradient"
            @click="showModalCourseCreate = true"
          >
            <i class="fas fa-plus me-2"></i>
            Tạo mới {{ nameAttacder }}
          </vsud-button>
        </div>
        <div class="mb-4">
          <h3>Danh sách {{ nameAttacder }}</h3>
        </div>
        <div
          class="d-flex flex-wrap gap-3 align-items-start overflow-auto pb-4 pt-2"
          style="height: calc(100vh - 240px)"
        >
          <div class="" style="width: calc(100% / 3 - 20px)" v-for="i in 10">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" class="btn btn-primary">Truy cập hóa học</a>
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
import moment from "moment";
import ClassroomCreateModal from "./ClassroomCreateModal.vue";

export default {
  name: "Course",
  components: { ClassroomCreateModal },
  data() {
    return {
      showModalCourseCreate: false,
    };
  },
  computed: {
    // ...mapState({
    //   user: (state) => state.user.user,
    //   permissionChange: (state) => state.user.permissionChange,
    //   isAdmin: (state) => state.user.isAdmin,
    //   members: function (state) {
    //     const { isMemberColab, ROLES, permissionChange, isAdmin } = this;
    //     let data = [...state.user.listUser];
    //     data = data.filter((el) => el._id !== this.user._id);

    //     if (isMemberColab) {
    //       return data.filter((el) => el.role[0].standOf === ROLES["CTV"]);
    //     } else if (!permissionChange && isAdmin) {
    //       return data.filter(
    //         (el) =>
    //           el.role[0].standOf === ROLES["CN"] ||
    //           el.role[0].standOf === ROLES["PCN"]
    //       );
    //     } else {
    //       return data.filter((el) => el.role[0].standOf !== ROLES["CTV"]);
    //     }
    //   },
    // }),
    nameAttacder() {
      return "lớp học";
    },
  },

  methods: {},
};
</script>
<style scoped></style>
