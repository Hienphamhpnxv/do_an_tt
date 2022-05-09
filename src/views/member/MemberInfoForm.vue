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
        <div class="form-group d-flex justify-content-between">
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="closeModalCreate"
          >
            Hủy bỏ
          </button>
          <button type="button" class="btn btn-success" @click="createMember">
            Cập nhật thông tin
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VsudInput from "@/components/VsudInput.vue";
import { mapMutations, mapActions, mapState } from "vuex";
import moment from "moment";

export default {
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
  created() {
    const { name, birthday, address, phone, email, gender } = this.user;
    const { studentCode, classname, grade } = this.user.memberInfo;
    this.name = name;
    this.studentCode = studentCode;
    this.classname = classname;
    this.birthday = moment(birthday).format("YYYY-MM-DD");
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.gender = gender;
    this.grade = grade;
  },
  computed: {
    ...mapState({
      roles: (state) => state.role.roles,
      user: (state) => state.user.user,
    }),
  },
  methods: {
    ...mapActions({
      updateUserById: "user/updateUserById",
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
      const id = this.user._id;
      const {
        name,
        studentCode,
        classname,
        birthday,
        address,
        phone,
        email,
        gender,
        grade,
      } = this;

      const data = {
        basicInfo: {
          name,
          email,
          address,
          birthday,
          phone,
          gender,
        },
        memberInfo: {
          studentCode,
          classname,
          grade,
        },
      };
      await this.updateUserById({ id, data })
        .then((res) => {
          vm.setSpinLoading(false);
          vm.closeModalCreate();
          vm.setIsSuccess();
        })
        .catch(() => {
          vm.setSpinLoading(false);
          vm.setIsDanger();
        });
    },
  },
};
</script>

<style></style>
