<template>
  <div class="table" v-if="isShow">
    <div v-for="title in titles" class="table__header__item" :key="title.short" @click="titleClick($event, title)">
      <div class="div">
        <span v-if="Qbe.field == title" v-text="Qbe.sort == 0 ? '▼' : '▲'"/>
        {{ title.text }}
      </div>
    </div>
    <template class="table__body__line" v-for="coin in coins" :key="coin.id">
      <template v-for="elem in titles" :key="elem.short">
        <div class="table__body__element" v-if="elem.short == 'logo'"
        >
          <img :src="coin.fullImageLink" height="30" width="30">
        </div>
        <span class="table__body__element" v-else>
        {{ coin[elem.short] || '-' }}
      </span>
      </template>
    </template>
  </div>
  <div v-else>
    loading data
  </div>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {mapGetters} from "vuex";
import {Title} from "@/models/Title";


@Options({
  computed: {
    ...mapGetters([
      'getCoinsList',
      'getTitles',
      'getQbe'
    ])
  }
})


export default class AtomicBody extends Vue {

  get coins() {
    return this.$store.getters.getCoinsList;
  }

  get titles() {
    return this.$store.getters.getTitles;
  }

  get Qbe() {
    return this.$store.getters.getQbe;
  }

  get isShow() {
    return true;
  }

  titleClick(_: any, title: Title): void {
    this.Qbe.currentField = title;
  }

}
</script>

<style scoped lang="scss">
.table {
  display: grid;
  grid-template-columns: 1fr 2fr 3fr repeat(3, 2fr);
  border: 1px solid #1e7ae6;
  grid-row-gap: 5px;
  overflow: auto;


  .table__header__item {
    border-bottom: 3px solid #1e7ae6;
    padding: 1rem 0 1rem 0;

    * {
      user-select: none;
    }
  }

  .table__body__element {
    padding: 1rem 0 0.5rem 0;
    border-bottom: 1px solid #1e7ae6;
  }

}
</style>