<script setup lang="ts">
import { reactive } from 'vue'

const data = reactive({
  state: 'idle',
})
</script>

<template>
  <div>야옹-❤️</div>

  <div class="wrap">
    <div class="cat" :class="data.state"></div>
  </div>

  <hr />
  <button type="button" @click="data.state = 'idle'">Idle</button>
  <button type="button" @click="data.state = 'walk'">Walk</button>
</template>

<style lang="scss" scoped>
.cat {
  width: 32px;
  height: 32px;
  background: url('@/assets/sprites/cat.png');
  background-repeat: no-repeat;

  &.idle {
    animation: idle 1s infinite steps(5);
  }

  &.walk {
    animation: walk 1s infinite steps(5);
  }
}

@keyframes idle {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -160px 0;
  }
}

@keyframes walk {
  from {
    background-position: 0 -33px;
  }
  to {
    background-position: -160px -33px;
  }
}
</style>
