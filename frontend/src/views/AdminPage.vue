<template>
  <AdminHeader />
    <div class="page row">

      <div class="col-lg-10 mt-3">
        <InputSearch v-model="searchText" />
      </div>
      <div class="col-lg-2 mt-3">
        <router-link
            :to="{
              name: 'user.list',
        
            }"
          >
          <div class="mt-2 p-1 btn btn-secondary">
              Danh sách khách hàng
            </div>
        </router-link>
        <router-link
            :to="{
              name: 'order.list',
        
            }"
          >
          <div class="mt-2 p-1 btn btn-success">
              Đơn đặt hàng
            </div>
        </router-link>
      </div>
      <div class="mt-3 col-md-12 justify-content-around align-items-center">

        <button class="btn btn-sm btn-success float-start button_add" @click="goToAddProduct">
          <i class="fas fa-plus"></i> Thêm bánh
        </button>
  
        <button class="btn btn-sm btn-danger float-end" @click="removeAllProducts">
          <i class="fas fa-trash"></i> Xóa tất cả bánh
        </button>
      </div>
      <div class="mt-3 col-md-12">

        <ProductList
          v-if="filteredProductsCount > 0"
          :products="filteredProducts"
          v-model:activeIndex="activeIndex"
        />
        <p v-else>Không có sản phẩm nào.</p>
      </div>
      <div class="mt-3 col-md-8">
        <div v-if="activeProduct">
          <router-link
            :to="{
              name: 'product.edit',
              params: { id: activeProduct._id },
            }"
          >
          <button class="mt-2 bg-success p-1 product_edit">Cập nhật bánh</button>
          </router-link>
          <ProductCard :product="activeProduct" />
      
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AdminHeader from "@/components/AdminHeader.vue";
  import ProductCard from "@/components/ProductCard.vue";
  import InputSearch from "@/components/InputSearch.vue";
  import ProductList from "@/components/ProductList.vue";
  import UserList from "@/components/UserList.vue";
  import ProductService from "@/services/product.service";
  export default {
    
    components: {
      ProductCard,
      InputSearch,
      ProductList,
      UserList,
      AdminHeader,
    },
    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {
      return {
        products: [],
        activeIndex: -1, // chỉ số trạng thái chưa được chọn 
        searchText: "",
      };
    },
    watch: {
      // Giám sát các thay đổi của biến searchText.
      // Bỏ chọn phần tử đang được chọn trong danh sách.
      searchText() {
        this.activeIndex = -1;
      },
    },
    computed: {
      // Chuyển các đối tượng product thành chuỗi để tiện cho tìm kiếm.
      productStrings() {
        return this.products.map((product) => {
          const { name, des, price, } = product;
          return [name, des, price].join("");
        });
      },
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
  
      async removeAllProducts() {
        if (confirm("Bạn có muốn xóa tất cả Sản Phẩm?")) {
          try {
            await ProductService.deleteAll();
            this.refreshList();
          } catch (error) {
            console.log(error);
          }
        }
      },
  
      goToAddProduct() {
        this.$router.push({ name: "product.add" });
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
  margin: 0 auto;
  padding: 20px;
}

.card-title {
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  text-align: center;
  margin: 0;
}

.button_add,
.product_edit {
  border-radius: 3px;
  border: 1px solid #ccc;
  margin-right: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

.button_add:hover,
.product_edit:hover {
  background-color: #58bd4d;
  color: #fff;
}

.product_edit {
  margin-top: 10px;
}

.product-list-item {
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
  transition: all 0.3s ease;
}

.product-list-item:hover {
  background-color: #f5f5f5;
}
  </style>
  