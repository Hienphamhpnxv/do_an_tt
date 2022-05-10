<template>
  <div style="min-width: 500px">
    <div class="modal-content p-3 text-black">
      <form>
        <div class="form-group d-flex justify-content-between">
          <div class="col-5">
            <label for="name">Họ và tên</label>
            <input
              v-model="name"
              type="text"
              class="form-control"
              id="name"
              aria-describedby="name"
              placeholder="Họ và tên"
            />
          </div>
          <div class="col-5">
            <label for="studentCode">Mã sinh viên</label>
            <input
              v-model="studentCode"
              type="text"
              class="form-control"
              id="studentCode"
              aria-describedby="studentCode"
              placeholder="Mã sinh viên"
            />
          </div>
        </div>
        <div class="form-group d-flex justify-content-between">
          <div class="col-5">
            <label for="className">Lớp</label>
            <input
              v-model="classname"
              type="text"
              class="form-control"
              id="className"
              aria-describedby="className"
              placeholder="CNTT 1"
            />
          </div>
          <div class="col-5">
            <label for="grade">Khóa</label>
            <select id="grade" class="form-control" v-model="grade">
              <option selected>Chọn khóa</option>

              <option
                v-for="option in gradeOptions"
                :key="option.value"
                :value="option.value"
              >
                Khóa {{ option.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="birthday">Ngày sinh</label>
          <input
            v-model="birthday"
            type="date"
            class="form-control"
            id="birthday"
            aria-describedby="birthday"
          />
        </div>
        <div class="form-group">
          <label for="address">Giới tính</label><br />
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="0"
              v-model="gender"
            />
            <label class="form-check-label" for="male">Nam</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              id="female"
              v-model="gender"
              value="1"
            />
            <label class="form-check-label" for="female">Nữ</label>
          </div>
        </div>
        <div class="form-group">
          <label for="address">Quê quán</label>
          <input
            v-model="address"
            type="text"
            class="form-control"
            id="address"
            aria-describedby="address"
          />
        </div>
        <div class="form-group">
          <label for="phone">Số điện thoại</label>
          <input
            v-model="phone"
            type="text"
            class="form-control"
            id="phone"
            aria-describedby="phone"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="email"
            aria-describedby="email"
          />
        </div>
        <div class="form-group d-flex align-items-start">
          <div class="col" v-if="!isMemberColab">
            <label>Chức vụ</label><br />
            <div class="d-flex align-items-center">
              <div
                class="form-check form-check-inline"
                v-for="role in roles"
                :key="role._id"
              >
                <input
                  class="form-check-input"
                  type="radio"
                  name="role"
                  :id="role.standOf"
                  :value="role.standOf"
                  v-model="roleRegisters"
                />
                <label class="form-check-label" :for="role.standOf">{{
                  role.name
                }}</label>
              </div>
            </div>
          </div>
          <div class="col-6" v-if="isAdmin">
            <label>Câu lạc bộ phụ trách</label><br />
            <div class="dropdown">
              <select v-model="club">
                <option value="" disabled selected>
                  Vui lòng chọn câu lạc bộ
                </option>
                <option
                  v-for="(team, index) in clubSchool"
                  :key="index"
                  :value="team._id"
                >
                  {{ team.standOfName }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-group d-flex justify-content-between">
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="closeModalCreate"
          >
            Hủy bỏ
          </button>
          <button type="button" class="btn btn-success" @click="createMember">
            Đăng ký {{ nameAttacder }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VsudInput from "@/components/VsudInput.vue";
import { mapMutations, mapActions, mapState } from "vuex";

export default {
  props: {
    isMemberColab: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: "",
      studentCode: "",
      classname: "",
      birthday: "",
      address: "",
      phone: "",
      email: "",
      gender: "",
      club: "",
      grade: [],
      roleRegisters: "",
      gradeOptions: [
        {
          name: "K13",
          value: 13,
        },
        {
          name: "K14",
          value: 14,
        },
        {
          name: "K15",
          value: 15,
        },
        {
          name: "K16",
          value: 16,
        },
        {
          name: "K17",
          value: 17,
        },
      ],
    };
  },
  components: {
    VsudInput,
  },
  mounted() {
    this.getAllRoles();
  },
  computed: {
    ...mapState({
      clubSchool: (state) => state.club.clubSchool,
      isAdmin: (state) => state.user.isAdmin,
      roles: function (state) {
        const { isAdmin } = this;
        if (isAdmin) {
          return state.role.roles.filter((el) => el.standOf === "CN");
        } else {
          return state.role.roles.filter(
            (el) => el.standOf === "PCN" || el.standOf === "TV"
          );
        }
      },
    }),
    nameAttacder() {
      return this.isMemberColab
        ? "cộng tác viên"
        : this.isAdmin
        ? "quản lý CLB"
        : "thành viên";
    },
  },
  methods: {
    ...mapActions({
      addMember: "user/addMember",
      getAllRoles: "role/getAllRoles",
    }),
    ...mapMutations({
      setSpinLoading: "setSpinLoading",
      setIsSuccess: "setIsSuccess",
      setIsDanger: "setIsDanger",
    }),
    closeModalCreate() {
      this.$emit("closePopup");
    },
    async createMember() {
      this.setSpinLoading(true);
      const vm = this;
      let {
        name,
        studentCode,
        classname,
        birthday,
        address,
        phone,
        email,
        gender,
        grade,
        roleRegisters,
      } = this;

      if (this.isMemberColab && !roleRegisters) {
        roleRegisters = "CTV";
      }

      let club = this.club;
      if (!this.isAdmin) {
        club = JSON.parse(localStorage.getItem("user")).club._id;
      }

      const data = {
        basicInfo: {
          name,
          email,
          address,
          birthday,
          phone,
          gender,
          role: roleRegisters,
        },
        memberInfo: {
          studentCode,
          classname,
          grade,
          club,
        },
      };

      if (name && studentCode && roleRegisters && classname && email) {
        await this.addMember(data).then((res) => {
          vm.setSpinLoading(false);
          vm.setIsSuccess();
          window.location.reload();
        });
      } else {
        vm.setSpinLoading(false);
        vm.setIsDanger();
      }
    },
  },
};
</script>

<style></style>
