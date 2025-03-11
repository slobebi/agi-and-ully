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
      <div class="font-light uppercase mb-4 text-end font-aperto text-lg">
        The Groom
      </div>
      <div class="font-bold text-4xl uppercase mb-4 text-end font-vogue">
        Abdul Aziz Alghifari
      </div>
      <div class="font-light text-4xl mb-2 text-end font-photograph tracking-wide">
        The fourth child of
      </div>
      <div class="font-light mb-1 text-end font-vogue">
        Mr. Dr. Zulfi
      </div>
      <div class="font-light text-end font-vogue">
        and Mrs. Erma Lismawati
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
