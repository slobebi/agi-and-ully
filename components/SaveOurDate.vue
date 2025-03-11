<script setup lang="ts">
const targetElement = useTemplateRef<HTMLDivElement>('target');
const { isInViewport, observeElement } = useInViewport();

onMounted(() => {
  if (targetElement.value) observeElement(targetElement.value);
});
const mapLink = 'https://maps.app.goo.gl/LfotKX4BjJeKCmjb6'
</script>
<template>
  <div class="w-full h-screen bg-black text-white cover">
    <div ref="target"
      class="flex flex-col justify-center items-center h-full px-10 py-20 animated-text gap-6 text-center text-base"
      :class="{ 'animate': isInViewport }">
      <img src="~/assets/img/LOGO_white-02.svg" class="w-20 h-20" alt="">
      <div class="font-aperto text-lg">
        Save Our Date
      </div>
      <div class="font-bold text-3xl font-vogue">
        Saturday <br> 5 April 2025
      </div>
      <div class="font-semibold text-base font-vogue">
        Akad <br> 07.00 AM - 09.00 AM
      </div>
      <div class="font-semibold text-base font-vogue">
        Wedding Reception <br> 11.00 AM - 16.00 PM
      </div>
      <div class="font-light text-sm font-vogue">
        Henni Adli Minangkabau Handycraft Village <br> Jl. Raya Air Dingin, Balai Gadang, Kec. Koto Tangah, Kota Padang,
        Sumatera Barat 25177
      </div>
      <a :href="mapLink" target="_blank"
        class="uppercase bg-[#2f3330] hover:bg-white hover:text-black text-sm transition-all px-4 py-2">google maps</a>
    </div>
  </div>
</template>

<style scoped>
.cover {
  background-image:
    radial-gradient(transparent 0, transparent 40%, #2f3330 100%),
    url('~/assets/img/halaman_save_our_date.JPG');
  background-size: cover;
  background-position: center center;
}
</style>
