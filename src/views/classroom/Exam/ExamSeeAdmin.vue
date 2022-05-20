<template>
  <div style="min-width: 500px">
    <div class="modal-content p-3 text-black">
      <h4 class="text-center">Thông tin bài kiểm tra</h4>
      <form>
        <div class="form-group">
          <label for="title" class="fs-6"
            >Tiêu đề bài kiểm tra:
            <span class="fs-5 fw-bold">{{ examSelected.title }}</span></label
          >
        </div>
        <div class="form-group">
          <div class="col bg-white rounded-3">
            <!-- Danh sach tai lieu -->
            <label for="" class="fs-6"
              >Danh sách tài liệu bài kiểm tra:
              <span v-show="!examSelected.examDocument.length" class="fw-bold"
                >(Không có)</span
              ></label
            >
            <div
              v-if="examSelected.examDocument.length"
              class="px-2 list-group overflow-auto"
              style="height: 150px"
            >
              <div
                v-for="doc in examSelected.examDocument"
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
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="description">Yêu cầu bài kiểm tra</label>
          <textarea
            :value="examSelected.description"
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
            Thoát
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
    return {};
  },
  beforeUnmount() {
    this.resetFileExam();
  },
  computed: {
    ...mapState({
      classroomAccess: (state) => state.classroom.classroomAccess,
      fileExam: (state) => state.document.fileExam,
    }),
  },
  methods: {
    ...mapMutations({
      setFileExam: "document/setFileExam",
    }),
    ...mapActions({
      getAllExamDocumentByClassroomID:
        "document/getAllExamDocumentByClassroomID",
      resetFileExam: "document/resetFileExam",
    }),
    closeModalCreate() {
      this.$emit("closePopup");
    },
    downloadFile(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style></style>
