import { createWebHistory, createRouter } from "vue-router";
import AdminPage from "@/views/AdminPage.vue";
import LoginPage from "../components/Login.vue";
import RegisterPage from "../components/Register.vue";
import HomePage from "../views/Home.vue";
import IntroducePage from "../views/Introduce.vue";
import ContactPage from "../views/ContactPage.vue";
import ShoppingCart from "../views/ShoppingCart.vue"
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
        path: "/product/:id",
        name: "ProductDetail",
        component: () => import("@/views/ProductDetail.vue"),
        props: true
    },
    
    {
        path: "/introduce",
        name: "IntroducePage",
        component: IntroducePage,
        props: true
    },
    {
        path: "/contact",
        name: "ContactPage",
        component: ContactPage,
        props: true
    },
    {
        path: "/cart",
        name: "ShoppingCart",
        component: ShoppingCart,
        props: true
    },
    {
        path: "/profile",
        name: "Profile",
        component: () => import("@/views/ViewProfile.vue"),
        props: true
    },
    {
        path: "/updateProfile",
        name: "UpdateProfile",
        component: () => import("@/views/InfoUpdate.vue"),
        props: true
    },
    {
        path: "/order",
        name: "order",
        component: () => import("@/views/OrderPage.vue"),
        props: true
    },
    {
        path: "/admin",
        name: "AdminLogin",
        component: AdminLogin,
    },
    {
        path: "/AdminPage",
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
        path: "/products",
        name: "product.add",
        component: () => import("@/views/ProductsEdit.vue"),
        props: true
    },
    {
        path: "/userList",
        name: "user.list",
        component: () => import("@/components/UserList.vue"),
        props: true
    },
    {
        path: "/orderlist",
        name: "order.list",
        component: () => import("@/components/OrderList.vue"),
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
