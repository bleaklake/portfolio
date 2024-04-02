<script lang="ts">
import { PropType, defineComponent } from "vue";
import { useGlobalStore, Tile } from '../../stores/global-store'

export default defineComponent({
  data() {
    const store = useGlobalStore();
    return {
      store,
    };
  },
  methods: {},
  computed: {},
  props: {
    tile: {
      type: Object as PropType<Tile>,
      required: true,
    }
  }
});
</script>

<template>
  <a class="nope" :href="`/project/${this.tile.id}`">
    <div class="tile">
      <img :src="this.tile.imageUrl" />
      <div class="title">
        <h3>{{ this.tile.name }}</h3>
      </div>
    </div>
  </a>
</template>

<style scoped lang="scss">
.tile {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 16em;
  border-style: solid;
  border-color: var(--third);
  border-width: 3px;
  border-radius: 16px;
  overflow: hidden;

  &>* {
    box-sizing: border-box;
  }

  img {
    object-fit: contain;
    width: 100%;
    height: 80%;
    background-color: var(--back-0);
  }

  .title {
    border-style: solid;
    border-color: var(--third);
    border-width: 3px 0px 0px 0px;
    height: 20%;
    background-color: var(--fourth);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    h3 {
      font-family: "Merriweather-Bold";
      margin: .2em 0px 0px 0px;
    }
  }
}
</style>