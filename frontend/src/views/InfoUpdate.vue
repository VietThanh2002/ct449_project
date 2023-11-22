<template>
    <AppHeaderVue />
    <FormUserUpdate/>
    <AppFooterVue/>
</template>

<script>
  import AppHeaderVue from "@/components/AppHeader.vue";
  import AppFooterVue from "@/components/AppFooter.vue";
  import FormUserUpdate from "@/components/FormUserUpdate.vue";
  export default{
    components: {
        AppHeaderVue,
        AppFooterVue,
        FormUserUpdate, 
    }
  }
</script>