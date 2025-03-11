<script setup lang="ts">
const targetElement = useTemplateRef<HTMLDivElement>('target');
const { isInViewport, observeElement } = useInViewport();

onMounted(() => {
  if (targetElement.value) observeElement(targetElement.value);
});

</script>
<template>
  <div class="w-full h-screen bg-black text-white cover">
    <div ref="target" class="flex flex-col justify-end items-end h-full p-10 pb-20 animated-text"
      :class="{ 'animate': isInViewport }">
      <div class="font-light uppercase mb-4 text-end">
        The Groom
      </div>
      <div class="font-bold text-4xl uppercase mb-4 text-end">
        Abdul Aziz Alghifari
      </div>
      <div class="font-light uppercase mb-2 text-end">
        The fourth child of
      </div>
      <div class="font-light uppercase mb-1 text-end">
        Dr. Zulfi
      </div>
      <div class="font-light uppercase text-end">
        Erma Lismawati
      </div>
    </div>
  </div>
</template>

<style scoped>
.cover {
  background-image:
    radial-gradient(transparent 0, transparent 40%, #2f3330 100%),
    url('~/assets/img/halaman_groom.JPG');
  background-size: cover;
  background-position: center center;
}
</style>
