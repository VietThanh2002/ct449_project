<template>
  <div class="container-fluid">
    <div class="row gx-5">
      <div
        class="col-lg-3 list-group-item me-3"
        v-for="(product, index) in products"
        :key="product._id"
        :class="{ active: index === activeIndex }"
      >
      <router-link to="/">
        <div class="product_img">
          <img :src="product.img" alt="" />
        </div>
      </router-link>
        <div class="product_name">
          {{ product.name }}
        </div>
          <div class="product_price">
            {{ product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} Đồng
          </div>
      <div class="text-center">
        <button class="btn_cart" @click="addProductToCart(index)">
              <i class="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
        <div class="product_text">
          {{ product.des }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeaderVue from "./AppHeader.vue";

export default {
  name: "ProductPage",
  components: {
    AppHeaderVue,
  },
  props: {
    products: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  methods: {
    async addProductToCart(index) {
      console.log(this.products);
      const saveLocalCart = JSON.parse(localStorage.getItem("cart") ?? "[]");
      for (const item of saveLocalCart) {
        if (item._id === this.products[index]._id) {
          item.amount++;
          const saveobject = JSON.stringify(saveLocalCart);
          localStorage.setItem("cart", saveobject);
          alert("Đã thêm sản phẩm vào giỏ hàng!!");
          return;
        }
      }
      const temp = {
        _id: this.products[index]._id,
        name: this.products[index].name,
        img: this.products[index].img,
        price: this.products[index].price,
        des: this.products[index].des,
        amount: 1,
      };
      console.log(temp);
      saveLocalCart.push(temp);
      const saveobject = JSON.stringify(saveLocalCart);
      localStorage.setItem("cart", saveobject);
      alert("Sản phẩm vừa được thêm vào giỏ hàng");
    },
  },
};
</script>

<style>
/* .product_row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  padding-bottom: 60px;
} */

.list-group-item {
  width: 300px;
  margin: 10px 0;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.list-group-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.product_name {
  text-align: center;
  color: black;
  font-size: 20px;
  margin-bottom: 10px;
}

.product_price {
  color: orangered;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

.product_img img {
  height: 180px;
  object-fit: cover;
  display: block;
  width: 100%;
  margin-bottom: 10px;
}

.btn_cart {
  width: 20%;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 30px ;
  color: lightcoral;
}

.btn_cart:hover {
  background-color: rgb(157, 64, 64);
}

</style>
