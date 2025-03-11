<script setup lang="ts">
const targetElement = useTemplateRef<HTMLDivElement>('target');
const { isInViewport, observeElement } = useInViewport();

onMounted(() => {
  if (targetElement.value) observeElement(targetElement.value);
});
</script>
<template>
  <div class="w-full h-screen bg-black text-white cover">
    <div ref="target"
      class="flex flex-col justify-center items-center h-full px-10 pt-20 animated-text gap-6 text-center"
      :class="{ 'animate': isInViewport }">
      <div class="font-semibold uppercase text-3xl">
        a guide to dress code
      </div>
      <div class="font-light">
        We kindly encourage our guest to wear these colors for our special day
      </div>
      <div class="flex gap-2 justify-center items-center">
        <div class="w-[40px] h-[40px] rounded-full bg-[#03311C]"></div>
        <div class="w-[40px] h-[40px] rounded-full bg-[#7E8C54]"></div>
        <div class="w-[40px] h-[40px] rounded-full bg-[#8F8673]"></div>
        <div class="w-[40px] h-[40px] rounded-full bg-[#7F5933]"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cover {
  background-image:
    radial-gradient(transparent 0, transparent 40%, #2f3330 100%),
    url('~/assets/img/attire_guide.JPG');
  background-size: cover;
  background-position: center center;
}
</style>
