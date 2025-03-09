// composables/useInViewport.ts
export function useInViewport() {
  const isInViewport: Ref<boolean> = ref(false);
  let observer: IntersectionObserver | null = null;

  const observeElement = (element: HTMLElement) => {
    // Skip on server side
    if (typeof window === 'undefined') return;

    if (observer) observer.disconnect();

    observer = new IntersectionObserver(
      ([entry]) => {
        isInViewport.value = entry.isIntersecting;
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    observer.observe(element);
  };

  onUnmounted(() => observer?.disconnect());

  return { isInViewport, observeElement };
}
