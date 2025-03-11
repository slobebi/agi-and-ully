<script setup lang="ts">
const targetElement = useTemplateRef<HTMLDivElement>('target');
const { isInViewport, observeElement } = useInViewport();

onMounted(() => {
  if (targetElement.value) observeElement(targetElement.value);
});

</script>
<template>
  <div class="w-full h-screen bg-black text-white cover">
    <div ref="target" class="flex flex-col justify-end items-center h-full p-10 animated-text text-center"
      :class="{ 'animate': isInViewport }">
      <img src="~/assets/img/LOGO_white-02.svg" class="w-20 h-20 mb-50" alt="">
      <div class="font-bold text-4xl uppercase mb-4">
        Terima Kasih
      </div>
      <div class="font-light mb-8 text-sm">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan
        doa restu kepada kami.
      </div>
      <div class="font-bold text-xl uppercase mb-4">
        Ully & Alghi
      </div>
      <div class="font-light text-[8px] uppercase mb-20">
        Created by Abdul Aziz Alghifari
      </div>
    </div>
  </div>
</template>

<style scoped>
.cover {
  background-image:
    radial-gradient(transparent 0, transparent 40%, #2f3330 100%),
    url('~/assets/img/halaman_terima_kasih.JPG');
  background-size: cover;
  background-position: center bottom;
}
</style>
