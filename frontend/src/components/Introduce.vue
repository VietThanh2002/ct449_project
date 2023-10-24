<template>
    <div>
      <AppHeaderVue />
    </div>
    
    <h1 class="bd-title d-flex justify-content-center mt-4">GIỚI THIỆU VỀ ĐẶC SẢN</h1>
    <div class="container my-5 ">
        <div class="row featurette d-flex justify-content-center align-items-center">
            <div class="col-md-7">
                <h2 class="featurette-heading fw-normal lh-1">Nem lai vung</h2>
                <p class="lead text-justify">Nem Lai Vung là món ăn đặc sản nổi tiếng của Đồng Tháp, một tỉnh thuộc vùng Đồng Bằng Sông Cửu Long của Việt Nam. 
                    Món ăn này được làm từ thịt heo băm nhuyễn, trộn với nhiều loại gia vị và thảo mộc, sau đó được bọc trong lá chuối trước khi được 
                    hấp hoặc nướng. Mỗi gia đình đều có công thức và kỹ thuật riêng để tạo ra món nem hoàn hảo. Món ăn này có hương vị độc đáo kết hợp
                     giữa vị ngọt, chua và cay, là món ăn yêu thích của người dân địa phương và du khách. Ban đầu, nem được làm chủ yếu cho các dịp lễ tế 
                     như thờ cúng tổ tiên, lễ hội và ngày lễ ở huyện Lai Vung. Tuy nhiên, nhờ hương vị ngon, nem đã trở thành món ăn phổ biến ở Đồng Tháp 
                     và các vùng khác của Việt Nam. Hiện nay, có nhiều cơ sở sản xuất nem ở Lai Vung, sản xuất hơn 500.000 chiếc nem mỗi ngày để phục vụ 
                     người dân địa phương và khách du lịch. Nếu bạn đến Đồng Tháp, đừng bỏ lỡ cơ hội thưởng thức món ăn ngon này và trải nghiệm hương vị 
                     độc đáo của Nem Lai Vung.</p>
            </div>
            <div class="col-md-5">
                <img src="../assets/img/nem.jpg" 
                class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" alt="">
            </div>
        </div>
        <div class="row featurette d-flex justify-content-center align-items-center mt-4">
            <div class="col-md-7 order-md-2">
                <h2 class="featurette-heading fw-normal lh-1">Bánh phồng tôm</h2>
                <p class="lead text-justify">Bánh phồng tôm Đồng Tháp là một món ăn nhẹ phổ biến tại các nước Đông Nam Á. Bánh được làm từ tôm tươi, bột mì, bột năng, 
                    trứng và các loại gia vị. Sau khi trộn đều, hỗn hợp được phơi mỏng và chiên giòn. Bánh phồng tôm có vị giòn, xốp, béo ngậy và thơm mùi hải sản. 
                    Đồng Tháp là một trong những tỉnh nổi tiếng về sản xuất bánh phồng tôm, đặc biệt là ở Sa Đéc và Lấp Vò. Các làng nghề sản xuất bánh phồng tôm ở
                     Đồng Tháp đã tồn tại từ lâu đời và được truyền lại qua nhiều thế hệ. Mỗi làng nghề có cách chế biến và bí quyết riêng, tạo ra những loại bánh 
                     phồng tôm độc đáo và hấp dẫn. Nếu bạn đến Đồng Tháp, đừng quên thưởng thức món bánh phồng tôm này và trải nghiệm hương vị đặc trưng của vùng 
                     đất sông nước này.</p>
            </div>
            <div class="col-md-5 order-md-1">
                <img src="../assets/img/banhphongtom.jpg" 
                class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" alt="">
    
            </div>
        </div>
        <div class="row featurette d-flex justify-content-center align-items-center mt-5">
            <div class="col-md-7">
                <h2 class="featurette-heading fw-normal lh-1">Privacy <span
                        class="text-body-secondary">It’ll blow your mind.</span></h2>
                <p class="lead">Some great placeholder content for the first featurette here. Imagine some exciting
                    prose here.Another featurette? Of course. More placeholder content here to give you an idea of how
                    this layout would work with some actual real-world content in place.</p>
            </div>
            <div class="col-md-5">
                <img src="https://cdn.xxl.thumbs.canstockphoto.com/matrix-clipart_csp0662211.jpg"
                class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" alt="">
            </div>
        </div>
        <hr class="featurette-divider">
    </div>
    <div>
      <AppFooterVue />
    </div>
  </template>
  
  <script>
  import AppHeaderVue from "./AppHeader.vue";
  import AppFooterVue from "./AppFooter.vue";
  export default {
    name: "IntroducePage",
    components: {
      AppHeaderVue,
      AppFooterVue,
    },
  };
  </script>
  
  <style>
  .img_end {
    width: 100%;
  }
  
  .content img {
    margin: 0 auto;
    display: block;
  }
  
  .footer__bottom {
    padding: 8px 0;
    background-color: #f5f5f5;
    margin-top: 16px;
  }
  
  .footer__text {
    display: block;
    margin: 0;
    text-align: center;
    font-size: 1.2rem;
    color: #737373;
  }
  </style>
  