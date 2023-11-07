<template>
    <div>
      <h2>Danh sách người dùng</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên người dùng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}
                {{ user.address }}
                {{ user.phone }}
                {{ user.email }}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import UserService from "../services/user.service";
  
  export default {
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
  