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
            Thêm thành viên
          </vsud-button>
        </div>
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Danh sách thành viên</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Tên thành viên
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Chức vụ
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Trạng thái
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Ngày tham gia
                    </th>
                    <th class="text-secondary opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="member in members" :key="member.id">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <vsud-avatar
                            :img="member.avatar_url"
                            size="sm"
                            border-radius="lg"
                            class="me-3"
                            alt="user1"
                          />
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">{{ member.fullname }}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">
                        {{ member.role ? "Đội trường" : "Thành viên" }}
                      </p>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <vsud-badge
                        :color="member.status ? 'success' : 'secondary'"
                        variant="gradient"
                        size="sm"
                        >{{ member.status ? "Online" : "Offline" }}</vsud-badge
                      >
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        member.applyDate
                      }}</span>
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
      <ModalCreateMember @close-popup="showModalMember = false" />
    </Modal>
    <!-- <div class="row">
      <div class="col-12">
        <projects-table />
      </div>
    </div> -->
  </div>
</template>

<script>
import ModalCreateMember from "./ModalCreateMember.vue";

import VsudAvatar from "@/components/VsudAvatar.vue";
import VsudBadge from "@/components/VsudBadge.vue";
import VsudButton from "@/components/VsudButton.vue";
import img1 from "../../assets/img/team-2.jpg";
import img2 from "../../assets/img/team-3.jpg";

const members = [
  {
    id: 0,
    fullname: "Phạm Thị Thanh Hiền",
    avatar_url: img1,
    role: 1,
    status: 1,
    applyDate: "15-09-2021",
  },
  {
    id: 1,
    fullname: "Bùi Văn Hà",
    avatar_url: img2,
    role: 0,
    status: 0,
    applyDate: "15-09-2021",
  },
];

export default {
  name: "TablesPage",
  components: {
    VsudAvatar,
    VsudBadge,
    VsudButton,
    ModalCreateMember,
  },
  data() {
    return {
      members,
      showModalMember: false,
    };
  },
};
</script>
