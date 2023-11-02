import { createWebHistory, createRouter } from "vue-router";
import AdminPage from "@/views/ProductAdmin.vue";
import LoginPage from "../components/Login.vue";
import RegisterPage from "../components/Register.vue";
import HomePage from "../components/Home.vue";
import IntroducePage from "../components/Introduce.vue";
import ShoppingCart from "../components/ShoppingCart.vue"
import AdminLogin from "../components/AdminLogin.vue"

const routes = [
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/",
        name: "HomePage",
        component: HomePage,
        props: true
    },
    {
        path: "/product",
        name: "ProductPage",
        component: () => import("@/views/ProductScreen.vue"),
    },
    
    {
        path: "/introduce",
        name: "IntroducePage",
        component: IntroducePage,
        props: true
    },
    {
        path: "/shopping_cart",
        name: "ShoppingCart",
        component: ShoppingCart,
        props: true
    },
    {
        path: "/admin/login",
        name: "AdminLogin",
        component: AdminLogin,
    },
    {
        path: "/admin/adminPage",
        name: "AdminPage",
        component: AdminPage,
        beforeEnter: (to, from, next) => {
          // Kiểm tra xem người dùng đã đăng nhập là admin hay không
          const adminLogin = localStorage.getItem("admin_login");
          if (adminLogin) {
            // Nếu đăng nhập là admin, cho phép truy cập trang AdminPage
            next();
          } else {
            // Nếu không đăng nhập là admin, chuyển hướng đến trang đăng nhập admin
            next({ name: "AdminLogin" });
          }
        },
    },
    {
        path: "/products/:id",
        name: "product.edit",
        component: () => import("@/views/ProductsEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/products/",
        name: "product.add",
        component: () => import("@/views/ProductsEdit.vue"),
        props: true
    },
    {
        path: "/login",
        name: "LoginPage",
        component: LoginPage,
        props: true
    },
    {
        path: "/register",
        name: "RegisterPage",
        component: RegisterPage,
        props: true
    },
    
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
