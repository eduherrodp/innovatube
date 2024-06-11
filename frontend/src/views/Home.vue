<template>
  <div class="home">
    <Presentation />
    <Features />
    <AboutUs />
  </div>
</template>

<script>
import Presentation from '@/components/Presentation.vue';
import Features from '@/components/Features.vue';
import AboutUs from '@/components/AboutUs.vue';

export default {
  components: {
    Presentation,
    Features,
    AboutUs
  }
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}
</style>