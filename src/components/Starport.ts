import { isObject } from '@vueuse/core'
import { isVNode } from 'vue'
import { proxyProps } from '../options'
import { StarportProxy } from './StarportProxy'

export const Starport = defineComponent({
  name: 'Starport',
  inheritAttrs: true,
  props: proxyProps,
  setup(props, ctx) {
    const isMounted = ref(false)

    onMounted(() => {
      isMounted.value = true
    })

    return () => {
      const slots = ctx.slots.default?.()

      if (!slots)
        throw new Error('[Vue Starport] Slot is required to use <Starport>')
      if (slots.length !== 1)
        throw new Error(`[Vue Starport] <Starport> requires exactly one slot, but got ${slots.length}`)

      const slot = slots[0]
      let component = slot.type as any

      if (!isObject(component) || isVNode(component)) {
        component = {
          render() {
            return slots
          },
        }
      }

      return h(StarportProxy, {
        ...props,
        key: props.port,
        component: markRaw(component),
        props: slot.props,
      })
    }
  },
})
