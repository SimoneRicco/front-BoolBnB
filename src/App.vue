<script>
import Footer from "./components/partials/Footer.vue";
import Header from "./components/partials/Header.vue";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<template>
  <div class="template font-mono page-container">
    <div id="content-wrap">
      <Header />
      <main>
        <router-view></router-view>
      </main>
    </div>
    <Footer />
  </div>
  
</template>

<style></style>
