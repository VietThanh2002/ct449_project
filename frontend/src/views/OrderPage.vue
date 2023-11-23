<template>
    <div>
      <AppHeaderVue />
      <div class="order-page">
        <h3 class="text-center m-2 p-2">Đơn đặt hàng</h3>
        <div v-if="orders && orders.length > 0">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col"><strong>ID Đơn hàng:</strong></th>
                <th scope="col">Giá</th>
                <th scope="col">Ngày đặt hàng</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, index) in orders" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ order._id }}</td>
                <td>{{ formatPrice(order.totalMoney) }}</td>
                <td>{{ order.orderDate }}</td>
                <td>{{ order.status }}</td>
                <td>
                  <button
                    class="btn btn-danger"
                    @click="deleteOrder(order, index)"
                    :disabled="order.status === 'đang giao hàng'"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <p>Không có đơn hàng nào.</p>
        </div>
      </div>
      <AppFooter />
    </div>
  </template>
  
  <script>
  import AppHeaderVue from "../components/AppHeader.vue";
  import AppFooter from "../components/AppFooter.vue";
  import OrderService from "@/services/order.service.js";
  
  export default {
    components: {
      AppHeaderVue,
      AppFooter,
    },
    data() {
      return {
        orders: [], // Lưu trữ thông tin tất cả đơn hàng
      };
    },
    mounted() {
      // Khi component được mount, gọi phương thức để lấy thông tin tất cả đơn hàng
      this.loadOrderData();
    },
    methods: {
      formatPrice(price) {
        const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedPrice + "đ";
      },
      async loadOrderData() {
        try {

          const user_id = JSON.parse(localStorage.getItem('user_id'));
          this.orders = await OrderService.getUserOrders(user_id);
        } catch (error) {
          console.error("Error loading order data:", error);
        }
      },
      async deleteOrder(order, index) {
        try {

        //   Kiểm tra trạng thái trước khi xóa
        
          // if (order.status === 'đang giao hàng') {
          //   alert('Không thể xóa đơn hàng đã được giao.');
          //   return;
          // }
          const user_id = JSON.parse(localStorage.getItem('user_id'));
          const result = await OrderService.deleteOrder(user_id, order._id);
  
          // Kiểm tra kết quả và cập nhật danh sách đơn hàng
          if (result) {
            this.orders.splice(index, 1);
            alert('Đơn hàng đã được xóa thành công.');
          } else {
            alert('Đơn hàng đã được xóa thành công.');
          }
        } catch (error) {
          console.error("Error deleting order:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .order-page {
    max-width: 800px;
    margin: auto;
    margin-bottom: 320px;
  }
  </style>
  