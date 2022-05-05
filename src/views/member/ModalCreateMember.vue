<template>
  <div style="min-width: 500px">
    <div class="modal-content p-3 text-black">
      <form>
        <div class="form-group d-flex justify-content-between">
          <div class="col-5">
            <label for="fullname">Họ và tên</label>
            <input
              v-model="member.fullname"
              type="text"
              class="form-control"
              id="fullname"
              aria-describedby="fullname"
              placeholder="Họ và tên"
            />
          </div>
          <div class="col-5">
            <label for="studentCode">Mã sinh viên</label>
            <input
              v-model="member.studentCode"
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
              v-model="member.classname"
              type="text"
              class="form-control"
              id="className"
              aria-describedby="className"
              placeholder="CNTT 1"
            />
          </div>
          <div class="col-5">
            <label for="grade">Khóa</label>
            <select id="grade" class="form-control">
              <option selected>Chọn khóa</option>
              <option value="K13">Khóa 13</option>
              <option value="K14">Khóa 14</option>
              <option value="K15">Khóa 15</option>
              <option value="K16">Khóa 16</option>
              <option value="K17">Khóa 17</option>
              <option value="K18">Khóa 18</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="birthday">Ngày sinh</label>
          <input
            v-model="member.birthday"
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
              name="inlineRadioOptions"
              id="male"
              value="0"
            />
            <label class="form-check-label" for="male">Nam</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="female"
              value="1"
            />
            <label class="form-check-label" for="female">Nữ</label>
          </div>
        </div>
        <div class="form-group">
          <label for="address">Quê quán</label>
          <input
            v-model="member.address"
            type="text"
            class="form-control"
            id="address"
            aria-describedby="address"
          />
        </div>
        <div class="form-group">
          <label for="phoneNumber">Số điện thoại</label>
          <input
            v-model="member.phoneNumber"
            type="text"
            class="form-control"
            id="phoneNumber"
            aria-describedby="phoneNumber"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="member.email"
            type="email"
            class="form-control"
            id="email"
            aria-describedby="email"
          />
        </div>
        <div class="form-group">
          <label>Ban hoạt động</label><br />
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="banTruyenThong"
              value="0"
            />
            <label class="form-check-label" for="banTruyenThong"
              >Ban Truyền Thông</label
            >
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="banKT_HT"
              value="1"
            />
            <label class="form-check-label" for="banKT_HT"
              >Bân kỹ thuật - học tập</label
            >
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="banSuKien"
              value="2"
            />
            <label class="form-check-label" for="banSuKien">Ban sự kiện</label>
          </div>
        </div>
        <div class="form-group">
          <label>Chức vụ</label><br />
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="boss"
              value="0"
            />
            <label class="form-check-label" for="boss">Chủ nhiệm</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="subBoss"
              value="1"
            />
            <label class="form-check-label" for="subBoss">Phó chủ nhiệm</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="leader"
              value="2"
            />
            <label class="form-check-label" for="leader">Trưởng ban</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="member"
              value="3"
            />
            <label class="form-check-label" for="member">Thành viên</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="subMember"
              value="4"
            />
            <label class="form-check-label" for="subMember"
              >Cộng tác viên</label
            >
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
            Đăng ký thành viên
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VsudInput from "@/components/VsudInput.vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      member: {
        fullname: "",
        studentCode: "",
        classname: "",
        birthday: "",
        address: "",
        phoneNumber: "",
        email: "",
      },
    };
  },
  components: {
    VsudInput,
  },
  methods: {
    ...mapActions({
      addMember: "user/addMember",
    }),
    closeModalCreate() {
      this.$emit("closePopup");
    },
    async createMember() {
      const data = { basicInfo: {}, memberInfo: {} };
      await this.addMember(data);
    },
  },
};
</script>

<style></style>
