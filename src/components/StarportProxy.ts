import { InjectionState } from '../constants'
import { proxyProps } from '../options'

export const StarportProxy = defineComponent({
  name: 'StarportProxy',
  props: {
    props: {
      type: Object,
      default: () => {},
    },
    component: {
      type: Object,
      required: true,
    },
    ...proxyProps,
  },
  setup(props, ctx) {
    const state = inject(InjectionState)!
    const sp = computed(() => state.getInstance(props.port, props.component))
    const el = sp.value.elRef()

    if (!sp.value.isVisible)
      sp.value.land()

    onBeforeUnmount(() => {
      sp.value.rect.update()
      sp.value.liftOff()
    })

    // sp.value.attrs = props.attrs
    sp.value.props = props.props

    return () => h(
      'div',
      {
        ref: el,
        id: sp.value.id,
        class: 'starport-proxy',
      },
      ctx.slots.default
        ? h(ctx.slots.default)
        : undefined,
    )
  },
})
