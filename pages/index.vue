<script setup lang="ts">
const router = useRoute()
const guestName = router.query.to?.toString()
const isAbleScroll = ref(false)
</script>

<template>
  <div class="snap-y snap-mandatory h-screen min-md:max-w-md max-md:w-full mx-auto overscroll-x-none"
    :class="[isAbleScroll ? 'overflow-y-scroll' : 'overflow-hidden']">
    <Cover :guest-name="guestName" @open="isAbleScroll = true" class="snap-center snap-always" />
    <QS class="snap-center snap-always" />
    <BrideGroom class="snap-center snap-always" father="Ayah Ully" mother="Ibu Ully" name="Faizatul Ulya Gunawan"
      nth-child="kedua" title="Mempelai Wanita" />
    <BrideGroom class="snap-center snap-always" father="Ayah Agi" mother="Ibu Agi" name="Abdul Aziz Alghifari"
      nth-child="keempat" title="Mempelai Pria" />
    <SaveOurDate class="snap-center snap-always" />
    <CountDown class="snap-center snap-always" />
    <RSVP class="snap-center snap-always" />
  </div>
</template>

<style lang="css">
.animated-text {
  opacity: 0;
  transform: translateY(10px);
  transition: all 1s ease-in;
}

.animated-text.animate {
  opacity: 1;
  transform: translateY(0);
}
</style>
