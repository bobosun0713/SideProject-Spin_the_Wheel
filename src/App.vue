<template>
  <div id="app">
    <roulette-wrap></roulette-wrap>
  </div>
</template>

<script>
import RouletteWrap from '@/components/RouletteWrap.vue'
export default {
  name: 'App',
  components: {
    RouletteWrap,
  },
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  background-color: #0e171d;

  display: flex;
  justify-content: center;
  align-items: center;
  
}
</style>
