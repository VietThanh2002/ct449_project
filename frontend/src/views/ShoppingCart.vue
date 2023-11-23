<template>
  <div>
    <AppHeaderVue />
    <section>
      <div class="container">
        <p class="m-2 p-2 text-center display-5">Giỏ hàng</p>
        <div class="row">
          <div class="col">
            <table class="table table-group-divider table-hover shadow rounded-2">
              <thead class="text-center m-1 p-1">
                <th>STT</th>
                <th>Hình đại diện</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th>Xóa</th>
              </thead>
         <!-- Trong phần template -->
            <tbody class="text-center">
                <tr v-for="(item, index) in products" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <img :src="item.product.img" alt="" class="product-item-in-cart-img" />
                  </td>
                  <td>{{ item.product.name }}</td>
                  <td class="text-right">{{ formatPrice(item.product.price) }}</td>
                  <td class="text-right">x {{ item.quantity }}</td>
                  <td class="text-right">{{ formatPrice(item.product.price * item.quantity) }}</td>
                  <td>
                    <button v-if="item.product._id" type="button" class="ml-2 btn btn-danger rounded-circle" @click="deleteProduct(index)">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
            </tbody>

            </table>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-lg-6">
            <h4 class="float">Tổng số tiền: {{ formatPrice(totalMoney) }}</h4>
            <div class="card">
              <div class="card-body">
                <p class="card-text">Tên: {{ users.name }}</p>
                <p class="card-text">Email: {{ users.email }}</p>
                <p class="card-text">Địa chỉ: {{ users.address }}</p>
                <p class="card-text">Số điện thoại: {{ users.phone }}</p>
              </div>
          </div>
          </div>
          <div class="col-lg-6">
                <button class="btn btn-sm btn-success float-end" @click="placeOrder">Đặt hàng</button>
          </div>
        </div>
      </div>
    </section>
    <AppFooterVue/>
  </div>
</template>

<script>
import AppHeaderVue from "../components/AppHeader.vue";
import CartService from "@/services/cart.service.js"; // Thay đổi đường dẫn phù hợp
import ProductService from "@/services/product.service";
import UserService from "../services/user.service";
import OrderService from "../services/order.service.js";
import  AppFooterVue from "../components/AppFooter.vue";
export default {
  components: {
    AppHeaderVue,
    AppFooterVue,
  },
  name: "ShoppingCart",
  data() {
    return {
      products: [],
      users: {}, 
    };
  },
  methods: {
    formatPrice(price) {
        const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedPrice + "đ";
    },
    async deleteProduct(index) {
      try {
        const productId = this.products[index].product._id;
        const user_id = JSON.parse(localStorage.getItem("user_id"));
        const updatedCart = await CartService.removeItem(user_id, productId);

        if (updatedCart) {
          this.products = updatedCart.items;
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm từ server:", error);
      }
    },
    async placeOrder() {
        try {
            const user_id = JSON.parse(localStorage.getItem('user_id'));

            // Kiểm tra xem giỏ hàng có sản phẩm không
            if (this.products.length === 0) {
                alert('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng.');
                return;
            }

            // Tạo đơn hàng
            await OrderService.createOrder(user_id, this.products, this.users.address, this.users.name, this.users.phone, this.totalMoney);
            alert('Đặt hàng thành công');
           
        } catch (error) {
            console.error('Lỗi khi đặt hàng:', error);
            alert('Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại sau.');
        }
    },
  },
  
  computed: {
    totalMoney() {
      return this.products.reduce((total, item) => total + item.product.price * item.quantity, 0);
    },
  },

  async mounted() {
    try {
      const user_id = JSON.parse(localStorage.getItem('user_id'));
      const cart = await CartService.getCart(user_id);
      console.log("Cart data:", cart);
      if (cart) {
        this.products = cart.items;
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin giỏ hàng từ server:", error);
    }
  },

  async created() {
        const user_id = JSON.parse(localStorage.getItem('user_id'));
        console.log(user_id);
        this.users = await UserService.get(user_id);
    },
};
</script>

<style scoped>
.product-item-in-cart-img {
  width: 150px;
  height: 150px;
  object-fit: contain;
}
</style>
