<template>
    <div>
      <AdminHeader />
      <h3 class="text-center p-2 m-2">Đơn đặt hàng</h3>
  
      <!-- Bảng hiển thị danh sách đơn hàng -->
      <table class="table table-hover border shadow">
        <thead class="bg-warning-subtle">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">ID đơn hàng</th>
            <th scope="col">Tên Khách Hàng</th>
            <th scope="col">Tổng Tiền</th>
            <th scope="col">Trạng Thái</th>
            <th scope="col">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="order._id">
            <td>{{ index + 1 }}</td>
            <td>{{ order._id }}</td>
            <td>{{ order.name }}</td>
            <td>{{ formatPrice(order.totalMoney) }}</td>
            <td>{{ order.status }}</td>
            <td>
              <button @click="updateOrderStatus(order._id, 'đang giao hàng')" class="btn btn-success p-1 m-1">Duyệt</button>
              <!-- <button @click="deleteOrder(order._id)" class="btn btn-secondary p-1 m-1"><i class="fa-solid fa-trash"></i></button> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import AdminHeader from "@/components/AdminHeader.vue";
  import OrderService from "../services/order.service.js";
  
  export default {
    components: {
      AdminHeader,
    },
    data() {
      return {
        orders: [], // Lưu trữ danh sách đơn hàng
      };
    },
    methods: {
        formatPrice(price) {
            const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return formattedPrice + "đ";
        },
        async fetchOrders() {
            try {
            // Gọi phương thức từ OrderService để lấy danh sách đơn hàng
            this.orders = await OrderService.getAllOrders();
            } catch (error) {
            console.error("Error fetching orders:", error);
            }
        },
      async updateOrderStatus(orderId, newStatus) {
        try {
            // Gọi phương thức từ OrderService để cập nhật trạng thái đơn hàng
            await OrderService.updateOrderStatus(orderId, newStatus);

            // Cập nhật trạng thái trong danh sách hiển thị
            const index = this.orders.findIndex((order) => order._id === orderId);
            if (index !== -1) {
            // Gán trực tiếp giá trị mới
            this.orders[index].status = newStatus;
            alert('Đã cập nhật trạng thái đơn hàng!!')
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
        }
        },
    },
    mounted() {
      // Khi component được mounted, gọi phương thức để lấy danh sách đơn hàng
      this.fetchOrders();
    },
  };
  </script>
  
  <style scoped>
  /* Thêm bôi đen cho nút duyệt */
  .btn-success {
    background-color: #28a745;
    color: #fff;
  }
  </style>
  