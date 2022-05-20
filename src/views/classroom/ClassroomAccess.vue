<template>
  <div>
    <div class="text-end mb-4">
      <vsud-button
        v-if="isClassroomAccess"
        color="light"
        variant="gradient"
        :disabled="isStatusNotActive || isStatusNotWorking"
        @click="showModalCreateExam = true"
      >
        <i class="fas fa-plus me-2"></i>
        Tạo bài kiểm tra
      </vsud-button>
    </div>
    <div class="d-flex gap-3 align-items-start">
      <div class="col-9">
        <h5>Tổng quan lớp học</h5>
      </div>
      <div class="col"><h5>Tài liệu lớp học</h5></div>
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
        <div class="mt-3">
          <template v-if="isStatusNotActive">
            <div
              class="d-flex justify-content-center flex-column align-items-center"
            >
              <i
                class="fas fa-cloud-upload-alt cursor-pointer"
                style="font-size: 200px"
                @click="chooseFileAccessClass"
              ></i>
              <h4>Lớp học đang trong quá trình xử lý</h4>
              <h4>Vui lòng tải dữ liệu để phục vụ trong quá trình duyệt lớp</h4>
              <p>(Chuyên đề, kế hoạch, giáo trình,...)</p>
              <div class="col-4 mt-auto">
                <button
                  type="button"
                  class="btn btn-light p-2 w-100 m-0"
                  :disabled="!file"
                  @click="uploadFile(file)"
                >
                  Tải lên
                </button>
              </div>
            </div>
          </template>
          <template v-else-if="isStatusNotWorking">
            <h4>Lớp học hiện tại đang ngừng hoạt động...</h4>
          </template>
          <template v-else-if="isModifyPremison">
            <div class="d-flex flex-column gap-3">
              <article
                v-for="exam in exams"
                :key="exam._id"
                class="border rounded-2 p-2 d-flex align-items-center justify-content-between"
              >
                <h4 class="m-0">{{ exam.title }}</h4>
                <div>
                  <i
                    class="fas fa-edit cursor-pointer me-4"
                    @click="editExam(exam)"
                  ></i>
                  <i
                    v-if="isModifyPremison"
                    class="fas fa-trash cursor-pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteExam"
                    @click="examSelected = exam"
                  ></i>
                </div>
              </article>
            </div>
          </template>
        </div>
      </div>
      <div class="col bg-white p-4 rounded-3" style="min-height: 350px">
        <!-- Danh sach tai lieu -->
        <template v-if="isStatusNotActive && !isStatusActive"
          ><div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </template>
        <template v-if="!isStatusNotWorking">
          <div
            v-show="!isStatusNotActive || isStatusActive"
            class="px-2 list-group overflow-auto"
            style="height: 230px"
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
                  v-if="isModifyPremison"
                  class="fas fa-trash cursor-pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteDocument"
                  @click="fileDelete = doc"
                ></i>
              </div>
            </template>
          </div>
          <div v-show="!isStatusNotActive">
            <div class="d-flex align-items-end gap-2">
              <div class="col">
                <label for="document" class="form-label"
                  >Chọn tài liệu cần upload</label
                >
                <input
                  class="form-control"
                  id="document"
                  type="file"
                  @change="selectFile"
                  ref="input-file"
                />
              </div>
              <div class="col-4 mt-auto">
                <button
                  type="button"
                  class="btn btn-success p-2 w-100 m-0"
                  :disabled="!file"
                  @click="uploadFile(file)"
                >
                  Tải lên
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- Delete document -->
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

    <!-- Delete exam -->
    <div
      class="modal fade"
      id="deleteExam"
      tabindex="-1"
      aria-labelledby="deleteExamModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteExamModal">Xác thực</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Bạn có đồng ý xóa {{ examSelected?.title }} ?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="closePopup"
              ref="button-close"
            >
              hủy bỏ
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="confirmDeleteExam"
            >
              Đồng ý
            </button>
          </div>
        </div>
      </div>
    </div>
    <Modal :value="showModalCreateExam" body-class="wrap-preview rounded-3">
      <ExamCreate
        @close-popup="showModalCreateExam = false"
        :isEdit="isEdit"
        :examSelected="examSelected"
      />
    </Modal>
  </div>
</template>
<script>
import { ROLES, STATUS_ACTIVE_CLASSROOM } from "../../utils/constants";
import { mapState, mapMutations, mapActions } from "vuex";
import { storageService } from "@/utils/StorageService.js";
import Spinner from "@/components/Spinner.vue";
import ExamCreate from "./Exam/ExamCreate.vue";

export default {
  name: "ClassroomAccess",
  components: { Spinner, ExamCreate },
  data() {
    return {
      showModalCreateExam: false,
      file: null,
      fileDelete: null,
      examSelected: null,
      isEdit: false,
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
    isModifyPremison() {
      return (
        this.user.roles.standOf === ROLES.CN ||
        this.user.roles.standOf === ROLES.PCN
      );
    },
    isClassroomAccess() {
      return this.classroomAccess && Object.keys(this.classroomAccess).length;
    },
  },
  beforeUnmount() {
    this.setClassroomAccess(null);
    this.resetState();
    localStorage.removeItem("classroom");
  },
  async created() {
    if (
      this.classroomAccess &&
      this.classroomAccess.statusActive === STATUS_ACTIVE_CLASSROOM.ACTIVE
    ) {
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
      resetState: "document/resetState",
      getAllDocumentByClassroomID: "document/getAllDocumentByClassroomID",
      getAllExamDocumentByClassroomID:
        "document/getAllExamDocumentByClassroomID",
      deleteDocumentById: "document/deleteDocumentById",
      deleteExamDocumentById: "document/deleteExamDocumentById",
    }),
    selectFile(e) {
      this.file = e;
    },
    editExam(exam) {
      this.showModalCreateExam = true;
      this.examSelected = exam;
      this.isEdit = true;
    },
    closePopup() {
      this.showModalCreateExam = false;
      this.isEdit = false;
      this.$refs["button-close"].click();
    },
    uploadFile(file) {
      storageService.uploadFileOnFirebase(file);
    },
    downloadFile(url) {
      window.open(url, "_blank");
    },
    async confirmDelete() {
      await this.deleteDocumentById({ id: this.fileDelete._id });
      this.closePopup();
    },
    async confirmDeleteExam() {
      await this.deleteExamDocumentById({ id: this.examSelected._id });
      this.closePopup();
    },
    chooseFileAccessClass() {
      this.$refs["input-file"].click();
    },
  },
};
</script>
