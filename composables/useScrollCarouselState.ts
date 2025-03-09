import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useElementApi } from "@baleada/vue-features"

export function useScrollCarouselState() {
  const container = useElementApi()
  const slides = useElementApi({ kind: 'list' })

  const indexOfVisible = ref(0)

  function previous() {
    if (indexOfVisible.value === 0) return
    indexOfVisible.value--

    slides.elements.value[indexOfVisible.value]
      .scrollIntoView({ behavior: 'smooth' })
  }

  function next() {
    if (indexOfVisible.value === slides.elements.value.length - 1) return
    indexOfVisible.value++

    slides.elements.value[indexOfVisible.value]
      .scrollIntoView({ behavior: 'smooth' })
  }

  let observer: IntersectionObserver

  onMounted(() => {
    observer = new IntersectionObserver(entries => {
      const { target } = entries[0]

      const indexOfTarget = slides.elements.value.findIndex(el =>
        el.isSameNode(target)
      ) || 0

      indexOfVisible.value = indexOfTarget
    }, {
      threshold: 1,
      root: container.element.value
    })

    for (const slide of slides.elements.value) {
      observer.observe(slide)
    }
  })

  onBeforeUnmount(() => {
    observer.disconnect()
  })

  return {
    container,
    slides,
    previous,
    next,
    indexOfVisible,
  }
}
