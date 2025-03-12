<script setup lang="ts">
import type GalleryShowCase from './GalleryShowCase.vue';


const targetElement = useTemplateRef<HTMLDivElement>('target');
const { isInViewport, observeElement } = useInViewport();

const glob = import.meta.glob<{ default: string }>('~/assets/img/gallery_*.jpg', { eager: true })
const images = Object.entries(glob).map(([_, value]) => value.default)

onMounted(() => {
  if (targetElement.value) observeElement(targetElement.value);
});

const galleryShowCase = ref<InstanceType<typeof GalleryShowCase> | null>(null);

const isOpenGallery = ref(false)
const indexToScroll = ref(1)
const setIsOpenGallery = (value: boolean, index = 0) => {
  isOpenGallery.value = value
  indexToScroll.value = index
  nextTick(() => {
    if (galleryShowCase.value) {
      galleryShowCase.value.scroller(indexToScroll.value);
    }
  });
}


</script>

<template>
  <div class="w-full h-screen bg-black text-white cover">
    <div ref="target" class="flex flex-col justify-start items-center h-full p-10 pt-20 animated-text gap-8"
      :class="{ 'animate': isInViewport }">
      <div class="font-bold text-4xl uppercase font-aperto">
        Our Gallery
      </div>

      <div class="w-full grid grid-cols-3 gap-4">
        <div v-for="(url, index) in images" class="justify-self-center w-full aspect-[2/3] relative max-w-[112px]">
          <img :key="index" :src="url" alt="" class="w-full h-full object-cover absolute top-0 left-0"
            @click="setIsOpenGallery(true, index)">
        </div>
      </div>
    </div>
    <GalleryShowCase ref="galleryShowCase" @close="isOpenGallery = false" :is-open-gallery="isOpenGallery"
      :index-to-scroll="indexToScroll" />
  </div>
</template>

<style scoped>
.cover {
  background-image:
    radial-gradient(transparent 0, transparent 40%, #2f3330 100%),
    url('~/assets/img/background-gallery.jpg');
  background-size: cover;
  background-position: center bottom;
}
</style>
