<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
};
</script>

<template>
  <div id="app">
    <!-- <AppHeader /> -->

      <router-view />

  </div>
</template>

<style>
.page {
  max-width: 600px;
  margin: auto;
}

.login_page,
.register_page {
  max-width: 400px;
  margin: 0 auto;
}
</style>
