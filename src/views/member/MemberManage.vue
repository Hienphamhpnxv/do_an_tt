<template>
  <div class="py-4 container-fluid">
    <div
      :class="[
        'alert alert-success alert-style text-white',
        isNotifi ? 'show-noti' : '',
      ]"
      role="alert"
      ref="notication"
    >
      A simple success alert—check it out!
    </div>
    <div class="row">
      <div class="col-12">
        <div class="text-end mb-4">
          <vsud-button
            color="dark"
            variant="gradient"
            v-if="permissionChange || (!permissionChange && isAdmin)"
            @click="showModalMember = true"
          >
            <i class="fas fa-plus me-2"></i>
            Thêm {{ nameAttacder }}
          </vsud-button>
        </div>
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Danh sách {{ nameAttacder }}</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Tên {{ nameAttacder }}
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Chức vụ
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Email
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Số điện thoại
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Giới tính
                    </th>
                    <!-- <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Trạng thái
                    </th> -->
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Quê quán
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Khóa
                    </th>
                    <th
                      class="text-secondary opacity-7"
                      v-if="permissionChange || (!permissionChange && isAdmin)"
                    ></th>
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
                          <h6 class="mb-0 text-sm">{{ member.name }}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">
                        {{ member.role[0].name }}
                      </p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">
                        {{ member.email }}
                      </p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">
                        {{ member.phone }}
                      </p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">
                        {{ parseInt(member.gender) === 0 ? "Nam" : "Nữ" }}
                      </p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">
                        {{ member.address }}
                      </p>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold"
                        >K{{ member.memberInfo[0].grade }}
                      </span>
                    </td>
                    <td
                      class="align-middle"
                      v-if="permissionChange || (!permissionChange && isAdmin)"
                    >
                      <a
                        href="javascript:;"
                        class="text-danger font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        @click="deleteUser(member)"
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
            <div class="modal-body">
              Bạn có đồng ý xóa
              {{ nameAttacder }}
              <span class="text-danger">{{
                memberDelete && memberDelete.name
              }}</span>
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
    <Modal :value="showModalMember" body-class="wrap-preview rounded-3">
      <ModalCreateMember
        @close-popup="showModalMember = false"
        :isMemberColab="isMemberColab"
      />
    </Modal>
  </div>
</template>

<script>
import moment from "moment";
import { ROLES, ROLES_EXPAND } from "../../utils/constants";
import { mapMutations, mapActions, mapState } from "vuex";
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
      ROLES,
      ROLES_EXPAND,
      showModalMember: false,
      memberDelete: null,
      isNotifi: false,
      isMemberColab: false,
    };
  },
  computed: {
    ...mapState({
      members: function (state) {
        const { isMemberColab, ROLES, permissionChange, isAdmin } = this;
        if (isMemberColab) {
          return state.user.listUser.filter(
            (el) => el.role[0].standOf === ROLES["CTV"]
          );
        } else if (!permissionChange && isAdmin) {
          return state.user.listUser.filter(
            (el) =>
              el.role[0].standOf === ROLES["CN"] ||
              el.role[0].standOf === ROLES["PCN"]
          );
        } else {
          return state.user.listUser.filter(
            (el) => el.role[0].standOf !== ROLES["CTV"]
          );
        }
      },
      permissionChange: (state) => state.user.permissionChange,
      isAdmin: (state) => state.user.isAdmin,
    }),
    nameAttacder() {
      return this.isMemberColab
        ? "cộng tác viên"
        : this.isAdmin
        ? "quản lý CLB"
        : "thành viên";
    },
  },
  created() {
    this.isMemberColab = this.$route.meta.memberColab ? true : false;
  },
  mounted() {
    if (this.isAdmin) {
      this.getAllUser();
    } else {
      this.getAllUserByClub();
    }
  },
  methods: {
    ...mapActions({
      getAllUserByClub: "user/getAllUserByClub",
      getAllUser: "user/getAllUser",
      deleteUserById: "user/deleteUserById",
    }),
    formatDate(date) {
      if (!date) {
        return moment().format("l");
      }
      return moment(date).format("l");
    },
    deleteUser(member) {
      this.memberDelete = member;
    },
    async confirmDelete() {
      const vm = this;
      await this.deleteUserById({ id: this.memberDelete._id })
        .then((res) => {
          if (res) {
            vm.$refs["button-close"].click();
          }
        })
        .catch((err) => {
          vm.$refs["button-close"].click();
        });
    },
    getNameRole(role) {
      return this.ROLES_EXPAND[role];
    },
  },
};
</script>
<style scoped>
.alert-style {
  position: absolute;
  top: -100%;
}

.show-noti {
  animation: notifi 3s alternate;
}

@keyframes notifi {
  0% {
    opacity: 1;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  100% {
    opacity: 0;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
