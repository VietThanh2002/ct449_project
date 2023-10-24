<template>
    <div>
      <AppHeaderVue />
    </div>
    <body>
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img src="../assets/img/banner1.png" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                <img src="../assets/img/banner2.png" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                <img src="../assets/img/banner-01.jpg" class="d-block w-100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-target="#carouselExampleControls" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-target="#carouselExampleControls" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </button>
        </div>
        <h4 class="text-center mt-2">SẢN PHẨM NỔI BẬT</h4>
        <div class="page row">
            <div class="mt-3 col-md-6 shadow">
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
    </body>
  
  </template>
  
  <script>
  import AppHeaderVue from "./AppHeader.vue";
  import AppFooterVue from "./AppFooter.vue"
  import ProductList from "../components/Product.vue";
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
    },
  };
  </script>
  
  <style scoped>

  

  .carousel-item img {
    height: 500px;
    object-fit: cover;
    display: block;
    width: 1200px;
  }
  
  .page {
    float: center;
    max-width: 1200;
  }
  </style>
  