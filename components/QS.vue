<script setup lang="ts">
const targetElement = useTemplateRef<HTMLDivElement>('target');
const { isInViewport, observeElement } = useInViewport();

onMounted(() => {
  if (targetElement.value) observeElement(targetElement.value);
});
</script>
<template>
  <div class="w-full h-screen bg-black text-white cover">
    <div ref="target" class="flex flex-col justify-start items-start h-full p-10 pt-20 animated-text gap-5 text-base"
      :class="{ 'animate': isInViewport }">
      <div class="font-bold text-4xl font-aperto">
        QS. AR-RUM: 21
      </div>
      <div class="font-light">
        وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ
        مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
      </div>

      <div class="font-light text-sm font-vogue">
        "And one of His signs is that He created for you spouses from among yourselves so that you may find comfort in
        them. And He has placed between you compassion and mercy. Surely in this are signs for people who reflect."
      </div>
      <div class="font-bold text-4xl font-signature">
        Ully & Alghi
      </div>
    </div>
  </div>
</template>

<style scoped>
.cover {
  background-image:
    radial-gradient(transparent 0, transparent 40%, #2f3330 100%),
    url('~/assets/img/halaman_2.JPG');
  background-size: cover;
  background-position: center center;
}
</style>
