<script setup lang="ts">
const targetElement = useTemplateRef<HTMLDivElement>('target');
const { isInViewport, observeElement } = useInViewport();

onMounted(() => {
  if (targetElement.value) observeElement(targetElement.value);
});

defineProps<{
  guestName: string | undefined
}>()
const emit = defineEmits<{
  (e: 'open'): void
}>()

const isOpened = ref(false)
const handleOpen = () => {
  isOpened.value = true
  emit('open')
}

</script>

<template>
  <div class="w-full h-screen bg-black text-white cover p-10">
    <div ref="target" class="flex flex-col justify-between items-center h-full pt-16 pb-20 animated-text"
      :class="{ 'animate': isInViewport }">
      <div class="flex flex-col justify-start items-center gap-[10px]">
        <div class="font-light uppercase">
          The wedding of
        </div>
        <div class="font-bold text-4xl">
          ULLY & ALGHI
        </div>
        <div class="font-light">
          SATURDAY, 5 APRIL 2025
        </div>
      </div>
      <div v-if="!isOpened" class="flex flex-col justify-center items-center gap-3">
        <div class="font-light">
          To,
        </div>
        <div v-if="guestName" class="font-bold text-4xl">
          {{ guestName }}
        </div>
        <div class="font-light text-xs text-center mb-5">
          We sincerely apologize if there are any errors in the writing of names or titles.
        </div>
        <button @click="handleOpen"
          class="uppercase text-sm bg-[#2f3330] hover:bg-white hover:text-black transition-all duration-1000 px-3 py-2">
          Open Invitation
        </button>
      </div>
      <div v-else class="flex flex-col justify-center items-center gap-4">
        <div class="animate-bounce">
          <img src="~/assets/icon/chevron_right.svg" class="rotate-90 w-[32px]" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cover {
  background-image:
    radial-gradient(transparent 0, transparent 40%, #2f3330 100%),
    url('~/assets/img/DSCF98782.JPG');
  background-size: cover;
  background-position: center center;
}
</style>
