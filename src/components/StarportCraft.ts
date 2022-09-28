import type { StyleValue } from 'vue'
import { Teleport } from 'vue'
import { InjectionState } from '../constants'

export const StarportCraft = defineComponent({
  name: 'StarportCraft',
  props: {
    port: {
      type: String,
      required: true,
    },
    component: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()
    const state = inject(InjectionState)!
    const sp = computed(() => state.getInstance(props.port, props.component))

    const style = computed<StyleValue>((): StyleValue => {
      const rect = sp.value.rect
      const style: StyleValue = {
        position: 'fixed',
        top: `${rect?.top}px`,
        left: `${rect?.left}px`,
        width: `${rect.width ?? 0}px`,
        height: `${rect.height ?? 0}px`,
      }
      if (!sp.value.isVisible || !sp.value.el) {
        return {
          ...style,
          display: 'none',
        }
      }

      if (sp.value.isLanded)
        style.pointerEvents = 'none'
      else
        style.transition = `all ${sp.value.options.duration}ms ease-in-out`
      return style
    })

    const cleanRouterGuard = router.beforeEach(async () => {
      await sp.value.liftOff()
      await nextTick()
    })

    onBeforeUnmount(cleanRouterGuard)

    return () => {
      const comp = h(sp.value.component as any, {
        ...sp.value.props,
        ...sp.value.attrs,
      })
      return h(
        'div',
        {
          style: style.value,
          class: 'starport-craft',
          onTransitionend: async () => {
            await nextTick()
            sp.value.land()
          },
        },
        h(Teleport, {
          to: sp.value.isLanded
            ? `#${sp.value.id}`
            : 'body',
          disabled: !sp.value.isLanded,
        },
        comp,
        ),
      )
    }
  },
})
