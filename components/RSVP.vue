<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import type { Database } from '~/types/database.types'

interface RSVPForm {
  name: string
  attendance: number
  guestCount: number
  wish: string
}

class RSVPData {
  id = 0
  created_at = new Date()
  name = ''
  attendance = false
  guest_count = 0
  wish: string | null = ''

  constructor(init: Partial<RSVPData>) {
    Object.assign(this, init)
  }
}

const client = useSupabaseClient<Database>()

const targetElement = useTemplateRef<HTMLDivElement>('target');
const { isInViewport, observeElement } = useInViewport();

const { data: rsvps } = await useAsyncData('rsvp', async () => {
  const { data } = await client.from('rsvp').select('*').order('created_at', { ascending: false })

  return data

})

const timeAgo = (val: string) => {
  return useTimeAgo(new Date(val))
}

const isOpenWish = ref(false)
const setIsOpenWish = async (value: boolean) => {
  if (value) {
    const { data } = await client.from('rsvp').select('*').order('created_at', { ascending: false })
    rsvps.value = data
  }

  isOpenWish.value = value
}

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
  delete errorForm.value[key]
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

const isInProgress = ref(false)
const isDone = ref(false)

const submitForm = async () => {
  isInProgress.value = true
  validateForm()

  if (Object.keys(errorForm.value).length == 0) {
    const { error } = await client.from('rsvp').insert({
      attendance: !!rsvpForm.value.attendance,
      name: rsvpForm.value.name,
      guest_count: rsvpForm.value.guestCount,
      wish: rsvpForm.value.wish
    })

    const { data } = await client.from('rsvp').select('*').order('created_at', { ascending: false })
    if (data) {
      rsvps.value = data
    }

    if (!error) {
      isDone.value = true
    } else {
      alert('Gagal input data')
    }
  }
  isInProgress.value = false
}

</script>
<template>
  <div class="w-full h-screen bg-black text-black py-20 px-10 cover">
    <div ref="target" class="flex flex-col justify-start items-start p-5 animated-text gap-4 bg-white"
      :class="{ 'animate': isInViewport }">
      <div class="font-semibold text-xl uppercase font-aperto">
        RSVP - Prayers & blessings
      </div>
      <div class="font-light text-sm font-vogue">
        We kindly request your prayers and blessings for the smooth running of our event. Please also confirm your
        attendance using the feature provided below,
      </div>
      <div class="w-full text-sm font-vogue">
        <label for="name" class="block mb-1">Name</label>
        <div v-if="errorForm['name']" class="text-red-700">{{ errorForm['name'] }}</div>
        <input @input="clearErrorAsInput('name')" v-model="rsvpForm.name" id="name" type="text"
          class="w-full bg-transparent focus:outline-none border-b-[1px] p-2" />
      </div>
      <div class="w-full text-sm font-vogue">
        <label for="attendance" class="block mb-1">Attendance</label>
        <div v-if="errorForm['attendance']" class="text-red-700">{{ errorForm['attendance'] }}</div>
        <select @change="clearErrorAsInput('attendance')" v-model="rsvpForm.attendance" id="attendance" type="text"
          class="w-full bg-transparent focus:outline-none border-b-[1px] p-2">
          <option selected></option>
          <option :value="0">Hadir</option>
          <option :value="1">Tidak Hadir</option>
        </select>
      </div>
      <div class="w-full text-sm font-vogue">
        <label for="guestCount" class="block mb-1">No of Guest (Max 2)</label>
        <div v-if="errorForm['guestCount']" class="text-red-700">{{ errorForm['guestCount'] }}</div>
        <select @change="clearErrorAsInput('guestCount')" v-model="rsvpForm.guestCount" id="guestCount" type="text"
          class="w-full bg-transparent focus:outline-none border-b-[1px] p-2">
          <option selected></option>
          <option :value="1">1</option>
          <option :value="2">2</option>
        </select>
      </div>
      <div class="w-full text-sm font-vogue">
        <label for="wish" class="block mb-1">Wishes</label>
        <div v-if="errorForm['wish']" class="text-red-700">{{ errorForm['wish'] }}</div>
        <textarea @input="clearErrorAsInput('wish')" v-model="rsvpForm.wish" id="wish" type="text"
          class="w-full bg-transparent focus:outline-none border-b-[1px] p-2"></textarea>
      </div>
      <div class="flex gap-4 justify-start items-center text-sm">
        <button @click="submitForm()"
          class="bg-black text-white px-4 py-2 hover:bg-gray-400 transition-all">Submit</button>
        <button @click="setIsOpenWish(true)" class="text-black px-4 py-2 underline">Show Wishes</button>
        <img v-if="isInProgress" class="animate-spin" src="~/assets/icon/progress_activity.svg" alt="">
        <div v-if="isDone" class="text-sm text-green-600">Success</div>
      </div>
    </div>
    <TransitionRoot appear :show="isOpenWish" as="template">
      <Dialog as="div" @close="setIsOpenWish(false)" class="relative z-10">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
          leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel
                class="w-full max-w-sm transform max-h-[80vh] overflow-y-scroll relative bg-white px-6 text-left align-middle shadow-xl transition-all">
                <div class="sticky top-0 bg-white">
                  <DialogTitle as="h3" class=" text-lg font-medium leading-6 text-gray-900 py-4 font-aperto">
                    Wishes
                  </DialogTitle>
                  <hr class="h-0.5 border-t-0 bg-black" />
                </div>

                <div class="mt-2 font-vogue">
                  <template v-for="(rsvp, index) in rsvps" :key="index">
                    <div class="flex gap-1 justify-start items-center mb-2">
                      <div class="text-sm text-black">{{ rsvp.name }}</div>
                      <div class="text-sm text-gray-500">{{ timeAgo(rsvp.created_at) }}</div>
                    </div>
                    <div class="text-sm text-gray-500">{{ rsvp.wish }}</div>
                    <hr class="my-3 h-[1px] border-t-0 bg-black" />
                  </template>
                </div>

                <div class="sticky bottom-0 bg-white py-4 flex justify-center items-center">
                  <button type="button"
                    class="w-full inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="setIsOpenWish(false)">
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<style scoped>
.cover {
  background-image:
    radial-gradient(transparent 0, transparent 40%, #2f3330 100%),
    url('~/assets/img/halaman_rsvp.JPG');
  background-size: cover;
  background-position: center bottom;
}

.animated-text {
  opacity: 0;
  transform: translateY(10px);
  transition: all 1s ease-in;
}

.animated-text.animate {
  opacity: 0.8;
  transform: translateY(0);
}
</style>
