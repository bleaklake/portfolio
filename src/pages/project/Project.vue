<script lang="ts">
import { defineComponent, ref } from "vue";
import { useGlobalStore } from '../../stores/global-store'
import { useRoute } from 'vue-router'
import VueMarkdown from 'vue-markdown-render'

export default defineComponent({
  data() {
    const store = useGlobalStore();
    store.loadTilesIfNecessary();

    const projectId = useRoute().params.id as string;
    const tile = store.tiles.find(it => it.id === projectId)!;

    const options = {
      html: true,
      linkify: true,
      typographer: true
    };

    const src = ref('');

    return {
      src,
      store,
      tile,
      options
    };
  },
  async created() {
    const res = await fetch(this.tile.markdownUrl);
    const text = await res.text();
    this.src = text;
  },
  methods: {
    navigateToHome() {
      this.$router.push("/");
    },
  },
  components: {
    VueMarkdown
  },
  computed: {},
});
</script>

<template>
  <header>
    <a class="nope" href="/">
      <h1 id="primary">Paul Brion</h1>
    </a>
    <h1 id="secondary">{{ tile.name }}</h1>
  </header>

  <!-- I'm using div because of the markdown formatting -->
  <div id="main">
    <img id="main-image" :src="this.tile.imageUrl" />
    <div id="description">
      <div id="md">
        <VueMarkdown :source="src" :options="options" />
      </div>
    </div>
  </div>

</template>


<style scoped lang="scss">
@media (max-width: 320px) {
  #main {
    padding: 2em 0em !important;
  }
}

$LIMIT : 800px;
@media (max-width: $LIMIT) {
  header {
    padding: 1em 0em;
    flex-direction: column;
    align-items: center;

    #primary {
      margin: 0px;
      padding: 0px;
    }

    #secondary {
      margin-top: 1em;
    }
  }

  #main {
    flex-direction: column;
    padding: 2em 2em;
    overflow-y: scroll;


    #main-image {
      height: 50vh;
    }

    #description {
      margin-top: 2em;
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

  #main {
    overflow-x: scroll;
    flex-direction: row;
    padding: 2em 6em;


    #main-image {
      width: 20%;
    }


    #description {
      flex-direction: column;
      width: 80%;
      margin-left: 6em;
      overflow-y: scroll;
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

#secondary {
  color: #621534;
  font-family: "Merriweather-Black";
}

#main {
  flex: 1;
  display: flex;

  &>* {
    box-sizing: border-box;
    overflow: none;
  }

  #main-image {
    object-fit: contain;
  }

  #description {
    display: flex;

    #md {
      background-color: #21fa9044;
      border-style: solid;
      border-color: var(--third);
      border-width: 3px;
      border-radius: 12px;
      flex: 1;
      padding: 1em 2em;
      overflow-y: scroll;
    }
  }
}
</style>