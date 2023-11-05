<template>
    <div class="product-detail">
      <div class="product-img">
        <img :src="product.img" alt="" />
      </div>
      <div class="product-info">
        <h2>{{ product.name }}</h2>
        <p class="product-price">{{ formatPrice(product.price) }}</p>
        <p>{{ product.des }}</p>
        <button class="btn-add-to-cart" @click="addProductToCart(product)">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProductDetail",
    props: {
      product: { type: Object, default: () => ({}) },
    },
    methods: {
      formatPrice(price) {
        const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedPrice + "đ";
      },
      addProductToCart(product) {
        const saveLocalCart = JSON.parse(localStorage.getItem("cart") ?? "[]");
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
        this.showAlert("Sản phẩm đã được thêm vào giỏ hàng");
      },
      updateLocalStorage(cart) {
        const saveobject = JSON.stringify(cart);
        localStorage.setItem("cart", saveobject);
      },
      showAlert(message) {
        alert(message);
      },
    },
  };
  </script>
  
  <style scoped>
  .product-detail {
    display: flex;
    justify-content: space-around;
    margin: 20px;
  }
  
  .product-img img {
    height: 300px;
    object-fit: cover;
  }
  
  .product-info {
    width: 50%;
    padding: 20px;
  }
  
  .product-price {
    color: orangered;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  
  .btn-add-to-cart {
    background-color: lightcoral;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 5px;
  }
  
  .btn-add-to-cart:hover {
    background-color: rgb(157, 64, 64);
  }
  </style>
  