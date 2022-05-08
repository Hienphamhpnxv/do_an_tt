<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="text-end mb-4">
          <vsud-button
            color="dark"
            variant="gradient"
            @click="showModalAddClub = true"
          >
            <i class="fas fa-plus me-2"></i>
            Thêm câu lạc bộ
          </vsud-button>
        </div>
        <div class="card mb-4">
          <div class="p-3 card-body">
            <ul class="list-group">
              <li
                v-for="club in dataList"
                :key="club.id"
                class="px-0 mb-2 border-0 list-group-item d-flex align-items-center"
              >
                <!-- <vsud-avatar
                  class="me-3"
                  :img="club.logo"
                  alt="kal"
                  border-radius="lg"
                  shadow="regular"
                /> -->
                <div
                  class="d-flex align-items-start flex-column justify-content-center"
                >
                  <h6 class="mb-0 text-sm">{{ club.name }}</h6>
                  <p class="mb-0 text-xs">{{ club.standOfName }}</p>
                </div>
                <a
                  class="mb-0 btn btn-link pe-3 ps-0 ms-auto"
                  href="javascript:;"
                  @click="$emit('SelectClub', club)"
                  >Chọn</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Modal :value="showModalAddClub" body-class="wrap-preview rounded-3">
      <ModalCreateClub @close-popup="showModalAddClub = false" />
    </Modal>
  </div>
</template>

<script>
import ModalCreateClub from "./ModalCreateClub.vue";

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
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    VsudAvatar,
    VsudBadge,
    VsudButton,
    ModalCreateClub,
  },
  data() {
    return {
      members,
      showModalAddClub: false,
    };
  },
};
</script>
