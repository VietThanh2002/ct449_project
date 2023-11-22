<template>
    <div class="container mt-5">
      <!-- Thông tin khách hàng -->
      <div class="row">
        <div class="col-md-6 ">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title text-center">Thông tin cá nhân</h5>
              <p class="card-text">Tên: {{ users.name }}</p>
              <p class="card-text">Email: {{ users.email }}</p>
              <p class="card-text">Địa chỉ: {{ users.address }}</p>
              <p class="card-text">Số điện thoại: {{ users.phone }}</p>
              <router-link to="/updateProfile">
                <button class="btn btn-secondary">Cập nhật thông tin</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
  

    </div>
  </template>
  
  <script>
  import UserService from "../services/user.service";
  
  export default {
    data() {
      return {
        users: {}, 
      };
    },
    
    async created() {
        const user_id = JSON.parse(localStorage.getItem('user_id'));
        console.log(user_id);
        this.users = await UserService.get(user_id);
    },
    

    mounted(){
        const user_id = localStorage.getItem('user_id');
        // console.log(this.users);
        console.log(user_id);
    }
  };
  </script>
  
  <style scoped>
  .container{

    margin-bottom: 220px;
  }

  </style>
  