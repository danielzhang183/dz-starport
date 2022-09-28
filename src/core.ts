/* eslint-disable vue/one-component-per-file */
import { Teleport, computed, defineComponent, h, onBeforeUnmount, renderList } from 'vue'
import type { Component, StyleValue } from 'vue'
import { nanoid } from 'nanoid'
import type { ResolvedStarportOptions, StarportOptions } from './types'
import type { StarportContext } from './context'
import { createStarportContext } from './context'

export function createStarport<T extends Component>(
  component: T,
  options: StarportOptions = {},
) {
  const resolved: ResolvedStarportOptions = {
    duration: 800,
    landing: false,
    ...options,
  }
  const defaultId = nanoid()
  const counter = ref(0)
  const portMap = new Map<string, StarportContext>()

  function getContext(port = defaultId) {
    if (!portMap.get(port)) {
      counter.value++
      portMap.set(port, createStarportContext())
    }
    return portMap.get(port)!
  }

  const starcraft = defineComponent({
    name: 'StarCraft',
    props: {
      port: {
        type: String,
        default: defaultId,
      },
    },
    setup(props) {
      const router = useRouter()
      const context = computed(() => getContext(props.port))

      const style = computed<StyleValue>((): StyleValue => {
        const rect = context.value.rect
        const style: StyleValue = {
          position: 'fixed',
          top: `${rect?.top}px`,
          left: `${rect?.left}px`,
          width: `${rect.width ?? 0}px`,
          height: `${rect.height ?? 0}px`,
        }
        if (!context.value.isVisible || !context.value.el) {
          return {
            ...style,
            display: 'none',
          }
        }

        if (context.value.isLanded)
          style.pointerEvents = 'none'
        else
          style.transition = `all ${resolved.duration}ms ease-in-out`
        return style
      })

      const cleanRouterGuard = router.beforeEach(async () => {
        await context.value.liftOff()
        await nextTick()
      })

      onBeforeUnmount(cleanRouterGuard)

      return () => {
        const comp = h(component as any, {
          ...context.value.props,
          ...context.value.attrs,
        })
        return h(
          'div',
          {
            style: style.value,
            class: 'starport-craft',
            onTransitionend: async () => {
              await nextTick()
              context.value.land()
            },
          },
          h(Teleport, {
            to: context.value.isLanded
              ? `#${context.value.id}`
              : 'body',
            disabled: !context.value.isLanded,
          },
          comp,
          ),
        )
      }
    },
  })

  const starproxy = defineComponent({
    name: 'StarProxy',
    props: {
      port: {
        type: String,
        default: defaultId,
      },
      props: {
        type: Object,
        default: () => {},
      },
      attrs: {
        type: Object,
        default: () => {},
      },
    },
    setup(props, ctx) {
      const context = computed(() => getContext(props.port))
      const el = context.value.elRef()

      if (!context.value.isVisible)
        context.value.land()

      onBeforeUnmount(() => {
        context.value.rect.update()
        context.value.liftOff()
      })

      context.value.attrs = props.attrs
      context.value.props = props.props

      return () => h(
        'div',
        {
          ref: el,
          id: context.value.id,
          class: 'starport-proxy',
        },
        ctx.slots.default
          ? h(ctx.slots.default)
          : undefined,
      )
    },
  })

  const starcarrier = defineComponent({
    name: 'StarportCarrier',
    render() {
      // Workaround: force renderer
      // eslint-disable-next-line no-unused-expressions
      counter.value
      return renderList(
        Array.from(portMap.keys()),
        port => h(starcraft, {
          port,
          key: port,
        }),
      )
    },
  })

  return {
    starcarrier,
    starcraft,
    starproxy,
  }
}
