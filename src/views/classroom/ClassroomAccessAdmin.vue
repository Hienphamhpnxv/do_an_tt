<template>
  <div>
    <div class="d-flex gap-3 align-items-start">
      <div class="col-9">
        <h5>Tổng quan lớp học</h5>
      </div>
      <div class="col"><h5>Tải liệu xét duyệt</h5></div>
    </div>
    <div class="d-flex gap-3 align-items-start">
      <div
        class="col-9 bg-white p-4 rounded-3 overflow-auto"
        style="height: calc(100vh - 240px)"
      >
        <div class="class-info border-2 border-bottom">
          <p>
            <span class="fw-bold">Tên lớp học: </span
            ><span>{{ classroomAccess.name || "" }}</span>
          </p>
          <p>
            <span class="fw-bold">Môn học: </span
            ><span>{{ classroomAccess.subject || "" }}</span>
          </p>
          <p>
            <span class="fw-bold">Phòng học: </span
            ><span>{{ classroomAccess.room || "" }}</span>
          </p>
          <p v-for="mentor in classroomAccess.mentors" :key="mentor._id">
            <span class="fw-bold">Người giảng dạy: </span
            ><span>{{ mentor.name || "" }}</span> -
            <span>{{ mentor.phone }}</span>
          </p>
        </div>
        <div class="list-group overflow-auto">
          <div
            v-for="exam in exams"
            :key="exam._id"
            class="d-flex align-items-center gap-3 flex-column"
          >
            <button
              type="button"
              class="list-group-item list-group-item-action border-0 rounded-3"
              @click="seeExam(exam)"
            >
              {{ exam.title }}
            </button>
            <!-- <i
                class="fas fa-trash cursor-pointer"
                data-bs-toggle="modal"
                data-bs-target="#deleteDocument"
                @click="fileDelete = doc"
              ></i> -->
          </div>
        </div>
      </div>
      <div class="col d-flex flex-column gap-3">
        <!-- Danh sach tai lieu -->
        <div
          class="bg-white p-4 list-group rounded-3 overflow-auto"
          style="min-height: 350px"
        >
          <div v-if="!documents.length"><h4>Chưa có tài liệu</h4></div>
          <template v-else>
            <div
              v-for="doc in documents"
              :key="doc._id"
              class="d-flex align-items-center"
            >
              <button
                type="button"
                class="list-group-item list-group-item-action border-0 rounded-3 me-3"
                @click="downloadFile(doc.url)"
              >
                {{ doc.title }}
              </button>
              <i
                class="fas fa-trash cursor-pointer"
                data-bs-toggle="modal"
                data-bs-target="#deleteDocument"
                @click="fileDelete = doc"
              ></i>
            </div>
          </template>
        </div>
        <h5 class="m-0 mt-3">Cập nhật trạng thái lớp học</h5>
        <div class="bg-white p-4 list-group rounded-3">
          <button class="btn btn-success" @click="handleActive">
            Cho phép hoạt động
          </button>
          <button class="btn btn-danger" @click="handleStopWork">
            Ngừng hoạt động
          </button>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="deleteDocument"
      tabindex="-1"
      aria-labelledby="deleteDocumentModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteDocumentModal">Xác thực</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">Bạn có đồng ý xóa bỏ tài liệu ?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              ref="button-close"
            >
              hủy bỏ
            </button>
            <button type="button" class="btn btn-danger" @click="confirmDelete">
              Đồng ý
            </button>
          </div>
        </div>
      </div>
    </div>
    <Modal :value="showModalSeeExam" body-class="wrap-preview rounded-3">
      <ExamSeeAdmin
        @close-popup="showModalSeeExam = false"
        :examSelected="examSelected"
      />
    </Modal>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Spinner from "@/components/Spinner.vue";
import { STATUS_ACTIVE_CLASSROOM } from "../../utils/constants";
import ExamSeeAdmin from "./Exam/ExamSeeAdmin.vue";

export default {
  name: "ClassroomAccess",
  components: { Spinner, ExamSeeAdmin },
  data() {
    return {
      file: null,
      fileDelete: null,
      showModalSeeExam: false,
      examSelected: null,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      classroomAccess: (state) => state.classroom.classroomAccess,
      documents: (state) => state.document.documents,
      exams: (state) => state.document.exams,
    }),
    isStatusNotActive() {
      return this.classroomAccess.statusActive === 0;
    },
    isStatusActive() {
      return this.classroomAccess.statusActive === 1;
    },
    isStatusNotWorking() {
      return this.classroomAccess.statusActive === 2;
    },
  },
  beforeUnmount() {
    this.setClassroomAccess(null);
    this.setDocuments([]);
    localStorage.removeItem("classroom");
  },
  async created() {
    if (this.classroomAccess) {
      this.getAllDocumentByClassroomID({
        classroomId: this.classroomAccess._id,
      });

      this.getAllExamDocumentByClassroomID({
        classroomId: this.classroomAccess._id,
      });
    }
  },
  methods: {
    ...mapMutations({
      setClassroomAccess: "classroom/setClassroomAccess",
      setDocuments: "document/setDocuments",
    }),
    ...mapActions({
      getAllDocumentByClassroomID: "document/getAllDocumentByClassroomID",
      getAllExamDocumentByClassroomID:
        "document/getAllExamDocumentByClassroomID",
      deleteDocumentById: "document/deleteDocumentById",
      updateStatusClassroom: "classroom/updateStatusClassroom",
    }),
    seeExam(exam) {
      this.examSelected = exam;
      this.showModalSeeExam = true;
    },
    selectFile(e) {
      this.file = e;
    },
    downloadFile(url) {
      window.open(url, "_blank");
    },
    async confirmDelete() {
      await this.deleteDocumentById({ id: this.fileDelete._id });
      this.$refs["button-close"].click();
    },
    handleActive() {
      this.updateStatusClassroom({ status: STATUS_ACTIVE_CLASSROOM.ACTIVE });
    },
    handleStopWork() {
      this.updateStatusClassroom({
        status: STATUS_ACTIVE_CLASSROOM.STOP_ACTIVE,
      });
    },
  },
};
</script>
