<script setup lang="ts">
const glob = import.meta.glob<{ default: string }>('~/assets/img/gallery_*.jpg', { eager: true })
const images = Object.entries(glob).map(([_, value]) => value.default)

const props = defineProps<{
  isOpenGallery: boolean
  indexToScroll: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const galleryRefs = ref<Record<number, HTMLImageElement>>({})

const scroller = (index: number) => {
  if (galleryRefs.value[index]) {
    galleryRefs.value[index].scrollIntoView({ behavior: 'smooth' })
  }
}

defineExpose({
  scroller,
})
</script>
<template>
  <div v-show="isOpenGallery" class="fixed inset-0 bg-black/25" />
  <div v-show="isOpenGallery" class="fixed inset-0 overflow-y-auto">
    <div class="flex min-h-full items-center justify-center p-4 text-center">
      <div class="w-full max-w-sm transform relative bg-white px-6 text-left align-middle shadow-xl transition-all">
        <div class="sticky left-0 bg-white">
          <h3 class=" text-lg font-medium leading-6 text-gray-900 py-4 font-aperto">
            Gallery
          </h3>
          <hr class="h-0.5 border-t-0 bg-black" />
        </div>

        <div class="mt-4 font-vogue flex gap-8 snap-x snap-mandatory overflow-x-scroll">
          <img :id="`gallery_${index}`" :ref="(el) => { galleryRefs[index] = el as HTMLImageElement }"
            v-for="(url, index) in images" :key="index" :src="url" alt="" class="snap-center snap-always">
        </div>

        <div class="sticky left-0 bg-white py-4 flex justify-center items-center">
          <button type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            @click="emit('close')">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
