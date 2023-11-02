<template>
    <div class="admin-header">
      <router-link to="/">Trang Chủ</router-link>
      <div v-if="isLoggedIn">
        <span>Xin chào, {{ adminName }}!</span>
        <button @click="logout">Đăng Xuất</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
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
    methods: {
      logout() {
        localStorage.removeItem("admin_login");
        this.$router.push({ name: "LoginPage" });
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
    justify-content: space-between;
    align-items: center;
  }
  </style>