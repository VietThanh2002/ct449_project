<template>
    <AppHeaderVue />
    <div class="container-fluid mt-5" style="margin-bottom: 270px;">
        <h4 class="text-center fw-bold m-2 p-2">Chi tiết sản phẩm</h4>
        <div class="row">
            <div class="col-lg-6">
                <!-- Kiểm tra nếu product không rỗng trước khi truy cập thuộc tính img -->
                <img v-if="product" :src="product.img" alt="" class="img-fluid img-product float-end rounded-3"/>
            </div>
            <div class="col-lg-6">
               <div class="">
                    <!-- Kiểm tra nếu product không rỗng trước khi truy cập các thuộc tính khác -->
                    <div class="product-name" v-if="product"><span>Tên sản phẩm: </span>{{ product.name }}</div>
                    <hr>
                    <div class="product-price" v-if="product"><span>Giá:  </span>{{ formatPrice(product.price) }}</div>
                    <hr>
                    <div class="product-description" v-if="product"><span>Mô tả:  </span>{{ product.des }}</div>
                    <hr>
               </div>
               
              <div class="text-center">
                <button class="btn_cart rounded-pill mt-3" @click="addProductToCart(product)" style="width: 50px;">
                    <i class="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
            </div>
        </div>
    </div>
    <AppFooterVue/>
</template>

<script>
import CartService from "@/services/cart.service.js"; 
import ProductService from "@/services/product.service";
import AppHeaderVue from "@/components/AppHeader.vue";
import AppFooterVue from "@/components/AppFooter.vue";

export default {
    name: "ProductDetail",
    components: {
        AppHeaderVue,
        AppFooterVue,
    },
    data() {
        return {
            product: null,
        };
    },
    methods: {
        formatPrice(price) {
            const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return formattedPrice + "đ";
        },
        async addProductToCart(product) {
            try {
                const user_id = JSON.parse(localStorage.getItem('user_id'));
                if (!user_id) {
                    this.$router.push({ name: 'LoginPage' });
                    return;
                }
                
                await CartService.addToCart(user_id, product._id, 1);
                this.showAlert("Sản phẩm đã được thêm vào giỏ hàng!");
            } catch (error) {
                console.error(error);
            }
        },
        showAlert(message) {
            alert(message);
        },
    },
    async created() {
        try {
            const productId = this.$route.params.id;
            this.product = await ProductService.get(productId);
        } catch (error) {
            console.error(error);
        }
    },
};
</script>

<style scoped>
.img-product {
    max-width: 50%;
    height: auto;
    width: 50%;
}
</style>
