<template>
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header text-center">
            <h3>Đăng Nhập</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="login()">
              <div class="input-group form-group m-2">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Vui lòng nhập Email"
                  @blur="validate()"
                  v-model="user.email"
                  :class="{ 'is-invalid': errors.email }"
                />
                <div class="invalid-feedback" v-if="errors.email">
                  {{ errors.email }}
                </div>
              </div>
              <div class="input-group form-group m-2">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Vui lòng nhập Mật khẩu"
                  @blur="validate()"
                  v-model="user.password"
                  :class="{ 'is-invalid': errors.password }"
                />
                <div class="invalid-feedback" v-if="errors.password">
                  {{ errors.password }}
                </div>
              </div>
              <div class="form-group text-center">
                <input type="submit" value="Đăng nhập" class="btn btn-primary" />
              </div>
            </form>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center links">
              <p class="text-center">
                Bạn chưa có tài khoản?
                <router-link to="/register">Đăng ký ngay</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
// import * as Yup from 'yup';
import {useRouter} from "vue-router"
const router = useRouter();
import UserService from "../services/user.service";

  export default {
    data() {
      return {
        errors: {
          email: "",
          password: "",
        },
        user: {
          email: "",
          password: "",
        },
        // users: [],
      };
    },
    methods: {
      validate() {
        let isValid = true;
        this.errors = {
          email: "",
          password: "",
        };
        if (!this.user.email) {
          this.errors.email = "Email không được để trống";
          isValid = false;
        }
        if (!this.user.password) {
          this.errors.password = "Mật khẩu không được để trống";
          isValid = false;
        }
        return isValid;
      },
      async login() {
        if (this.validate()) {
          const userLogin = await UserService.login(this.user);
          console.log(userLogin);
          const token = JSON.stringify(userLogin.token);
          localStorage.setItem("token", token);
          const id = JSON.stringify(userLogin.user_id);
          localStorage.setItem("user_id", id);
          localStorage.setItem("role", userLogin.role);
          if (userLogin.role === "user") {
            this.$router.push({ name: "HomePage" });
          } else  {
            alert("Tài khoản hoặc mật khẩu không đúng!");
          }
        }
      },
    },
    created() {},
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 100px;
  }
  .card{
    width: 300px;
  }
  .links a {
    text-decoration: none;
    margin-left: 4px;
  }
  </style>
  