<template>
    <div>
      <AppHeaderVue />
    </div>
    <div class="page row">
      <div class="mt-3 col-md-8">
        <h4 class="mb-3">Sản Phẩm</h4>
        <ProductList
          v-if="filteredProductsCount > 0"
          :products="filteredProducts"
          v-model:activeIndex="activeIndex"
        />
        <p v-else>Không có sản phẩm nào.</p>
      </div>
    </div>
    <div class="">
        <AppFooterVue />
    </div>
  </template>
  
  <script>
  import AppHeaderVue from "../components/AppHeader.vue";
  import AppFooterVue from "../components/AppFooter.vue"
  import ProductList from "../components/ProductList.vue";
  import ProductService from "../services/product.service";
  
  export default {
    components: {
      ProductList,
      AppHeaderVue,
      AppFooterVue,
    },
    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {
      return {
        products: [],
      };
    },
    computed: {
      // Trả về các product có chứa thông tin cần tìm kiếm.
      filteredProducts() {
        if (!this.searchText) return this.products;
        return this.products.filter((_product, index) =>
          this.productStrings[index].includes(this.searchText)
        );
      },
      activeProduct() {
        if (this.activeIndex < 0) return null;
        return this.filteredProducts[this.activeIndex];
      },
      filteredProductsCount() {
        return this.filteredProducts.length;
      },
    },
    methods: {
      async retrieveProducts() {
        try {
          this.products = await ProductService.getAll();
        } catch (error) {
          console.log(error);
        }
      },
      refreshList() {
        this.retrieveProducts();
        this.activeIndex = -1;
      },
    },
    mounted() {
      this.refreshList();
    },
  };
  </script>
  
  <style scoped>
  .page {
    float: center;
    max-width: 1200;
  }
  </style>
  