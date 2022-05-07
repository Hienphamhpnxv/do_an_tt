<template>
  <div class="card h-100">
    <div class="p-3 pb-0 card-header">
      <div class="row">
        <div class="col-md-8 d-flex align-items-center">
          <h6 class="mb-0">Thông tin cá nhân</h6>
        </div>
        <div class="col-md-4 text-end">
          <a href="javascript:;" @click="showModal = true">
            <i
              class="text-sm fas fa-user-edit text-secondary"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Edit Profile"
            ></i>
          </a>
        </div>
      </div>
    </div>
    <div class="p-3 card-body">
      <p class="text-sm">
        {{ user.description }}
      </p>
      <hr class="my-4 horizontal gray-light" />
      <div class="d-flex gap-2">
        <ul class="list-group">
          <li class="pt-0 text-sm border-0 list-group-item ps-0">
            <strong class="text-dark">Họ và tên:</strong> &nbsp; {{ user.name }}
          </li>
          <li class="text-sm border-0 list-group-item ps-0">
            <strong class="text-dark">Số điện thoại:</strong> &nbsp;
            {{ user.phone }}
          </li>
          <li class="text-sm border-0 list-group-item ps-0">
            <strong class="text-dark">Email:</strong> &nbsp; {{ user.email }}
          </li>
          <li class="text-sm border-0 list-group-item ps-0">
            <strong class="text-dark">Địa chỉ:</strong> &nbsp;
            {{ user.address }}
          </li>
        </ul>
        <ul class="list-group">
          <li class="pt-0 text-sm border-0 list-group-item ps-0">
            <strong class="text-dark">Mã sinh viên:</strong> &nbsp;
            {{ user?.memberInfo.studentCode }}
          </li>
          <li class="text-sm border-0 list-group-item ps-0">
            <strong class="text-dark">Ngày sinh:</strong> &nbsp;
            {{ formatDate(user.birthday) }}
          </li>
          <li class="text-sm border-0 list-group-item ps-0">
            <strong class="text-dark">Giới tính:</strong> &nbsp;
            {{ parseInt(user.gender) === 0 ? "Nam" : "Nữ" }}
          </li>
          <li class="text-sm border-0 list-group-item ps-0">
            <strong class="text-dark">Lớp:</strong> &nbsp;
            {{ user?.memberInfo.classname }}
          </li>
        </ul>
        <ul class="list-group">
          <li class="pt-0 text-sm border-0 list-group-item ps-0">
            <strong class="text-dark">Câu lạc bộ hoạt động:</strong> &nbsp;
            {{ user?.club.name }}
          </li>
          <li class="text-sm border-0 list-group-item ps-0">
            <strong class="text-dark">Khóa:</strong> &nbsp; K{{
              user?.memberInfo.grade
            }}
          </li>
        </ul>
      </div>
    </div>
    <Modal :value="showModal" body-class="wrap-preview rounded-3">
      <MemberInfoForm @close-popup="showModal = false" />
    </Modal>
  </div>
</template>

<script>
import moment from "moment";
import MemberInfoForm from "./MemberInfoForm.vue";
import { mapState } from "vuex";

export default {
  name: "ProfileCard",
  components: { MemberInfoForm },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  methods: {
    formatDate(date) {
      return moment(date).format("l");
    },
  },
};
</script>
