<script>
export default {
  props: {
    products: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    formatPrice(price){
      const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return formattedPrice + " đ";
    },
  },
};
</script>

<template>
   <h4 class="text-center m-2 p-2">Danh Sách Sản Phẩm</h4>
  <table class="table table-group-divider table-hover">
    <thead>
      <tr class="text-center">
        <th scope="col">STT</th>
        <th scope="col">Tên Sản Phẩm</th>
        <th scope="col">Giá</th>
        <th scope="col">Mô Tả</th>
        <th scope="col">Hình Ảnh</th>
      </tr>
    </thead>
    <tbody class="text-center justify-content-center">
      <tr v-for="(product, index) in products" :key="product._id" :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
        <td>{{ index + 1 }}</td>
        <td>{{ product.name }}</td>
        <td>{{ formatPrice(product.price) }}</td>
        <td>{{ product.des }}</td>
        <td><img :src="product.img" alt="Product Image" style="max-width: 100px; max-height: 100px;" /></td>
      </tr>
    </tbody>
  </table>
</template>
