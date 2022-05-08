<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="text-end mb-4">
          <vsud-button
            v-if="permissionChange"
            color="dark"
            variant="gradient"
            @click="showModalMember = true"
          >
            <i class="fas fa-plus me-2"></i>
            Tạo hoạt động
          </vsud-button>
        </div>
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Danh sách hoạt động</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Tên hoạt động
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Người thực hiện
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Thời gian bắt đầu
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Thời gian kết thúc
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Trạng thái
                    </th>
                    <th class="text-secondary opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="work in works" :key="work.id">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <!-- <div>
                          <vsud-avatar
                            :img="member.avatar_url"
                            size="sm"
                            border-radius="lg"
                            class="me-3"
                            alt="user1"
                          />
                        </div> -->
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">{{ work.name }}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">
                        {{ getPersonWork(work.userInfo) }}
                      </p>
                    </td>
                    <td class="align-middle">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        formatDate(work.timeStart)
                      }}</span>
                    </td>
                    <td class="align-middle">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        formatDate(work.timeEnd)
                      }}</span>
                    </td>
                    <td class="align-middle text-sm">
                      <vsud-badge
                        :color="getColorStatus(work.status)"
                        variant="gradient"
                        size="sm"
                        >{{ getNameStatus(work.status) }}</vsud-badge
                      >
                    </td>
                    <td class="align-middle" v-if="permissionChange">
                      <a
                        href="javascript:;"
                        class="text-primary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit work"
                        @click="handleEdit(work)"
                        >Chỉnh sửa</a
                      >
                    </td>
                    <td class="align-middle" v-if="permissionChange">
                      <a
                        href="javascript:;"
                        class="text-danger font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Delete work"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        @click="handleDelete(work)"
                        >Xóa</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
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
            <div class="modal-body">Bạn có đồng ý xóa công việc này?</div>
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
    <Modal :value="showModalMember" body-class="wrap-preview rounded-3">
      <ModalCreateWork
        @close-popup="closePopup"
        :isEdit="isEdit"
        :work="workEdit"
      />
    </Modal>
  </div>
</template>

<script>
import ModalCreateWork from "./ModalCreateWork.vue";
import { COMMON_WORK_STATUS } from "../../utils/constants";
import { mapMutations, mapState, mapActions } from "vuex";
import moment from "moment";

import VsudAvatar from "@/components/VsudAvatar.vue";
import VsudBadge from "@/components/VsudBadge.vue";
import VsudButton from "@/components/VsudButton.vue";

export default {
  name: "TablesPage",
  components: {
    VsudAvatar,
    VsudBadge,
    VsudButton,
    ModalCreateWork,
  },
  data() {
    return {
      COMMON_WORK_STATUS,
      showModalMember: false,
      isEdit: false,
      workEdit: null,
      workDelete: null,
    };
  },
  computed: {
    ...mapState({
      works: (state) => state.work.works,
      permissionChange: (state) => state.user.permissionChange,
    }),
  },
  mounted() {
    if (!this.works.length) {
      this.setSpinLoading(true);
      this.getAllWorks();
      this.setSpinLoading(false);
    }
  },
  methods: {
    ...mapMutations({
      setSpinLoading: "setSpinLoading",
    }),
    ...mapActions({
      getAllWorks: "work/getAllWorks",
      deleteWorkById: "work/deleteWorkById",
    }),
    closePopup() {
      this.showModalMember = false;
      this.isEdit = false;
    },
    getColorStatus(status) {
      return this.COMMON_WORK_STATUS[status].color;
    },
    getNameStatus(status) {
      return this.COMMON_WORK_STATUS[status].name;
    },
    formatDate(date) {
      return moment(date).format("l");
    },
    getPersonWork(users) {
      const names = users.reduce((result, user) => {
        result.push(user.name);
        return result;
      }, []);

      return names.join(", ");
    },
    handleEdit(work) {
      this.isEdit = true;
      this.showModalMember = true;
      this.workEdit = work;
    },
    async confirmDelete() {
      const vm = this;
      await this.deleteWorkById({ id: this.workDelete._id })
        .then((res) => {
          if (res) {
            vm.$refs["button-close"].click();
            vm.workDelete = null;
          }
        })
        .catch((err) => {
          vm.$refs["button-close"].click();
        });
    },
    handleDelete(work) {
      this.workDelete = work;
    },
  },
};
</script>
