<script setup lang="ts">
const targetElement = useTemplateRef<HTMLDivElement>('target');
const { isInViewport, observeElement } = useInViewport();

onMounted(() => {
  if (targetElement.value) observeElement(targetElement.value);
});

const props = defineProps<{
  title: string
  name: string
  father: string
  mother: string
  nthChild: string
}>()
</script>
<template>
  <div class="w-full h-screen bg-black text-white">
    <div ref="target" class="flex flex-col justify-end items-start h-full p-10 pb-40 animated-text"
      :class="{ 'animate': isInViewport }">
      <div class="font-light uppercase mb-8">
        {{ title }}
      </div>
      <div class="font-bold text-4xl uppercase mb-2">
        {{ name }}
      </div>
      <div class="font-light uppercase mb-4">
        Anak {{ nthChild }} dari
      </div>
      <div class="font-light uppercase mb-1">
        {{ father }}
      </div>
      <div class="font-light uppercase">
        {{ mother }}
      </div>
    </div>
  </div>
</template>
