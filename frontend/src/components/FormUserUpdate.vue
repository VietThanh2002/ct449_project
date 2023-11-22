<template>
  <div class="container">
    <div class="d-flex justify-content-center h-100">
      <div class="card">
        <div class="card-header text-center">
          <h3>Cập Nhật Hồ Sơ</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="updateProfile()">
            <!-- Trường Tên -->
            <div class="input-group form-group m-2">
              <input
                type="text"
                class="form-control"
                placeholder="Vui lòng nhập họ và tên"
                v-model="updatedUser.name"
                :class="{ 'is-invalid': errors.name }"
              />
              <div class="invalid-feedback" v-if="errors.name">
                {{ errors.name }}
              </div>
            </div>
            <!-- Trường Địa chỉ -->
            <div class="input-group form-group m-2">
              <input
                type="text"
                class="form-control"
                placeholder="Nhập địa chỉ"
                v-model="updatedUser.address"
                :class="{ 'is-invalid': errors.address }"
              />
              <div class="invalid-feedback" v-if="errors.address">
                {{ errors.address }}
              </div>
            </div>
            <!-- Trường Số điện thoại -->
            <div class="input-group form-group m-2">
              <input
                type="text"
                class="form-control"
                placeholder="Nhập số điện thoại"
                v-model="updatedUser.phone"
                :class="{ 'is-invalid': errors.phone }"
              />
              <div class="invalid-feedback" v-if="errors.phone">
                {{ errors.phone }}
              </div>
            </div>
            <!-- Trường Email -->
            <div class="input-group form-group m-2">
              <input
                type="email"
                class="form-control"
                placeholder="Vui lòng nhập Email"
                v-model="updatedUser.email"
                :class="{ 'is-invalid': errors.email }"
              />
              <div class="invalid-feedback" v-if="errors.email">
                {{ errors.email }}
              </div>
            </div>
            <!-- Trường Mật khẩu -->
            <div class="input-group form-group m-2">
              <input
                type="password"
                class="form-control"
                placeholder="Vui lòng nhập Mật khẩu"
                v-model="updatedUser.password"
                :class="{ 'is-invalid': errors.password }"
              />
              <div class="invalid-feedback" v-if="errors.password">
                {{ errors.password }}
              </div>
            </div>
            <!-- Trường Nhập lại mật khẩu -->
            <div class="input-group form-group m-2">
              <input
                type="password"
                class="form-control"
                placeholder="Nhập lại mật khẩu"
                v-model="updatedUser.repassword"
                :class="{ 'is-invalid': errors.repassword }"
              />
              <div class="invalid-feedback" v-if="errors.repassword">
                {{ errors.repassword }}
              </div>
            </div>
            <!-- Nút Cập nhật hồ sơ -->
            <div class="form-group m-2 text-center">
              <input type="submit" value="Cập Nhật Hồ Sơ" class="btn btn-primary" />
            </div>
          </form>
        </div>
        <div class="card-footer">
          <!-- Thông báo cập nhật thành công -->
          <p v-if="message" class="text-success text-center">{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Yup from 'yup';
import UserService from "../services/user.service";

export default {
  data() {
    return {
      updatedUser: {
        name: "",
        address: "",
        phone: "",
        email: "",
        password: "",
        repassword: "",
      },
      message: "",
      errors: {},
    };
  },
  methods: {
    async validate() {
      const profileSchema = Yup.object().shape({
        name: Yup.string().required("Tên không được để trống"),
        address: Yup.string().required("Địa chỉ không được để trống"),
        phone: Yup.string()
          .required("Số điện thoại không được để trống")
          .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ'),
        email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
        password: Yup.string().required('Mật khẩu không được để trống'),
        repassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Mật khẩu nhập lại không khớp')
          .required('Mật khẩu nhập lại không được để trống'),
      });

      try {
        await profileSchema.validate(this.updatedUser, { abortEarly: false });
        this.errors = {};
        return true;
      } catch (error) {
        const validationErrors = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        this.errors = { ...validationErrors };
        return false;
      }
    },
    async updateProfile() {
      if (await this.validate()) {
        try {
          const user_id = JSON.parse(localStorage.getItem('user_id'));
          await UserService.update(user_id, this.updatedUser);
          this.message = "Hồ sơ được cập nhật thành công.";
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 100px;
}
.card {
  width: 300px;
}
.links a {
  text-decoration: none;
  margin-left: 4px;
}
</style>
