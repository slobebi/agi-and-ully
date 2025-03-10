<script setup lang="ts">
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
</script>
<template>
  <div class="w-full h-screen bg-black text-white">
    <div ref="target" class="flex flex-col justify-end items-center h-full pb-44 animated-text gap-8"
      :class="{ 'animate': isInViewport }">
      <div class="font-bold text-4xl">
        HITUNG MUNDUR
      </div>
      <div class="flex gap-4 justify-center p-4 font-sans">
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
    </div>
  </div>
</template>
