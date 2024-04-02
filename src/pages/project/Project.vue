<script lang="ts">
import { defineComponent, ref } from "vue";
import { useGlobalStore } from '../../stores/global-store'
import { useRoute } from 'vue-router'
import VueMarkdown from 'vue-markdown-render'
import { markdownItBaseURL } from "../../plugins/markdown-it"

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
      plugins: [markdownItBaseURL(tile.baseAssetsUrl, ["src", "href"])],
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
    <a class="nope" :href="this.tile.projectUrl">
      <div id="github">
        <svg width="49" height="48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 96">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
            fill="#621534" />
        </svg>
        <h1 id="secondary">{{ tile.name }}</h1>
      </div>
    </a>
  </header>

  <!-- I'm using div because of the markdown formatting -->
  <div id="main">
    <img id="main-image" :src="this.tile.imageUrl" />
    <div id="description">
      <div id="md">
        <VueMarkdown :source="src" :options="options" :plugins="plugins" />
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
    padding: 1em 1em;
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

  #github {
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 1em;
    }
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