import { createPinia } from 'pinia'
import { useGameStore } from './game'

const pinia = createPinia()
useGameStore(pinia)

export default pinia
