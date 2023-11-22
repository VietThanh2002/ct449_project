<script>
export default {
    props: {
        product: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <hr>
            <strong>Tên:</strong>
            {{ product.name }}
            <hr>
        </div>
        <div class="p-1">
            <strong>Ảnh</strong>&nbsp;
            <img :src="product.img" alt="Product Image" style="max-width: 100px; max-height: 100px;" />
            <hr>
        </div>
        <!-- <div class="p-1">
            <strong>Giá bán:</strong>
            {{ product.price }}
            <hr>
        </div>
        <div class="p-1">
            <strong>Mô tả:</strong>
            {{ product.des }}
            <hr>
        </div> -->
    </div>
    
</template>

<style>

</style>