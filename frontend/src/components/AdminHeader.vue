<template>
    <div class="admin-header">
      <!-- <router-link to="/">Trang Chủ</router-link> -->
      <div v-if="isLoggedIn">
        <span>Xin chào, Admin {{ adminName }}!</span>
        <button @click="logout">Đăng Xuất</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        localStorage.removeItem("admin_login");
        this.$router.push({ name: "LoginPage" });
      },
    },
    computed: {
      isLoggedIn() {
        const adminLogin = localStorage.getItem("admin_login");
        return adminLogin ? true : false;
      },
      adminName() {
        const adminLogin = localStorage.getItem("admin_login");
        if (adminLogin) {
          const adminData = JSON.parse(adminLogin);
          return adminData.name; // Thay "name" bằng trường tên của admin trong dữ liệu đăng nhập
        }
        return "";
      },
    },
  };
  </script>
  
  <style scoped>
  .admin-header {
    background-color: #007bff;
    color: #fff;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  </style>