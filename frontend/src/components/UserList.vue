<template>
   <AdminHeader />
   <h2 class="text-center">Danh sách khách hàng</h2>
     <div class="container-fluid">
        <div class="ml-auto mr-auto">
        <table class="table table-striped shadow">
          <thead>
            <tr>
              <th>Stt</th>
              <th>Tên người dùng</th>
              <th>Thông tin khách hàng</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="user.id">
              <td>{{ index = index+1 }}</td>
              <td>{{ user.name }}</td>
              <td> {{ user.address }} -
                  {{ user.phone }} - 
                  {{ user.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>
     </div>
  </template>
  
  <script>
  import UserService from "../services/user.service";
  import AdminHeader from "@/components/AdminHeader.vue";
  export default {
    components: {
      AdminHeader,
    },
    data() {
      return {
        users: [],
      };
    },
    async created() {
      this.users = await UserService.getAll();
    },
  };
  </script>
  