import TheImage from '../components/TheImage.vue'
import { createStarport } from '../../../src'

const {
  starcarrier: TheImageCarrier,
  starcraft: TheImageCraft,
  starproxy: TheImageProxy,
} = createStarport(TheImage)

export {
  TheImageCarrier,
  TheImageCraft,
  TheImageProxy,
}
