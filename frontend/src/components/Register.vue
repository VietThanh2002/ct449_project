<template>
  <div class="container">
    <div class="d-flex justify-content-center h-100">
      <div class="card">
        <div class="card-header text-center">
          <h3>Đăng Ký</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="register()">
            <div class="input-group form-group m-2">
              <input
                type="text"
                class="form-control"
                placeholder="Vui lòng nhập họ và tên"
                
                v-model="user.name"
                :class="{ 'is-invalid': errors.name }"
              />
              <div class="invalid-feedback" v-if="errors.name">
                {{ errors.name }}
              </div>
            </div>
            <!-- Trường Email -->
            <div class="input-group form-group m-2">
              <input
                type="email"
                class="form-control"
                placeholder="Vui lòng nhập Email"
                v-model="user.email"
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
                v-model="user.password"
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
                v-model="user.repassword"
                :class="{ 'is-invalid': errors.repassword }"
              />
              <div class="invalid-feedback" v-if="errors.repassword">
                {{ errors.repassword }}
              </div>
            </div>
            <!-- Trường Số điện thoại -->
            <div class="input-group form-group m-2">
              <input
                type="text"
                class="form-control"
                placeholder="Nhập số điện thoại"
                v-model="user.phone"
                :class="{ 'is-invalid': errors.phone }"
              />
              <div class="invalid-feedback" v-if="errors.phone">
                {{ errors.phone }}
              </div>
            </div>
            <!-- Trường Địa chỉ -->
            <div class="input-group form-group m-2">
              <input
                type="text"
                class="form-control"
                placeholder="Nhập địa chỉ"
                v-model="user.address"
                :class="{ 'is-invalid': errors.address }"
              />
              <div class="invalid-feedback" v-if="errors.address">
                {{ errors.address }}
              </div>
            </div>
            <!-- Nút Đăng ký -->
            <div class="form-group m-2 text-center">
              <input type="submit" value="Đăng Ký" class="btn btn-primary" />
            </div>
          </form>
        </div>
        <div class="card-footer">
          <div class="d-flex justify-content-center links">
            <p>
              Bạn đã có tài khoản!
              <router-link to="/login">Đăng Nhập</router-link>
            </p>
          </div>
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
      errors: {
        name: "",
        email: "",
        password: "",
        repassword: "",
        phone: "",
        address: "",
      },
      user: {
        name: "",
        email: "",
        password: "",
        repassword: "",
        phone: "",
        address: "",
      },
    };
  },
  methods: {
    async validate() {
      const registrationSchema = Yup.object().shape({
        name: Yup.string().required("Tên không được để trống"),
        email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
        password: Yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu ít nhất 6 ký tự'),
        repassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Mật khẩu nhập lại không khớp')
          .required('Mật khẩu nhập lại không được để trống'),
        phone: Yup.string().required('Số điện thoại không được để trống').max(10, 'Số điện thoại không được quá 10 số').min(10, 'Số điện thoại không được ít hơn 10 số'),
        address: Yup.string().required('Địa chỉ không được để trống'),
      });

      try {
        await registrationSchema.validate(this.user, { abortEarly: false });
        this.errors = {
          name: '',
          email: '',
          password: '',
          repassword: '',
          phone: '',
          address: '',
        };
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
    async register() {
      if (await this.validate()) {
        try {
          await UserService.create(this.user);
          confirm("Đăng ký tài khoản thành công!!");
          this.$router.push({ name: "LoginPage" });
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