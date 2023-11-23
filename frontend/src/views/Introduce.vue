<template>
    <div>
      <AppHeaderVue />
    </div>
    
    <h1 class="bd-title d-flex justify-content-center mt-4">GIỚI THIỆU VỀ CỬA HÀNG</h1>
    <div class="container my-5 ">
        <div class="row featurette d-flex justify-content-center align-items-center">
            <div class="col-md-7">
                <p class="lead text-justify">Chào mừng bạn đến với Sweet Delights, nơi mà hương vị ngọt ngào gặp gỡ sự sáng tạo không ngừng. 
                  Chúng tôi tự hào là điểm đến số một cho những người yêu thưởng thức bánh ngọt chất lượng cao. Tại Sweet Delights, chúng tôi 
                  không chỉ bán bánh, mà chúng tôi mang đến trải nghiệm điểm tinh tế và hạnh phúc từ những chiếc bánh ngọt tuyệt vời. Với sự kết 
                  hợp tinh tế giữa nguyên liệu tươi ngon và kỹ năng nghệ thuật cao, chúng tôi sẽ đưa bạn đến một hành trình vị giác không ngừng khám phá.</p>
            </div>
            <div class="col-md-5">
                <img src="https://cdn.tgdd.vn/Files/2021/12/01/1401718/10-tiem-banh-kem-quan-10-duoc-team-ghien-ngot-yeu-thich-va-lua-chon-202112012045467439.jpg" 
                class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" alt="">
            </div>
        </div>
        <div class="row featurette d-flex justify-content-center align-items-center mt-4">
            <div class="col-md-7 order-md-2">
                <p class="lead text-justify">Tại Sweet Delights, chúng tôi không chỉ bán bánh mà chúng tôi tạo ra những kiệt tác bánh ngọt từ tâm huyết và tâm trí. 
                  Mỗi chiếc bánh tại cửa hàng chúng tôi không chỉ là sản phẩm, mà là một tác phẩm nghệ thuật đầy màu sắc và hương vị. Chúng tôi tập trung vào việc sáng 
                  tạo, từ việc lựa chọn nguyên liệu chất lượng đến việc trang trí bánh độc đáo. Hãy để chúng tôi là người bạn đồng hành đáng
                   tin cậy trên hành trình khám phá thế giới bánh ngọt tinh tế và thú vị. Chào mừng bạn đến Sweet Delights, nơi nở hoa hương vị!</p>
            </div>
            <div class="col-md-5 order-md-1">
                <img src="https://file.hstatic.net/1000384103/file/nhieu-loai-banh_8133f34a844b495da49662cd4d97faa1_grande.jpg" 
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
  import AppHeaderVue from "../components/AppHeader.vue";
  import AppFooterVue from "../components/AppFooter.vue";
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
  