<template>
    <div>
      <AppHeaderVue />
      <div class="order-page">
        <p>Trang đặt hàng</p>
        <!-- Hiển thị thông tin đơn hàng hoặc gọi phương thức để tải dữ liệu đơn hàng từ service -->
        <div v-if="order">
          <table class="order-table">
            <tr>
              <td><strong>ID Đơn hàng:</strong></td>
              <td>{{ order._id }}</td>
            </tr>
            <!-- Thêm các thông tin khác về đơn hàng tại đây -->
          </table>
        </div>
      </div>
      <AppFooter />
    </div>
  </template>
  
  <script>
  import AppHeaderVue from "../components/AppHeader.vue";
  import AppFooter from "../components/AppFooter.vue";
  // Import OrderService từ nơi bạn đã định nghĩa nó
  import OrderService from "../services/order.service.js";
  
  export default {
    components: {
      AppHeaderVue,
      AppFooter,
    },
    data() {
      return {
        order: null, // Lưu trữ thông tin đơn hàng
      };
    },
    mounted() {
      // Khi component được mount, gọi phương thức để lấy thông tin đơn hàng
      this.loadOrderData();
    },
    methods: {
      async loadOrderData() {
        try {
          // Sử dụng OrderService để lấy thông tin đơn hàng (thay đổi theo logic của bạn)
          const userId = "your_user_id"; // Thay bằng user ID thích hợp
          const userOrders = await OrderService.getUserOrders(userId);
  
          // Giả sử lấy đơn hàng đầu tiên, bạn có thể điều chỉnh theo logic của bạn
          this.order = userOrders[0];
        } catch (error) {
          console.error("Error loading order data:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .order-page {
    max-width: 800px;
    margin: auto;
  }
  
  .order-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .order-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .order-table td:first-child {
    width: 40%;
    font-weight: bold;
  }
  
  .order-table td:last-child {
    width: 60%;
  }
  
  /* Thêm các quy tắc CSS scoped tại đây nếu cần */
  </style>
  