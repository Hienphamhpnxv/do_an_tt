<template>
  <div style="min-width: 500px">
    <div class="modal-content p-3 text-black">
      <h4 class="text-center">Tạo bài kiểm tra</h4>
      <form>
        <div class="form-group">
          <label for="title">Tiêu đề bài kiểm tra</label>
          <input
            v-model="title"
            type="text"
            class="form-control"
            id="title"
            aria-describedby="title"
            placeholder="Tiêu đề bài kiểm tra"
          />
        </div>
        <div class="form-group">
          <div class="col bg-white rounded-3" style="min-height: 100px">
            <!-- Danh sach tai lieu -->
            <div class="mb-3">
              <div class="d-flex align-items-end gap-2">
                <div class="col">
                  <label for="document" class="form-label"
                    >Chọn tài liệu kiểm tra</label
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
            <div class="px-2 list-group overflow-auto" style="height: 100px">
              <div
                v-for="doc in fileExam"
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
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="description">Yêu cầu bài kiểm tra</label>
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
          <button type="button" class="btn btn-success" @click="createExam">
            {{ isEdit ? "Chỉnh sửa" : "Tạo" }} bài kiểm tra
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState, mapMutations, mapActions } from "vuex";
import { storageService } from "@/utils/StorageService.js";
import VsudInput from "@/components/VsudInput.vue";
import { TYPE_FEATURES } from "../../../utils/constants";
export default {
  components: {
    VsudInput,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    examSelected: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      title: "",
      description: "",
      file: null,
      statusExam: 0,
    };
  },
  created() {
    if (this.isEdit && this.examSelected) {
      this.title = this.examSelected.title;
      this.description = this.examSelected.description;
      this.statusExam = this.examSelected.statusExam;
      this.setFileExam(this.examSelected.examDocument);
    }
  },
  beforeUnmount() {
    this.resetFileExam();
  },
  computed: {
    ...mapState({
      teamInSchool: (state) => state.club.clubSchool,
      classroomAccess: (state) => state.classroom.classroomAccess,
      fileExam: (state) => state.document.fileExam,
    }),
  },
  methods: {
    ...mapMutations({
      setSpinLoading: "setSpinLoading",
      setIsSuccess: "setIsSuccess",
      setIsDanger: "setIsDanger",
      setFileExam: "document/setFileExam",
    }),
    ...mapActions({
      getAllExamDocumentByClassroomID:
        "document/getAllExamDocumentByClassroomID",
      createDocumentExam: "document/createDocumentExam",
      updateDocumentExam: "document/updateDocumentExam",
      resetFileExam: "document/resetFileExam",
    }),
    closeModalCreate() {
      this.$emit("closePopup");
    },
    selectFile(e) {
      this.file = e;
    },
    downloadFile(url) {
      window.open(url, "_blank");
    },
    uploadFile(file) {
      storageService.uploadFileOnFirebase(file, TYPE_FEATURES.DOCUMENT_EXAM);
    },
    async createExam() {
      this.setSpinLoading(true);
      const { title, description, statusExam } = this;
      const classroom = this.classroomAccess._id;
      const data = {
        exam: { title, classroom, description, statusExam },
        examDocument: this.fileExam,
      };

      if (this.isEdit) {
        const id = this.examSelected._id;
        await this.updateDocumentExam({ id, data });
        this.closeModalCreate();
      } else {
        await this.createDocumentExam(data);
        this.closeModalCreate();
      }
    },
  },
};
</script>

<style></style>
