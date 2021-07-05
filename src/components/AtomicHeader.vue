<template>
  <div class="app_bar">
    <div class="app_bar__left"></div>
    <div class="app_bar__right">
      <div class="form__group">
        <input type="text" class="form__input" id="name" placeholder="Фильтр" required="" v-model="$store.getters.getQbe.filter"/>
        <label for="name" class="form__label">Фильтр</label>
      </div>
    </div>

  </div>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})
export default class Header extends Vue {
  msg!: string
}
</script>

<style scoped lang="scss">
  .app_bar {
    background: #373f5a;
    padding: 0.5rem 1rem;
    display: flex;
  }
</style>