<template>
    <Form
        class=" bg-light p-3 shadow"
        @submit="submitProduct"
        :validation-schema="productFormSchema"
        style="height: 420px;"
    >
        <div class="form-group">
            <label for="name" class="m-2">Tên sản phẩm</label>
                <Field
                name="name"
                type="text"
                class="form-control m-2 "
                v-model="productLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="link" class="m-2">Link ảnh sản phẩm</label>
                <Field
                name="link"
                type="text"
                class="form-control m-2 "
                v-model="productLocal.img"
            />
            <ErrorMessage name="link" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="price" class="m-2">Giá bán</label>
                <Field
                name="price"
                type="text"
                class="form-control m-2 "
                v-model="productLocal.price"
            />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
            <div class="form-group">
                <label for="description" class="m-2">Mô tả</label>
                <Field
                name="description"
                type="text"
                class="form-control m-2 "
                v-model="productLocal.des"
            />
            <ErrorMessage name="description" class="error-feedback" />
        </div>
        <div class="form-group">
            <button v-if="productLocal._id" class="btn btn-primary  float-start">Cập nhật</button>
            <button
                v-if="productLocal._id"
                type="button"
                class="pl-2 btn btn-danger float-end"
                @click="deleteProduct"
            >
                Xóa
            </button>
            <button
                v-if="!productLocal._id"
                type="button"
                class=" btn btn-danger"
                @click="addProduct"
            >
                <span>Thêm</span>
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";

import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:product", "delete:product"],
    props: {
        product: { type: Object, required: true }
    },
    data() {
        const productFormSchema = yup.object().shape({
        name: yup
            .string()
            .required("Tên sản phẩm không được để trống!!")
            .min(2, "Tên phải ít nhất 5 ký tự.")
            .max(50, "Tên có nhiều nhất 50 ký tự."),
        img: yup
            .string()
            .max(500, "Link tối đa 500 ký tự."),
        des: yup.string().max(1000, "Mô tả tối đa 1000 ký tự."),
        
        });
        return {
        // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
        // productLocal để liên kết với các input trên form
            productLocal: this.product,
            productFormSchema,
        };
    },
    methods: {
        submitProduct() {
            this.$emit("submit:product", this.productLocal);
        },
        deleteProduct() {
            this.$emit("delete:product", this.productLocal.id);
        },
        addProduct() {
            this.$emit("add:product", this.productLocal);
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";

</style>