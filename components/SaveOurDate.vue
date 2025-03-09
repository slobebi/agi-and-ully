<script setup lang="ts">
const targetElement = useTemplateRef<HTMLDivElement>('target');
const { isInViewport, observeElement } = useInViewport();

onMounted(() => {
  if (targetElement.value) observeElement(targetElement.value);
});
</script>
<template>
  <div class="w-full h-screen bg-black text-white">
    <div ref="target"
      class="flex flex-col justify-center items-center h-full px-10 pt-20 animated-text gap-8 text-center"
      :class="{ 'animate': isInViewport }">
      <div class="font-light">
        Save Our Date
      </div>
      <div class="font-bold text-4xl">
        Sabtu <br> 5 April 2025
      </div>
      <div class="font-semibold text-xl">
        Resepsi Pernikahan <br> 11.00 AM - 16.00 PM
      </div>
      <div class="font-light">
        Villa Henni Adli <br> Jl. Raya Air Dingin, Balai Gadang, Kec. Koto Tangah, Kota Padang, Sumatera Barat 25177
      </div>
    </div>
  </div>
</template>
