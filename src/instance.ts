import { customAlphabet, nanoid } from 'nanoid'
import type { Component, Ref } from 'vue'
import { reactive, ref } from 'vue'
import { defaultOptions } from './options'
import type { ResolvedStarportOptions, StarportOptions } from './types'
import { getComponentName, kebabCase } from './utils'

const getId = customAlphabet('abcdefghijklmnopqrstuvwxyz', 10)

export function createStarportInstance(
  port: string,
  component: Component,
  inlineOptions: StarportOptions = {},
) {
  const componentName = getComponentName(component)
  const componentId = kebabCase(componentName) || nanoid()

  const el: Ref<HTMLElement | undefined> = ref()
  const props: Ref<any> = ref()
  const scope = effectScope(true)
  const id = getId()
  const isLanded: Ref<boolean> = ref(false)
  const isVisible: Ref<boolean> = ref(false)
  const localOptions = ref<StarportOptions>({})
  const options = computed<ResolvedStarportOptions>(() => ({
    ...defaultOptions,
    ...inlineOptions,
    ...localOptions.value,
  }))

  let rect: ReturnType<typeof useElementBounding> = undefined!

  scope.run(() => {
    rect = useElementBounding(el)
    watch(el, async (v) => {
      if (v)
        isVisible.value = true
      await nextTick()
      if (!el.value)
        isVisible.value = false
    })
  })

  return reactive({
    el,
    id,
    port,
    props,
    rect,
    scope,
    isLanded,
    isVisible,
    options,
    component,
    componentName,
    componentId,
    elRef() {
      return el
    },
    async liftOff() {
      if (!isLanded.value)
        return
      isLanded.value = false
    },
    async land() {
      if (isLanded.value)
        return
      isLanded.value = true
    },
  })
}

export type StarportInstance = ReturnType<typeof createStarportInstance>
