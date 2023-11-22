<template>
    <AppHeaderVue />
    <div class="info">
      <Profile />
    </div>
    <AppFooterVue/>
</template>

<script>
  import AppHeaderVue from "@/components/AppHeader.vue";
  import AppFooterVue from "@/components/AppFooter.vue";
  import Profile from "@/components/Profile.vue";
  export default{
    components: {
        AppHeaderVue,
        AppFooterVue,
        Profile, 
    }
  }
</script>
<style scoped>
.info{
  left: auto;
  right: auto;
  padding-left: 420px;
}
</style>