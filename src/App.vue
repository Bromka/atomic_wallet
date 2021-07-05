<template>
  <AtomicHeader />
  <AtomicBody />
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';
import AtomicBody from './components/AtomicBody.vue';
import AtomicHeader from './components/AtomicHeader.vue';


@Options({
  components: {
    HelloWorld,
    AtomicBody,
    AtomicHeader
  },
})

export default class App extends Vue {
  created() {
    this.$store.dispatch('fetchCoinsGeneralData');
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1240px;
  margin: 0px auto;
}
</style>
