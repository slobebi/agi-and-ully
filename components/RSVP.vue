<script setup lang="ts">

interface RSVPForm {
  name: string
  attendance: number
  guestCount: number
  wish: string
}

const targetElement = useTemplateRef<HTMLDivElement>('target');
const { isInViewport, observeElement } = useInViewport();

onMounted(() => {
  if (targetElement.value) observeElement(targetElement.value);
});

const rsvpForm = ref<RSVPForm>({
  name: "",
  attendance: -1,
  guestCount: 0,
  wish: ""
})

const errorForm = ref<Record<string, string>>({})

const clearErrorAsInput = (key: string) => {
  errorForm.value[key] = ''
}

const validateForm = () => {
  if (!rsvpForm.value.name) {
    errorForm.value['name'] = 'Mohon mengisi nama'
  }
  if (rsvpForm.value.attendance == -1) {
    errorForm.value['attendance'] = 'Mohon konfirmasi kehadiran anda'
  }
  if (rsvpForm.value.guestCount == 0) {
    errorForm.value['guestCount'] = 'Mohon memilih jumlah tamu'
  }
  if (rsvpForm.value.wish.length < 2) {
    errorForm.value['wish'] = 'Minimal 2 karakter'
  }
}

const submitForm = () => {
  validateForm()
}

</script>
<template>
  <div class="w-full h-screen bg-black text-black py-20 px-10">
    <div ref="target" class="flex flex-col justify-start items-start p-5 animated-text gap-4 bg-white"
      :class="{ 'animate': isInViewport }">
      <div class="font-semibold uppercase">
        RSVP - UCAPAN & DOA
      </div>
      <div class="font-light text-sm">
        Mohon doa & restu dari Bapak/Ibu/Saudara/i untuk kelancaran acara kami, serta konfirmasi kehadiran menggunakan
        fitur di bawah ini,
      </div>
      <div class="w-full text-sm">
        <label for="name" class="block mb-1">Nama</label>
        <div v-if="errorForm['name']" class="text-red-700">{{ errorForm['name'] }}</div>
        <input @input="clearErrorAsInput('name')" v-model="rsvpForm.name" id="name" type="text"
          class="w-full bg-transparent focus:outline-none border-b-[1px] p-2" />
      </div>
      <div class="w-full text-sm">
        <label for="attendance" class="block mb-1">Kehadiran</label>
        <div v-if="errorForm['attendance']" class="text-red-700">{{ errorForm['attendance'] }}</div>
        <select @input="clearErrorAsInput('attendance')" v-model="rsvpForm.attendance" id="attendance" type="text"
          class="w-full bg-transparent focus:outline-none border-b-[1px] p-2">
          <option selected></option>
          <option :value="0">Hadir</option>
          <option :value="1">Tidak Hadir</option>
        </select>
      </div>
      <div class="w-full text-sm">
        <label for="guestCount" class="block mb-1">Jumlah Tamu</label>
        <div v-if="errorForm['guestCount']" class="text-red-700">{{ errorForm['guestCount'] }}</div>
        <select @input="clearErrorAsInput('guestCount')" v-model="rsvpForm.guestCount" id="guestCount" type="text"
          class="w-full bg-transparent focus:outline-none border-b-[1px] p-2">
          <option selected></option>
          <option :value="1">1</option>
          <option :value="2">2</option>
        </select>
      </div>
      <div class="w-full text-sm">
        <label for="wish" class="block mb-1">Ucapan</label>
        <div v-if="errorForm['wish']" class="text-red-700">{{ errorForm['wish'] }}</div>
        <textarea @input="clearErrorAsInput('wish')" v-model="rsvpForm.wish" id="wish" type="text"
          class="w-full bg-transparent focus:outline-none border-b-[1px] p-2"></textarea>
      </div>
      <div class="flex gap-4 justify-start items-center text-sm">
        <button @click="submitForm()"
          class="bg-black text-white px-4 py-2 hover:bg-blue-400 transition-all">Submit</button>
        <button class="text-black px-4 py-2 underline">Show Wishes</button>
      </div>
    </div>
  </div>
</template>
