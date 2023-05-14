import { defineStore } from 'pinia'
import Cat from '../models/Cat'
import { Toy } from '../models/Toy'

interface GameState {}
// defineStore 함수의 첫 번째 인자는 Pinia store의 이름을 지정
export const useGameStore = defineStore('game', {
  state: () => ({
    map: HTMLCanvasElement,
    cat: {} as Cat,
    toys: [] as Array<Toy>,
  }),
  getters: {
    getCat: (state) => state.cat,
  },
  actions: {
    initMap() {},
    drawCat() {
      const cat = new Cat(0, 0)
      this.cat = cat
    },
  },
})
