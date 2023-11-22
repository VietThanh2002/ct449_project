<template>
    <div>
      <AppHeaderVue />
    </div>
    <div style="margin-top: 20px;">
      <div id="carouselExampleIndicators" class="carousel slide">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="../assets/img/bn3.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="../assets/img/bn2.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="../assets/img/bn1.jpg" class="d-block w-100" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
        <h4 class="text-center mt-2">SẢN PHẨM NỔI BẬT</h4>
        <div class="page">
            <div class="">
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
      </div>
  
  </template>
  
  <script>
  import AppHeaderVue from "./AppHeader.vue";
  import ProductList from "../components/Product.vue";
  import  AppFooterVue from "./AppFooter.vue";
  import ProductService from "../services/product.service";
  
  export default {
    name: "HomePage",
    components: {
      AppHeaderVue,
      ProductList,
      AppFooterVue,
    },
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
      // const a = localStorage.getItem("user_id");
      // console.log("user_id:", a);
    },
  };
  </script>
  
  <style scoped>

  

  .carousel-item img {
    height: 400px;
    object-fit: cover;
    display: block;
    width: 1200px;
  }
  
  .page {
   
    max-width: 1200px;
  }

  </style>
  