<template>
  <div>
    <nav class="navbar shadow" style="background-color: lightblue;">
  
      <div class="mr-auto navbar-nav float-start">
        
        <li class="nav-item fw-bold">
          <router-link to="/" class="nav-link"> Trang Chủ </router-link>

          <router-link
            to="/product"
            class="nav-link"
          >
            Sản Phẩm
          </router-link>

          <router-link
            to="/introduce"
            class="nav-link"
          >
            Giới Thiệu
          </router-link>
        </li>
      </div>
      <div class="navbar-nav float-end">
        <li class="nav-item">
          
          <router-link to="/shopping_cart" class="nav-link">
            <button class="btn"><i class=" fas fa-cart-shopping"></i></button>
          </router-link>

          <router-link to="/login" class="nav-link">
              <button class="btn "><i class="fa-solid fa-user"></i></button>
          </router-link>

          <router-link
            to="/"
            class="nav-link"
            v-if="this.local_user.role != ''"
            @click="handleLogout"
          >
           <button class="btn"><i class="fa-solid fa-right-from-bracket"></i></button>
          </router-link>
        </li>
      </div>
    </nav>
  </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        carts: [],
        local_user: {
          role: "",
        },
      };
    },
    methods: {
      logout() {
        localStorage.clear();
        this.$router.push({ name: "LoginPage" });
      },
      handleLogout() {
        localStorage.removeItem("user_login");
        this.$router.push({ name: "LoginPage" });
      },
    },
    mounted() {
      const listLoalCart = JSON.parse(localStorage.getItem("cart") ?? "[]");
      this.carts = listLoalCart;
      const user = JSON.parse(localStorage.getItem("user_login"));
      console.log(user);
      this.local_user = user;
    },
  };
  </script>
  
  <style>
  .navbar {
    top: 0;
  }
  
  .nav-link {
    color: aliceblue;
    float: left;
    font-size: 20px;
    margin: 10px;
  }
  .navbar-brand{
    width: 25px;
    height: 50px;
  }
  </style>
  