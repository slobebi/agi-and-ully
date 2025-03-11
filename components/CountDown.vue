<script setup lang="ts">
import type { FileDownloadOptions } from '~/types/download';

const targetElement = useTemplateRef<HTMLDivElement>('target');
const { isInViewport, observeElement } = useInViewport();

onMounted(() => {
  if (targetElement.value) observeElement(targetElement.value);
});

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const targetDate = new Date('2025-04-05T07:00:00');
const timeLeft = reactive<TimeLeft>({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
});
const timer = ref<any>(null);

const updateTimeLeft = () => {
  const now = Date.now();
  const difference = targetDate.getTime() - now;

  if (difference > 0) {
    timeLeft.days = Math.floor(difference / (1000 * 60 * 60 * 24));
    timeLeft.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    timeLeft.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    timeLeft.seconds = Math.floor((difference % (1000 * 60)) / 1000);
    timeLeft.milliseconds = Math.floor(difference % 1000);
  } else {
    Object.assign(timeLeft, {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    if (timer.value) clearInterval(timer.value);
  }
};

const padZero = (value: number): string => {
  return value.toString().padStart(2, '0');
};

onMounted(() => {
  updateTimeLeft();
  timer.value = setInterval(updateTimeLeft, 1000);
});

onBeforeUnmount(() => {
  if (timer.value) clearInterval(timer.value);
});

const downloadFile = (options: FileDownloadOptions) => {
  try {
    const link = document.createElement('a');
    link.href = options.path;
    link.download = options.name || options.path.split('/').pop() || 'file';
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Download failed:', error);
  }
};
</script>
<template>
  <div class="w-full h-screen bg-black text-white cover">
    <div ref="target" class="flex flex-col justify-end items-center h-full pb-44 animated-text gap-8"
      :class="{ 'animate': isInViewport }">
      <div class="font-bold text-4xl font-aperto">
        COUNT DOWN
      </div>
      <div class="flex gap-4 justify-center p-4 font-vogue">
        <div class="text-center p-2">
          <div class="text-4xl font-bold">{{ padZero(timeLeft.days) }}</div>
          <div class="text-sm uppercase mt-2">Hari</div>
        </div>
        <div class="text-center p-2">
          <div class="text-4xl font-bold">{{ padZero(timeLeft.hours) }}</div>
          <div class="text-sm uppercase mt-2">Jam</div>
        </div>
        <div class="text-center p-2">
          <div class="text-4xl font-bold">{{ padZero(timeLeft.minutes) }}</div>
          <div class="text-sm uppercase mt-2">Menit</div>
        </div>
        <div class="text-center p-2">
          <div class="text-4xl font-bold">{{ padZero(timeLeft.seconds) }}</div>
          <div class="text-sm uppercase mt-2">Detik</div>
        </div>
      </div>
      <button
        @click="downloadFile({ path: '/files/event-to-save-in-my-calendar.ics', name: 'the-wedding-of-ully-and-agi' })"
        class="flex items-center justify-center gap-2 uppercase bg-[#2f3330] hover:bg-white hover:text-black text-sm transition-all px-4 py-2">save
        the date
        <span>
          <img src="~/assets/icon/chevron_right.svg" class="" alt="">
        </span></button>
    </div>
  </div>
</template>

<style scoped>
.cover {
  background-image:
    radial-gradient(transparent 0, transparent 40%, #2f3330 100%),
    url('~/assets/img/halaman_hitung_mundur.JPG');
  background-size: cover;
  background-position: center bottom;
}
</style>
