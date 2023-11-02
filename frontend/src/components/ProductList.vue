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
  },
};
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">STT</th>
        <th scope="col">Tên Sản Phẩm</th>
        <th scope="col">Giá</th>
        <th scope="col">Mô Tả</th>
        <th scope="col">Hình Ảnh</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(product, index) in products" :key="product._id" :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
        <td>{{  }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.des }}</td>
        <td><img :src="product.img" alt="Product Image" style="max-width: 100px; max-height: 100px;" /></td>
      </tr>
    </tbody>
  </table>
</template>
