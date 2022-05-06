<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="text-end mb-4">
          <vsud-button
            color="dark"
            variant="gradient"
            @click="showModalMember = true"
          >
            <i class="fas fa-plus me-2"></i>
            Tạo công việc
          </vsud-button>
        </div>
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Danh sách công việc chung khoa CNTT</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Tên công việc
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Câu lạc bộ thực hiện
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
                          <h6 class="mb-0 text-sm">{{ work.workName }}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">
                        {{ work.workers.name }}
                      </p>
                    </td>
                    <td class="align-middle">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        work.startDate
                      }}</span>
                    </td>
                    <td class="align-middle">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        work.endDate
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
                    <td class="align-middle">
                      <a
                        href="javascript:;"
                        class="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                        >Edit</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal :value="showModalMember" body-class="wrap-preview rounded-3">
      <ModalCreateCommonWork @close-popup="showModalMember = false" />
    </Modal>
  </div>
</template>

<script>
import ModalCreateCommonWork from "./ModalCreateCommonWork.vue";
import { COMMON_WORK_STATUS } from "../../utils/constants";

import VsudAvatar from "@/components/VsudAvatar.vue";
import VsudBadge from "@/components/VsudBadge.vue";
import VsudButton from "@/components/VsudButton.vue";
import img1 from "../../assets/img/team-2.jpg";
import img2 from "../../assets/img/team-3.jpg";

const works = [
  {
    id: 0,
    workName: "Công việc 1",
    workers: {
      name: "IT SUPPORTER",
      avatar_url: img1,
    },
    startDate: "15-09-2021",
    endDate: "20-09-2021",
    status: 1,
  },
  {
    id: 1,
    workName: "Công việc 1",
    workers: {
      name: "FIT MEDIA",
      avatar_url: img2,
    },
    startDate: "15-09-2021",
    endDate: "20-09-2021",
    status: 0,
  },
  {
    id: 2,
    workName: "Công việc 1",
    workers: {
      name: "I-STAR",
      avatar_url: img2,
    },
    startDate: "15-09-2021",
    endDate: "20-09-2021",
    status: 2,
  },
];

export default {
  name: "TablesPage",
  components: {
    VsudAvatar,
    VsudBadge,
    VsudButton,
    ModalCreateCommonWork,
  },
  data() {
    return {
      COMMON_WORK_STATUS,
      works,
      showModalMember: false,
    };
  },
  methods: {
    getColorStatus(status) {
      return this.COMMON_WORK_STATUS[status].color;
    },
    getNameStatus(status) {
      return this.COMMON_WORK_STATUS[status].name;
    },
  },
};
</script>
