<script setup lang="ts">
const targetElement = useTemplateRef<HTMLDivElement>('target');
const { isInViewport, observeElement } = useInViewport();

onMounted(() => {
  if (targetElement.value) observeElement(targetElement.value);
});
</script>
<template>
  <div class="w-full h-screen bg-black text-white">
    <div ref="target" class="flex flex-col justify-start items-center h-full pt-20 animated-text gap-8"
      :class="{ 'animate': isInViewport }">
      <div class="font-light">
        PERNIKAHAN
      </div>
      <div class="font-bold text-4xl">
        ULLY & ALGHI
      </div>
      <div class="font-light">
        SABTU, 5 APRIL 2025
      </div>
    </div>
  </div>
</template>
