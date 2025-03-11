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
      <div class="font-bold text-4xl uppercase mb-4 font-aperto">
        Thank You
      </div>
      <div class="font-light mb-8 text-sm font-vogue">
        It is an honor and a joy for us if you would kindly attend and bestow your blessings upon us.
      </div>
      <div class="font-bold text-3xl mb-4 font-holimount">
        Ully & Alghi
      </div>
      <div class="font-light text-[9px] uppercase mb-20 font-vogue">
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
