<template>
    <div>
      <AppHeaderVue />
    </div>
    <h4 class="mb-3 text-center">Sản Phẩm</h4>
   
        <div class="page text-center">
            <div class="" style="margin-bottom: 200px;">
            <ProductList
              v-if="filteredProductsCount > 0"
              :products="filteredProducts"
              v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có sản phẩm nào.</p>
          </div>
        </div>
    <div>
        <AppFooterVue />
    </div>
  </template>
  
  <script>
  import AppHeaderVue from "@/components/AppHeader.vue";
  import ProductList from "@/components/Product.vue";
  import ProductService from "@/services/product.service";
  import AppFooterVue from "@/components/AppFooter.vue";
  
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
   
   max-width: 1200px;
 }
  </style>
  