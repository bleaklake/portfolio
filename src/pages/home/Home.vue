<script lang="ts">
import { defineComponent } from "vue";
import { useGlobalStore } from '../../stores/global-store'
import Tile from "./Tile.vue"

export default defineComponent({
  data() {
    const store = useGlobalStore();
    store.loadTilesIfNecessary();
    return {
      store,
    };
  },
  components: {
    Tile
  },
  methods: {},
  computed: {},
});
</script>

<template>
  <header>
    <a class="nope" href="/">
      <h1 id="primary">Paul Brion</h1>
    </a>
    <h1 id="secondary">Mes projets</h1>
  </header>

  <section>
    <Tile v-for="it in store.tiles" :tile="it" />
  </section>

</template>


<style scoped lang="scss">
@media (max-width: 320px) {
  section {
    padding: 2em 0em !important;
  }
}

$LIMIT : 800px;
@media (max-width: $LIMIT) {
  header {
    padding: 1em 1em;
    flex-direction: column;
    align-items: center;

    h1 {
      margin: 0px;
      padding: 0px;
    }

    #secondary {
      margin-top: 1em;
    }
  }
}

@media (min-width: $LIMIT) {
  header {
    padding: 1em 6em;
    flex-direction: row;
    justify-content: space-between;

    h1 {
      padding: 0px;
    }
  }
}

header {
  position: sticky;
  top: 0px;
  background-color: var(--fourth);
  border-style: solid;
  border-color: var(--third);
  border-width: 0px 0px 3px 0px;
  display: flex;

  h1 {
    font-family: "Merriweather-Bold";
  }
}

section {
  flex: 1;
  padding: 2em 2em;
  overflow-y: scroll;
  display: grid;
  align-content: stretch;
  grid-template-columns: repeat(auto-fill, 16em);
  column-gap: 2em;
  row-gap: 2em;
  justify-content: space-evenly;
}
</style>