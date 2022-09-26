import { h } from 'vue'
import type { Component, StyleValue } from 'vue'

export function createFloating<T extends Component>(component: T) {
  const metadata = reactive<any>({
    props: {},
    attrs: {},
  })

  const proxyEl = ref<HTMLElement | null>()

  const container = defineComponent({
    setup() {
      let rect = $ref<DOMRect | undefined>()

      const style = computed<StyleValue>((): StyleValue => {
        const fixed: StyleValue = {
          transition: 'all .5s ease-in-out',
          position: 'fixed',
        }

        if (!rect || !proxyEl.value) {
          return {
            ...fixed,
            opacity: 0,
            transform: 'translateY(-100px)',
            pointerEvents: 'none',
          }
        }
        return {
          ...fixed,
          top: `${rect?.top}px`,
          left: `${rect?.left}px`,
        }
      })

      function update() {
        rect = proxyEl.value?.getBoundingClientRect()
      }

      useEventListener('resize', update)
      watchEffect(update)

      return () => h('div', { style: style.value }, [
        h(component, metadata.attrs),
      ])
    },
  })

  const proxy = defineComponent({
    setup(props, ctx) {
      const attrs = useAttrs()
      const el = ref<HTMLElement>()

      metadata.props = props
      metadata.attrs = attrs

      onMounted(() => {
        proxyEl.value = el.value
      })

      return () => h('div', { ref: el }, [
        ctx.slots.default
          ? h(ctx.slots.default)
          : null,
      ])
    },
  })

  return {
    proxy,
    container,
  }
}
