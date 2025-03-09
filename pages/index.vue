<script setup lang="ts">

</script>

<template>
  <div class="snap-y snap-mandatory overflow-y-scroll h-screen max-w-md mx-auto">
    <Cover class="snap-center snap-always" />
    <QS class="snap-center snap-always" />
    <BrideGroom class="snap-center snap-always" father="Ayah Ully" mother="Ibu Ully" name="Faizatul Ulya Gunawan"
      nth-child="kedua" title="Mempelai Wanita" />
    <BrideGroom class="snap-center snap-always" father="Ayah Agi" mother="Ibu Agi" name="Abdul Aziz Alghifari"
      nth-child="keempat" title="Mempelai Pria" />
    <SaveOurDate class="snap-center snap-always" />
    <CountDown class="snap-center snap-always" />
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
