<template>
    <AppHeaderVue />
    <div class="container-fluid mt-5" style="margin-bottom: 270px;">
        <div class="row">
            <div class="col-lg-6">
                <img :src="product.img" alt="" class="img-fluid img-product float-end rounded-3"/>
            </div>
            <div class="col-lg-6">
               <div class="">
                    <div class="product-name"><span>Tên sản phẩm: </span>{{ product.name }}</div>
                    <div class="product-price"><span>Giá:  </span>{{ formatPrice(product.price) }}</div>
                    <div class="product-description"><span>Mô tả:  </span>{{ product.des }}</div>
               </div>
               
                <button class="btn_cart rounded-pill mt-3" @click="addProductToCart(product)" style="width: 50px;">
                    <i class="fa-solid fa-cart-shopping"></i>
                </button>
            </div>
        </div>
    </div>
    <AppFooterVue/>
  </template>
  
  <script>
  import ProductService from "@/services/product.service";
  import AppHeaderVue from "@/components/AppHeader.vue";
  import AppFooterVue from "@/components/AppFooter.vue";
  export default {
        name: "ProductDetail",
        components:{
            AppHeaderVue,
            AppFooterVue,
        },
        data() {
            return {
                product: null, // Sản phẩm sẽ được tải từ API dựa trên ID sản phẩm
            };
        },
        methods: {
            formatPrice(price) {
                const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return formattedPrice + "đ";
            },
            async addProductToCart(product) {
                const saveLocalCart = JSON.parse(localStorage.getItem("cart") || "[]");
                const existingProduct = saveLocalCart.find(item => item._id === product._id);

                if (existingProduct) {
                    existingProduct.amount++;
                } else {
                    const newProduct = {
                    _id: product._id,
                    name: product.name,
                    img: product.img,
                    price: product.price,
                    des: product.des,
                    amount: 1,
                    };
                    saveLocalCart.push(newProduct);
                }

            this.updateLocalStorage(saveLocalCart);
            this.showAlert("Sản phẩm đã được thêm vào giỏ hàng!");
            },
            updateLocalStorage(cart) {
                const saveObject = JSON.stringify(cart);
                localStorage.setItem("cart", saveObject);
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

.img-product{
    max-width: 50%; /* Ảnh sẽ không vượt quá kích thước của div cha */
    height: auto; /* Để giữ tỷ lệ khung hình của ảnh */
    width: 50%;
}

</style>