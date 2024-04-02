import { defineStore } from "pinia";
import { z } from "zod";
import tilesJson from "./tiles.json";

export const TileZod = z.strictObject({
  id: z.string().regex(/^[a-zA-Z0-9_\-]+$/g),
  name: z.string(),
  baseAssetsUrl: z.string().url(),
  imageUrl: z.string().url(),
  markdownUrl: z.string().url(),
  projectUrl: z.string().url(),
});
export type Tile = z.infer<typeof TileZod>;

const TilesZod = z.array(TileZod);
type Tiles = z.infer<typeof TilesZod>;

export const useGlobalStore = defineStore("counter", {
  state: () => (
    {
      tiles: [] as Tiles,
    }
  ),
  getters: {
    getTiles: (state) => state.tiles,
  },
  actions: {
    loadTiles() {
      const result = TilesZod.safeParse(tilesJson);
      if (!result.success) {
        return;
      }
      this.tiles = result.data;
    },
    loadTilesIfNecessary() {
      if (this.tiles.length === 0) this.loadTiles();
    },
  },
});
