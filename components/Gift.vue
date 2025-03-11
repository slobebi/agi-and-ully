<script setup lang="ts">
const targetElement = useTemplateRef<HTMLDivElement>('target');
const { isInViewport, observeElement } = useInViewport();

onMounted(() => {
  if (targetElement.value) observeElement(targetElement.value);
});

const source = '1110011200504'
const { text, copy, copied, isSupported } = useClipboard({ source })

</script>
<template>
  <div class="w-full h-screen bg-black text-white cover">
    <div ref="target" class="flex flex-col justify-end items-start h-full p-10 pb-20 animated-text"
      :class="{ 'animate': isInViewport }">
      <div class="font-bold text-4xl uppercase mb-4">
        Tanda Kasih
      </div>
      <div class="font-light mb-8 text-sm">
        Doa restu yang kami terima sangat berarti, namun jika memberi merupakan tanda kasih, tentunya semakin melengkapi
        kebahagiaan kami.
      </div>
      <div class="flex justify-between items-center w-full">
        <div class="font-light text-sm">
          Mandiri <br>
          1110011200504 <br>
          An. Faizatul Ulya Gunawan
        </div>
        <button @click="copy(source)"
          class="bg-[#2f3330] hover:bg-white hover:text-black transition-all duration-1000 p-2 rounded-full">
          <img v-if="!copied" src="~/assets/icon/content_copy.svg" alt="">
          <img v-else src="~/assets/icon/check.svg" alt="">
        </button>
      </div>
      <hr class="my-2 h-[1px] border-t-0 bg-white w-full" />
    </div>
  </div>
</template>

<style scoped>
.cover {
  background-image:
    radial-gradient(transparent 0, transparent 40%, #2f3330 100%),
    url('~/assets/img/halaman_tanda_kasih.JPG');
  background-size: cover;
  background-position: center center;
}
</style>
