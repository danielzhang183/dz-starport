import { InjectionOptions, InjectionState } from '../constants'
import { createInternalState } from '../state'
import { StarportCraft } from './StarportCraft'

export const StarportCarrier = defineComponent({
  name: 'StarportCarrier',
  setup(_, { slots }) {
    const state = createInternalState(inject(InjectionOptions, {}))
    const app = getCurrentInstance()!.appContext.app
    app.provide(InjectionState, state)

    return () => ([
      slots.default?.(),
      Array.from(state.portMap.entries())
        .map(([port, { component }]) => h(
          StarportCraft,
          { key: port, port, component },
        )),
    ])
  },
})
