<template>
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header text-center">
            <h3>Đăng Nhập Quản Trị Viên</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="login()">
              <div class="input-group form-group">
                <input
                  type="name"
                  class="form-control"
                  placeholder="Nhập tên của Quản Trị Viên"
                  @blur="validate()"
                  v-model="admin.name"
                  :class="{ 'is-invalid': errors.name }"
                />
                <div class="invalid-feedback" v-if="errors.name">
                  {{ errors.name }}
                </div>
              </div>
              <div class="input-group form-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Nhập Mật Khẩu"
                  @blur="validate()"
                  v-model="admin.password"
                  :class="{ 'is-invalid': errors.password }"
                />
                <div class="invalid-feedback" v-if="errors.password">
                  {{ errors.password }}
                </div>
              </div>
              <div class="form-group text-center">
                <input type="submit" value="Đăng Nhập" class="btn btn-primary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AdminService from "../services/admin.service";
  
  export default {
    data() {
      return {
        errors: {
          name: "",
          password: "",
        },
        admin: {
          name: "",
          password: "",
        },
      };
    },
    methods: {
      validate() {
        let isValid = true;
        this.errors = {
          name: "",
          password: "",
        };
        if (!this.admin.name) {
          this.errors.name = "Email không được để trống";
          isValid = false;
        }
        if (!this.admin.password) {
          this.errors.password = "Mật khẩu không được để trống";
          isValid = false;
        }
        return isValid;
      },
      async login() {
        if (this.validate()) {
        console.log("Admin:",this.admin);
          const adminLogin = await AdminService.login(this.admin);
          console.log(adminLogin);
          const local_login = JSON.stringify(adminLogin);
          localStorage.setItem("admin_login", local_login);
          if (adminLogin) {
            this.$router.push({ name: "AdminPage" });
          } else {
            alert("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.");
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
  </style>