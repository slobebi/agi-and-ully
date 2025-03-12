<script setup lang="ts">
const router = useRoute()
const guestName = router.query.to?.toString()
const isAbleScroll = ref(false)
const isPlayedAudio = ref(false)

const audio = ref<HTMLAudioElement | null>()

onMounted(() => {
  audio.value = new Audio(new URL('~/assets/music/background_song.mp3', import.meta.url).href)
})

const handleOpen = () => {
  isAbleScroll.value = true
  handlePlay()
}

const handlePlay = () => {
  if (audio.value) {
    isPlayedAudio.value = true
    audio.value.loop = true
    audio.value.play()
  }
}

const handlePause = () => {
  if (audio.value) {
    isPlayedAudio.value = false
    audio.value.pause()
  }
}

</script>

<template>
  <div class="snap-y snap-mandatory h-screen min-md:max-w-md max-md:w-full mx-auto overscroll-x-none"
    :class="[isAbleScroll ? 'overflow-y-scroll' : 'overflow-hidden']">
    <Cover :guest-name="guestName" @open="handleOpen" class="snap-center snap-always" />
    <QS class="snap-start snap-always" />
    <Bride class="snap-end snap-always" />
    <Groom class="snap-end snap-always" />
    <SaveOurDate class="snap-center snap-always" />
    <CountDown class="snap-center snap-always" />
    <AttireGuide class="snap-center snap-always" />
    <RSVP class="snap-center snap-always" />
    <Gift class="snap-end snap-always" />
    <ThankYou class="snap-end snap-always" />
  </div>
  <template v-if="isAbleScroll">
    <img v-if="isPlayedAudio" src="~/assets/icon/pause.svg" alt="" class="fixed bottom-7 left-7"
      @click="handlePause()" />
    <img v-else src="~/assets/icon/play.svg" alt="" class="fixed bottom-7 left-7" @click="handlePlay()" />
  </template>
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
