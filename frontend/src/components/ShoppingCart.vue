<template>
  <div>
    <AppHeaderVue />
    <section>
      <div class="container">
        <P class="m-2 p-2 text-center display-5">Giỏ hàng</P>
        <div class="row">
          <div class="col">
            <table class="table table-group-divider table-hover">
              <thead class="text-center">
                <th>STT</th>
                <th>Hình đại diện</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th>Xóa</th>
              </thead>
              <tbody class="text-center">
                <tr v-for="(product, index) in products" :key="product._id">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <img :src="product.img" alt="" class="product-item-in-cart-img" />
                  </td>
                  <td>{{ product.name }}</td>
                  <td class="text-right">{{ formatPrice(product.price) }}</td>
                  <td class="text-right">{{ product.amount }}</td>
                  <td class="text-right">{{ formatPrice(product.price * product.amount) }}</td>
                  <td>
                    <button v-if="product._id" type="button" class="ml-2 btn btn-danger" @click="deleteProduct(index)">
                      Xóa
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h4 class="text-right">Tổng số tiền: {{ formatPrice(totalMoney) }}</h4>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AppHeaderVue from "./AppHeader.vue";

export default {
  components: {
    AppHeaderVue,
  },
  name: "ShoppingCart",
  data() {
    return {
      products: [],
    };
  },
  methods: {
    formatPrice(price) {
      const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return formattedPrice + " đ";
    },
    deleteProduct(index) {
      this.products.splice(index, 1);
      const saveobject = JSON.stringify(this.products);
      localStorage.setItem("cart", saveobject);
    },
  },
  computed: {
    totalMoney() {
      return this.products.reduce((total, product) => total + product.price * product.amount, 0);
    },
  },
  mounted() {
    const listLocalCart = JSON.parse(localStorage.getItem("cart") || "[]");
    this.products = listLocalCart;
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
